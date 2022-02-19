import { promises as fsPromises } from 'fs';
import { HTMLType, StyleAndScriptType, AdditionalDataType } from './types';

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

export const getAdditionalData = async (type: AdditionalDataType, content: { [key: string]: string; } | string) => {
    switch (type) {
        case 'FILE':
            if (typeof content !== 'string') {
                throw new Error('Content must be a file path(a string) for type FILE');
            }
            return JSON.parse((await readFile(content as string)).toString());
        case 'CONTENT':
        default:
            if (!(content instanceof Object) && typeof content !== 'object') {
                throw new Error('Content must be a JSON object for type CONTENT');
            }
            return Promise.resolve(content);
    }
};
