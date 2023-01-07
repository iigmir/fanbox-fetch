import { PostImageInterface } from "./interfaces.js";
import { options } from "./fetch.js";
import { create_image } from "./fs.js";

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
 * Request image: use fetch
 * @param {String} url Given image URL.
 * @returns {Buffer} Image buffer.
 * @see <https://stackoverflow.com/a/69589656>
 */
const FetchImage = async (url = "") => {
    const imageBlob = await fetch( url, options ).then( r => r.blob() );
    const arrayBuffer = await imageBlob.arrayBuffer();
    return Buffer.from(arrayBuffer);
};


/**
 * Request image
 * @param {String} root_path The exporting path for the author.
 * @param {String} id 
 * @returns {Function}
 */
const image_promise = (root_path = "./results/example", id = "") => {
    /**
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
            const buffer = await FetchImage(api_interface.url);
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

const image_action = (resolve, reject) => {
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
 * @param {String} root_path The exporting path for the author.
 * @param {String} post_id 
 * @returns {Promise}
 */
export const fetch_image_action = (images = [PostImageInterface], root_path = "./results/example", post_id = "") => {
    return new Promise( (resolve, reject) => {
        const ajax_images = images.map( image_promise(root_path, post_id) );
        Promise.all( ajax_images ).then( (loaded_imgs) => {
            loaded_imgs.forEach( image_action(resolve, reject) );
        }).catch( e => reject(e) );
    });
};
