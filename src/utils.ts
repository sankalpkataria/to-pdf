import { promises as fsPromises } from 'fs';
import { HTMLType, StyleAndScriptType, TranslationsType } from './types';

const { readFile } = fsPromises;

export const getPageStylesAndScript = (type: StyleAndScriptType, content: string) => {
    switch (type) {
        case 'URL':
            return { url: content };
        case 'FILE':
            return { path: content };
        case 'CONTENT':
        default:
            return { content: content };
    }
};

export const getPageHTML = async (type: HTMLType, content: string): Promise<string> => {
    switch (type) {
        case 'FILE':
            return (await readFile(content)).toString();
        case 'CONTENT':
        default:
            return Promise.resolve(content);
    }
};

export const getPageTranslations = async (type: TranslationsType, content: { [key: string]: string; } | string) => {
    switch (type) {
        case 'FILE':
            return JSON.parse((await readFile(content as string)).toString());
        case 'CONTENT':
        default:
            return Promise.resolve(content);
    }
};
