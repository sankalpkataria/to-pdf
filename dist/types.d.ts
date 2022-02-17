/// <reference types="node" />
import { PaperFormat } from "puppeteer";
export declare enum StyleAndScriptType {
    URL = "URL",
    FILE = "FILE",
    CONTENT = "CONTENT"
}
export declare enum HTMLType {
    FILE = "FILE",
    CONTENT = "CONTENT"
}
export declare enum TranslationsType {
    FILE = "FILE",
    CONTENT = "CONTENT"
}
declare type PageSizeOptions = {
    height: number;
    width: number;
};
declare type Margin = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
declare type PdfOptions = {
    writeStream?: NodeJS.WritableStream;
    scale?: number;
    format?: PaperFormat;
    landscape?: boolean;
    margin?: Margin;
};
declare type Auth = {
    username: string;
    password: string;
};
declare type UrlOptions = {
    link: string;
    auth?: Auth;
};
declare type StyleAndScriptTypeOptions = {
    type: StyleAndScriptType;
    content: string;
};
declare type TemplateOptions = {
    type: HTMLType;
    content: string;
    css?: StyleAndScriptTypeOptions;
    script?: StyleAndScriptTypeOptions;
    header?: string;
    footer?: string;
};
declare type TransitionOptions = {
    resourceType: TranslationsType;
    translations: {
        [key: string]: string;
    } | string;
};
export declare type PDFFromHTMLOptions = {
    page?: PageSizeOptions;
    pdf?: PdfOptions;
    url?: UrlOptions;
    template?: TemplateOptions;
    data?: {
        [key: string]: any;
    };
    translations?: TransitionOptions;
};
export {};
//# sourceMappingURL=types.d.ts.map