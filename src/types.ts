import { PaperFormat } from "puppeteer";

export enum StyleAndScriptType {
    URL = 'URL',
    FILE = 'FILE',
    CONTENT = 'CONTENT',
}

export enum HTMLType {
    FILE = 'FILE',
    CONTENT = 'CONTENT',
}

export enum AdditionalDataType {
    FILE = 'FILE',
    CONTENT = 'CONTENT',
}

type PageSizeOptions = {
    height: number;
    width: number;
};

type Margin = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};

type PdfOptions = {
    writeStream?: NodeJS.WritableStream;
    scale?: number;
    format?: PaperFormat;
    landscape?: boolean;
    margin?: Margin;
};

type Auth = {
    username: string;
    password: string;
};

type UrlOptions = {
    link: string;
    auth?: Auth;
};

type StyleAndScriptTypeOptions = {
    type: StyleAndScriptType;
    content: string;
};

type TemplateOptions = {
    type: HTMLType;
    content: string;
    css?: StyleAndScriptTypeOptions;
    script?: StyleAndScriptTypeOptions;
    header?: string;
    footer?: string;
};

type AdditionalDataOptions = {
    resourceType: AdditionalDataType;
    data: { [key: string]: string } | string;
};

export type HtmlToPdfOptions = {
    puppeteerExecPath?: string;
    page?: PageSizeOptions;
    pdf?: PdfOptions;
    url?: UrlOptions;
    template?: TemplateOptions;
    data?: { [key: string]: any };
    additionalData?: AdditionalDataOptions;
};
