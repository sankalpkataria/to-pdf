"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlToPdf = void 0;
const types_1 = require("./types");
const mustache_1 = __importDefault(require("mustache"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const utils_1 = require("./utils");
const getHTML = async (options) => {
    var _a, _b;
    let html = await (0, utils_1.getPageHTML)(((_a = options.template) === null || _a === void 0 ? void 0 : _a.type) || types_1.HTMLType.CONTENT, (_b = options.template) === null || _b === void 0 ? void 0 : _b.content);
    if (options.data) {
        if (options.translations) {
            try {
                const translations = await (0, utils_1.getPageTranslations)(options.translations.resourceType, options.translations.translations);
                options.data = Object.assign(options.data, translations);
            }
            catch (error) {
                throw new Error('Invalid format for translations. Must be JSON');
            }
        }
        return mustache_1.default.render(html, options.data);
    }
    return html;
};
const htmlToPdf = async (options) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (!options.pdf) {
        options.pdf = {};
    }
    if (!options.template && !options.url) {
        throw new Error('At least one of template or url must be specified');
    }
    const browser = await puppeteer_1.default.launch({ headless: true });
    const page = await browser.newPage();
    if ((_a = options.page) === null || _a === void 0 ? void 0 : _a.height) {
        await page.setViewport({
            width: options.page.width || 1600,
            height: options.page.height || 745.60,
        });
    }
    if (options.template) {
        const html = await getHTML(options);
        await page.setContent(html, { waitUntil: 'networkidle0' });
        if ((_b = options.template.css) === null || _b === void 0 ? void 0 : _b.content) {
            const pageStyles = (0, utils_1.getPageStylesAndScript)(options.template.css.type, options.template.css.content);
            await page.addStyleTag(pageStyles);
        }
        if ((_c = options.template.script) === null || _c === void 0 ? void 0 : _c.content) {
            const pageScript = (0, utils_1.getPageStylesAndScript)(options.template.script.type, options.template.script.content);
            await page.addScriptTag(pageScript);
        }
    }
    else {
        await page.goto((_d = options.url) === null || _d === void 0 ? void 0 : _d.link, { waitUntil: 'networkidle0' });
        if ((_e = options.url) === null || _e === void 0 ? void 0 : _e.auth) {
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
        displayHeaderFooter: !!((_f = options.template) === null || _f === void 0 ? void 0 : _f.header) || !!((_g = options.template) === null || _g === void 0 ? void 0 : _g.footer),
        headerTemplate: (_h = options.template) === null || _h === void 0 ? void 0 : _h.header,
        footerTemplate: (_j = options.template) === null || _j === void 0 ? void 0 : _j.footer,
    };
    if (options.pdf.writeStream) {
        const pdfStream = await page.createPDFStream(pdfOptions);
        pdfStream.pipe(options.pdf.writeStream);
        pdfStream.on('end', async () => {
            await browser.close();
        });
    }
    else {
        const pdf = await page.pdf(pdfOptions);
        await browser.close();
        return pdf;
    }
};
exports.htmlToPdf = htmlToPdf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC10by1wZGYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaHRtbC10by1wZGYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbUNBQXVEO0FBQ3ZELHdEQUFnQztBQUNoQywwREFBa0Q7QUFDbEQsbUNBQW1GO0FBRW5GLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxPQUEyQixFQUFFLEVBQUU7O0lBQ2xELElBQUksSUFBSSxHQUFHLE1BQU0sSUFBQSxtQkFBVyxFQUFDLENBQUEsTUFBQSxPQUFPLENBQUMsUUFBUSwwQ0FBRSxJQUFJLEtBQUksZ0JBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBQSxPQUFPLENBQUMsUUFBUSwwQ0FBRSxPQUFpQixDQUFDLENBQUM7SUFDOUcsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO1FBQ2QsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQ3RCLElBQUk7Z0JBQ0EsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFBLDJCQUFtQixFQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3JILE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQzVEO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO2FBQ3BFO1NBQ0o7UUFDRCxPQUFPLGtCQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUM7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUM7QUFFSyxNQUFNLFNBQVMsR0FBRyxLQUFLLEVBQUUsT0FBMkIsRUFBRSxFQUFFOztJQUMzRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNk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MENBQUUsTUFBTSxDQUFBO1FBQzdFLGNBQWMsRUFBRSxNQUFBLE9BQU8sQ0FBQyxRQUFRLDBDQUFFLE1BQU07UUFDeEMsY0FBYyxFQUFFLE1BQUEsT0FBTyxDQUFDLFFBQVEsMENBQUUsTUFBTTtLQUM3QixDQUFDO0lBRWhCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7UUFDekIsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLElBQUksRUFBRTtZQUMzQixNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztLQUNOO1NBQU07UUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEIsT0FBTyxHQUFHLENBQUM7S0FDZDtBQUNMLENBQUMsQ0FBQztBQXhEVyxRQUFBLFNBQVMsYUF3RHBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSFRNTFR5cGUsIFBERkZyb21IVE1MT3B0aW9ucyB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgTXVzdGFjaGUgZnJvbSAnbXVzdGFjaGUnO1xuaW1wb3J0IHB1cHBldGVlciwgeyBQREZPcHRpb25zIH0gZnJvbSAncHVwcGV0ZWVyJztcbmltcG9ydCB7IGdldFBhZ2VIVE1MLCBnZXRQYWdlU3R5bGVzQW5kU2NyaXB0LCBnZXRQYWdlVHJhbnNsYXRpb25zIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgZ2V0SFRNTCA9IGFzeW5jIChvcHRpb25zOiBQREZGcm9tSFRNTE9wdGlvbnMpID0+IHtcbiAgICBsZXQgaHRtbCA9IGF3YWl0IGdldFBhZ2VIVE1MKG9wdGlvbnMudGVtcGxhdGU/LnR5cGUgfHwgSFRNTFR5cGUuQ09OVEVOVCwgb3B0aW9ucy50ZW1wbGF0ZT8uY29udGVudCBhcyBzdHJpbmcpO1xuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMudHJhbnNsYXRpb25zKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IGdldFBhZ2VUcmFuc2xhdGlvbnMob3B0aW9ucy50cmFuc2xhdGlvbnMucmVzb3VyY2VUeXBlLCBvcHRpb25zLnRyYW5zbGF0aW9ucy50cmFuc2xhdGlvbnMpO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucy5kYXRhLCB0cmFuc2xhdGlvbnMpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZm9ybWF0IGZvciB0cmFuc2xhdGlvbnMuIE11c3QgYmUgSlNPTicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNdXN0YWNoZS5yZW5kZXIoaHRtbCwgb3B0aW9ucy5kYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWw7XG59O1xuXG5leHBvcnQgY29uc3QgaHRtbFRvUGRmID0gYXN5bmMgKG9wdGlvbnM6IFBERkZyb21IVE1MT3B0aW9ucykgPT4ge1xuICAgIGlmICghb3B0aW9ucy5wZGYpIHtcbiAgICAgICAgb3B0aW9ucy5wZGYgPSB7fTtcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLnRlbXBsYXRlICYmICFvcHRpb25zLnVybCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0IGxlYXN0IG9uZSBvZiB0ZW1wbGF0ZSBvciB1cmwgbXVzdCBiZSBzcGVjaWZpZWQnKTtcbiAgICB9XG4gICAgY29uc3QgYnJvd3NlciA9IGF3YWl0IHB1cHBldGVlci5sYXVuY2goeyBoZWFkbGVzczogdHJ1ZSB9KTtcbiAgICBjb25zdCBwYWdlID0gYXdhaXQgYnJvd3Nlci5uZXdQYWdlKCk7XG4gICAgaWYgKG9wdGlvbnMucGFnZT8uaGVpZ2h0KSB7XG4gICAgICAgIGF3YWl0IHBhZ2Uuc2V0Vmlld3BvcnQoe1xuICAgICAgICAgICAgd2lkdGg6IG9wdGlvbnMucGFnZS53aWR0aCB8fCAxNjAwLFxuICAgICAgICAgICAgaGVpZ2h0OiBvcHRpb25zLnBhZ2UuaGVpZ2h0IHx8IDc0NS42MCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnRlbXBsYXRlKSB7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBhd2FpdCBnZXRIVE1MKG9wdGlvbnMpO1xuICAgICAgICBhd2FpdCBwYWdlLnNldENvbnRlbnQoaHRtbCwgeyB3YWl0VW50aWw6ICduZXR3b3JraWRsZTAnIH0pO1xuICAgICAgICBpZiAob3B0aW9ucy50ZW1wbGF0ZS5jc3M/LmNvbnRlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VTdHlsZXMgPSBnZXRQYWdlU3R5bGVzQW5kU2NyaXB0KG9wdGlvbnMudGVtcGxhdGUuY3NzLnR5cGUsIG9wdGlvbnMudGVtcGxhdGUuY3NzLmNvbnRlbnQpO1xuICAgICAgICAgICAgYXdhaXQgcGFnZS5hZGRTdHlsZVRhZyhwYWdlU3R5bGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy50ZW1wbGF0ZS5zY3JpcHQ/LmNvbnRlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VTY3JpcHQgPSBnZXRQYWdlU3R5bGVzQW5kU2NyaXB0KG9wdGlvbnMudGVtcGxhdGUuc2NyaXB0LnR5cGUsIG9wdGlvbnMudGVtcGxhdGUuc2NyaXB0LmNvbnRlbnQpO1xuICAgICAgICAgICAgYXdhaXQgcGFnZS5hZGRTY3JpcHRUYWcocGFnZVNjcmlwdCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBwYWdlLmdvdG8ob3B0aW9ucy51cmw/LmxpbmsgYXMgc3RyaW5nLCB7IHdhaXRVbnRpbDogJ25ldHdvcmtpZGxlMCcgfSk7XG4gICAgICAgIGlmIChvcHRpb25zLnVybD8uYXV0aCkge1xuICAgICAgICAgICAgYXdhaXQgcGFnZS5hdXRoZW50aWNhdGUoe1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBvcHRpb25zLnVybC5hdXRoLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBvcHRpb25zLnVybC5hdXRoLnBhc3N3b3JkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcGRmT3B0aW9ucyA9IHtcbiAgICAgICAgZm9ybWF0OiBvcHRpb25zLnBkZi5mb3JtYXQgfHwgJ0E0JyxcbiAgICAgICAgc2NhbGU6IG9wdGlvbnMucGRmLnNjYWxlIHx8IDEsXG4gICAgICAgIGxhbmRzY2FwZTogb3B0aW9ucy5wZGYubGFuZHNjYXBlIHx8IGZhbHNlLFxuICAgICAgICBtYXJnaW46IG9wdGlvbnMucGRmLm1hcmdpbiA/IG9wdGlvbnMucGRmLm1hcmdpbiA6IHVuZGVmaW5lZCxcbiAgICAgICAgZGlzcGxheUhlYWRlckZvb3RlcjogISFvcHRpb25zLnRlbXBsYXRlPy5oZWFkZXIgfHwgISFvcHRpb25zLnRlbXBsYXRlPy5mb290ZXIsXG4gICAgICAgIGhlYWRlclRlbXBsYXRlOiBvcHRpb25zLnRlbXBsYXRlPy5oZWFkZXIsXG4gICAgICAgIGZvb3RlclRlbXBsYXRlOiBvcHRpb25zLnRlbXBsYXRlPy5mb290ZXIsXG4gICAgfSBhcyBQREZPcHRpb25zO1xuXG4gICAgaWYgKG9wdGlvbnMucGRmLndyaXRlU3RyZWFtKSB7XG4gICAgICAgIGNvbnN0IHBkZlN0cmVhbSA9IGF3YWl0IHBhZ2UuY3JlYXRlUERGU3RyZWFtKHBkZk9wdGlvbnMpO1xuICAgICAgICBwZGZTdHJlYW0ucGlwZShvcHRpb25zLnBkZi53cml0ZVN0cmVhbSk7XG4gICAgICAgIHBkZlN0cmVhbS5vbignZW5kJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwZGYgPSBhd2FpdCBwYWdlLnBkZihwZGZPcHRpb25zKTtcbiAgICAgICAgYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xuICAgICAgICByZXR1cm4gcGRmO1xuICAgIH1cbn07XG4iXX0=