import { PostImageInterface } from "./interfaces.js";
import { options } from "./fetch.module.js";
import { create_image } from "./fs.module.js";

/**
 * @typedef {Object} AuthorPostsInfo
 * @property {String} path Path the info should created to.
 * @property {String} content Author info content.
 */
/**
 * @typedef {Object} PromisedImageResponse
 * @property {String} path Path of the image should created to.
 * @property {Buffer|null} buffer Image buffer. Returns `null` if requesting failed.
 * @property {Error|null} error Error info if image requesting failed. Returns `null` if requesting successed.
 * @property {Boolean} okay Whether the requesting successed or not. `true` means yes and `false` means not.
 */

/**
 * Request image by using fetch
 * @param {String} url Given image URL.
 * @returns {ArrayBuffer} Image buffer.
 * @see <https://stackoverflow.com/a/69589656>
 */
const fetch_image = async (url = "") => {
    const imageBlob = await fetch( url, options ).then( r => r.blob() );
    const arrayBuffer = await imageBlob.arrayBuffer();
    return Buffer.from(arrayBuffer);
};

/**
 * Request image.
 * @param {String} root_path The exporting path for the author.
 * @param {String} id 
 * @returns {Function}
 */
const generate_image_promise = (root_path = "./results/example", id = "") => {
    /**
     * The main function.
     * @see [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
     * @param {PostImageInterface} item 
     * @param {Number} index 
     * @returns {PromisedImageResponse}
     */
    return async (item = PostImageInterface, index = 0) => {
        const api_interface = {
            filename: `${String(index + 1)}.${item.extension}`,
            path: `${root_path}/${id}/${String(index + 1)}.${item.extension}`,
            url: item.originalUrl,
        };
        try {
            const buffer = await fetch_image(api_interface.url);
            return {
                path: api_interface.path,
                buffer: buffer,
                error: null,
                okay: true
            };
        } catch (error) {
            // await writeFile("./error.log", error);
            console.warn( error );
            return {
                path: api_interface.path,
                buffer: null,
                error: error,
                okay: false
            };
        }
    };
};

/**
 * What should we do after requesting image?
 * @param {Promise.resolve} resolve [Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)
 * @param {Promise.reject} reject [Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)
 * @returns {Function}
 */
const actions_after_requesting = (resolve, reject) => {
    /**
     * The main function.
     * @see [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
     * @param {PromisedImageResponse} its
     */
    return its => {
        if (its.okay) {
            create_image(its.path, its.buffer);
            resolve(its.path);
        } else {
            reject(its.error);
        }
    };
};

/**
 * Fetch images provided
 * @param {Array[PostImageInterface]} images Input images path
 * @param {String} root_path The exporting path for the author
 * @param {String} post_id 
 * @returns {Promise}
 */
export const FetchImageAction = (images = [PostImageInterface], root_path = "./results/example", post_id = "") => {
    /**
     * The main function.
     * @param {Promise.resolve} resolve [Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)
     * @param {Promise.reject} reject [Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)
     */
    const main = (resolve, reject) => {
        const ajax_images = images.map( generate_image_promise(root_path, post_id) );
        /**
         * Just a middleware...
         * @param {Array[PromisedImageResponse]} loaded_imgs 
         */
        const action = (loaded_imgs = []) => {
            loaded_imgs.forEach( actions_after_requesting(resolve, reject) );
        };
        if( ajax_images.length < 1 ) {
            resolve([]);
        }
        Promise.all(ajax_images).then(action).catch(e => reject(e));
    };
    if (Array.isArray(images)) {
        return new Promise( main );
    }
    return new Promise( (resolve) => resolve([]) );
};
