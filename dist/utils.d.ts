import { HTMLType, StyleAndScriptType, TranslationsType } from './types';
export declare const getPageStylesAndScript: (type: StyleAndScriptType, content: string) => {
    url: string;
    path?: undefined;
    content?: undefined;
} | {
    path: string;
    url?: undefined;
    content?: undefined;
} | {
    content: string;
    url?: undefined;
    path?: undefined;
};
export declare const getPageHTML: (type: HTMLType, content: string) => Promise<string>;
export declare const getPageTranslations: (type: TranslationsType, content: string | {
    [key: string]: string;
}) => Promise<any>;
//# sourceMappingURL=utils.d.ts.map