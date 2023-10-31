import { RenderOptions, TemplateContentType, HtmlToPdfOptions } from './types';
import Mustache from 'mustache';
import puppeteer, { Browser, PDFOptions } from 'puppeteer';
import { getContent, getPageStylesAndScript, getAdditionalData } from './utils';

export const getDataRenderedTemplate = async (options: RenderOptions) => {
  let templateContent = await getContent(
    options.template?.type || TemplateContentType.CONTENT,
    options.template?.content as string,
  );
  if (options.data) {
    if (!(options.data instanceof Object) && typeof options.data !== 'object') {
      throw new Error('Data must be a JSON object.');
    }
    if (options.additionalData) {
      try {
        const additionalData = await getAdditionalData(
          options.additionalData.resourceType,
          options.additionalData.data,
        );
        options.data = Object.assign(options.data, additionalData);
      } catch (error) {
        throw new Error('Invalid format for additional data. Must be JSON');
      }
    }
    return Mustache.render(
      templateContent,
      options.data,
      options.template?.partials ? options.template?.partials : {},
    );
  }
  return templateContent;
};

export const htmlToPdf = async (options: HtmlToPdfOptions) => {
  if (!options.pdf) {
    options.pdf = {};
  }
  if (!options.template && !options.url) {
    throw new Error('At least one of template or url must be specified');
  }
  let browser: Browser;
  if (options.puppeteerExecPath) {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-extensions'],
      executablePath: options.puppeteerExecPath,
    });
  } else {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-extensions'],
    });
  }
  const page = await browser.newPage();
  if (options.page?.height) {
    await page.setViewport({
      width: options.page.width || 1600,
      height: options.page.height || 745.6,
    });
  }
  if (options.template) {
    const html = await getDataRenderedTemplate(options);
    await page.setContent(html, { waitUntil: 'networkidle0' });
    if (options.template.css?.content) {
      const pageStyles = getPageStylesAndScript(
        options.template.css.type,
        options.template.css.content,
      );
      await page.addStyleTag(pageStyles);
    }
    if (options.template.script?.content) {
      const pageScript = getPageStylesAndScript(
        options.template.script.type,
        options.template.script.content,
      );
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
    path: options.pdf.path,
    format: options.pdf.format,
    scale: options.pdf.scale || 1,
    width: options.pdf.dimensions?.width,
    height: options.pdf.dimensions?.height,
    landscape: options.pdf.landscape || false,
    margin: options.pdf.margin ? options.pdf.margin : undefined,
    displayHeaderFooter: !!options.template?.header || !!options.template?.footer,
    headerTemplate: options.template?.header
      ? Mustache.render(options.template?.header, options.data)
      : undefined,
    footerTemplate: options.template?.footer
      ? Mustache.render(options.template?.footer, options.data)
      : undefined,
    printBackground: options.pdf.printBackground || false,
    omitBackground: options.pdf.transparentBackground || false,
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
