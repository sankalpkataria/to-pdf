"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageTranslations = exports.getPageHTML = exports.getPageStylesAndScript = void 0;
const fs_1 = require("fs");
const { readFile } = fs_1.promises;
const getPageStylesAndScript = (type, content) => {
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
exports.getPageStylesAndScript = getPageStylesAndScript;
const getPageHTML = async (type, content) => {
    switch (type) {
        case 'FILE':
            return (await readFile(content)).toString();
        case 'CONTENT':
        default:
            return Promise.resolve(content);
    }
};
exports.getPageHTML = getPageHTML;
const getPageTranslations = async (type, content) => {
    switch (type) {
        case 'FILE':
            return JSON.parse((await readFile(content)).toString());
        case 'CONTENT':
        default:
            return Promise.resolve(content);
    }
};
exports.getPageTranslations = getPageTranslations;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQTRDO0FBRzVDLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxhQUFVLENBQUM7QUFFekIsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLElBQXdCLEVBQUUsT0FBZSxFQUFFLEVBQUU7SUFDaEYsUUFBUSxJQUFJLEVBQUU7UUFDVixLQUFLLEtBQUs7WUFDTixPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzVCLEtBQUssTUFBTTtZQUNQLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDN0IsS0FBSyxTQUFTLENBQUM7UUFDZjtZQUNJLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7S0FDbkM7QUFDTCxDQUFDLENBQUM7QUFWVyxRQUFBLHNCQUFzQiwwQkFVakM7QUFFSyxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsSUFBYyxFQUFFLE9BQWUsRUFBbUIsRUFBRTtJQUNsRixRQUFRLElBQUksRUFBRTtRQUNWLEtBQUssTUFBTTtZQUNQLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hELEtBQUssU0FBUyxDQUFDO1FBQ2Y7WUFDSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdkM7QUFDTCxDQUFDLENBQUM7QUFSVyxRQUFBLFdBQVcsZUFRdEI7QUFFSyxNQUFNLG1CQUFtQixHQUFHLEtBQUssRUFBRSxJQUFzQixFQUFFLE9BQTRDLEVBQUUsRUFBRTtJQUM5RyxRQUFRLElBQUksRUFBRTtRQUNWLEtBQUssTUFBTTtZQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sUUFBUSxDQUFDLE9BQWlCLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdEUsS0FBSyxTQUFTLENBQUM7UUFDZjtZQUNJLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN2QztBQUNMLENBQUMsQ0FBQztBQVJXLFFBQUEsbUJBQW1CLHVCQVE5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb21pc2VzIGFzIGZzUHJvbWlzZXMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBIVE1MVHlwZSwgU3R5bGVBbmRTY3JpcHRUeXBlLCBUcmFuc2xhdGlvbnNUeXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IHsgcmVhZEZpbGUgfSA9IGZzUHJvbWlzZXM7XG5cbmV4cG9ydCBjb25zdCBnZXRQYWdlU3R5bGVzQW5kU2NyaXB0ID0gKHR5cGU6IFN0eWxlQW5kU2NyaXB0VHlwZSwgY29udGVudDogc3RyaW5nKSA9PiB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ1VSTCc6XG4gICAgICAgICAgICByZXR1cm4geyB1cmw6IGNvbnRlbnQgfTtcbiAgICAgICAgY2FzZSAnRklMRSc6XG4gICAgICAgICAgICByZXR1cm4geyBwYXRoOiBjb250ZW50IH07XG4gICAgICAgIGNhc2UgJ0NPTlRFTlQnOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHsgY29udGVudDogY29udGVudCB9O1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRQYWdlSFRNTCA9IGFzeW5jICh0eXBlOiBIVE1MVHlwZSwgY29udGVudDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnRklMRSc6XG4gICAgICAgICAgICByZXR1cm4gKGF3YWl0IHJlYWRGaWxlKGNvbnRlbnQpKS50b1N0cmluZygpO1xuICAgICAgICBjYXNlICdDT05URU5UJzpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29udGVudCk7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldFBhZ2VUcmFuc2xhdGlvbnMgPSBhc3luYyAodHlwZTogVHJhbnNsYXRpb25zVHlwZSwgY29udGVudDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmc7IH0gfCBzdHJpbmcpID0+IHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnRklMRSc6XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSgoYXdhaXQgcmVhZEZpbGUoY29udGVudCBhcyBzdHJpbmcpKS50b1N0cmluZygpKTtcbiAgICAgICAgY2FzZSAnQ09OVEVOVCc6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvbnRlbnQpO1xuICAgIH1cbn07XG4iXX0=