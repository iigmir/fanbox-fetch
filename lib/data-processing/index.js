import { GetBlocks as GetBlocksV1, GetContentImages as GetContentImagesV1 } from "./v1.js";
import { GetBlocks as GetBlocksV2, GetContentImages as GetContentImagesV2 } from "./v2.js";

const api_detection = (api) => {
    const v1_apis = [
        Object.hasOwn(api, "text"),
        Object.hasOwn(api, "files"),
        Object.hasOwn(api, "images"),
    ];
    const v2_apis = [
        Object.hasOwn(api, "blocks"),
        Object.hasOwn(api, "fileMap"),
        Object.hasOwn(api, "imageMap"),
        Object.hasOwn(api, "urlEmbedMap"),
    ];
    const seems_true = condition => condition === true;
    if( v1_apis.every( seems_true ) ) {
        return 1;
    } else if( v2_apis.every( seems_true ) ) {
        return 2;
    } else {
        return 0;
    }
};

export const GetBlocks = (body) => {
    const version = api_detection(body);
    if( version === 1 ) {
        return GetBlocksV1(body);
    }
    if( version === 2 ) {
        return GetBlocksV2(body);
    }
    console.warn("API invalid.");
    return [];
};

export const GetImages = (body) => {
    const version = api_detection(body);
    if( version === 1 ) {
        return GetContentImagesV1(body);
    }
    if( version === 2 ) {
        return GetContentImagesV2(body);
    }
    console.warn("API invalid.");
    return [];
};