import { HTMLType, HtmlToPdfOptions } from "./types";
import Mustache from 'mustache';
import puppeteer, { PDFOptions } from 'puppeteer';
import { getPageHTML, getPageStylesAndScript, getAdditionalData } from "./utils";

const getHTML = async (options: HtmlToPdfOptions) => {
    let html = await getPageHTML(options.template?.type || HTMLType.CONTENT, options.template?.content as string);
    if (options.data) {
        if (!(options.data instanceof Object) && typeof options.data !== 'object') {
            throw new Error('Data must be a JSON object.')
        }
        if (options.additionalData) {
            try {
                const additionalData = await getAdditionalData(options.additionalData.resourceType, options.additionalData.data);
                options.data = Object.assign(options.data, additionalData);
            } catch (error) {
                throw new Error('Invalid format for additional data. Must be JSON');
            }
        }
        return Mustache.render(html, options.data);
    }
    return html;
};

export const htmlToPdf = async (options: HtmlToPdfOptions) => {
    if (!options.pdf) {
        options.pdf = {};
    }
    if (!options.template && !options.url) {
        throw new Error('At least one of template or url must be specified');
    }
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    if (options.page?.height) {
        await page.setViewport({
            width: options.page.width || 1600,
            height: options.page.height || 745.60,
        });
    }
    if (options.template) {
        const html = await getHTML(options);
        await page.setContent(html, { waitUntil: 'networkidle0' });
        if (options.template.css?.content) {
            const pageStyles = getPageStylesAndScript(options.template.css.type, options.template.css.content);
            await page.addStyleTag(pageStyles);
        }
        if (options.template.script?.content) {
            const pageScript = getPageStylesAndScript(options.template.script.type, options.template.script.content);
            await page.addScriptTag(pageScript);
        }
    } else {
        await page.goto(options.url?.link as string, { waitUntil: 'networkidle0' });
        if (options.url?.auth) {
            await page.authenticate({
                username: options.url.auth.username,
                password: options.url.auth.password,
            });
        }
    }
    const pdfOptions = {
        format: options.pdf.format || 'A4',
        scale: options.pdf.scale || 1,
        landscape: options.pdf.landscape || false,
        margin: options.pdf.margin ? options.pdf.margin : undefined,
        displayHeaderFooter: !!options.template?.header || !!options.template?.footer,
        headerTemplate: options.template?.header,
        footerTemplate: options.template?.footer,
    } as PDFOptions;

    if (options.pdf.writeStream) {
        const pdfStream = await page.createPDFStream(pdfOptions);
        pdfStream.pipe(options.pdf.writeStream);
        pdfStream.on('end', async () => {
            await browser.close();
        });
    } else {
        const pdf = await page.pdf(pdfOptions);
        await browser.close();
        return pdf;
    }
};
