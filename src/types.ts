import { PDFMargin, PaperFormat } from 'puppeteer';

export enum StyleAndScriptType {
  URL = 'URL',
  FILE = 'FILE',
  CONTENT = 'CONTENT',
}

export enum TemplateContentType {
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

type PdfSizeOptions = {
  height: number | string;
  width: number | string;
};

type PdfOptions = {
  writeStream?: NodeJS.WritableStream;
  path?: string;
  scale?: number;
  format?: PaperFormat;
  dimensions?: PdfSizeOptions;
  landscape?: boolean;
  margin?: PDFMargin;
  printBackground?: boolean;
  transparentBackground?: boolean;
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

type TemplateContent = string;

type TemplateOptions = {
  type: TemplateContentType;
  content: string;
  css?: StyleAndScriptTypeOptions;
  script?: StyleAndScriptTypeOptions;
  header?: string;
  footer?: string;
  partials?: { [templateName: string]: TemplateContent };
};

type AdditionalDataOptions = {
  resourceType: AdditionalDataType;
  data: { [key: string]: string } | string;
};

export type RenderOptions = {
  template?: TemplateOptions;
  data?: { [key: string]: any };
  additionalData?: AdditionalDataOptions;
};

export type HtmlToPdfOptions = RenderOptions & {
  puppeteerExecPath?: string;
  page?: PageSizeOptions;
  pdf?: PdfOptions;
  url?: UrlOptions;
};
