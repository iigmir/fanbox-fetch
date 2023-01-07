import { FetchPostAPI, FetchPosts, FetchImage } from "./ajax.js";
import { PostImageInterface } from "./interfaces.js";
import { create_image } from "./fs.js";

/**
 * @typedef {Object} AuthorPostsInfo
 * @property {String} path Path the info should created to.
 * @property {String} content Author info content.
 */
/**
 * Fetch posts info
 * @param {String} account 
 * @param {String} result_path 
 * @returns {AuthorPostsInfo} The post info
 */
export const get_posts_file = async (account = "", result_path = "") => {
    const apiurl = await FetchPostAPI(account);
    const posts = await FetchPosts(apiurl);
    return {
        path: `${result_path}/posts.json`,
        content: JSON.stringify(posts),
    };
};

export const image_promise = (root_path = "./results/example", id = "") => {
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
}

export const fetch_image_action = (images = [], root_path = "./results/example", result) => {
    return new Promise( (resolve, reject) => {
        const image_action = (resolve, reject) => {
            return its => {
                if (its.okay) {
                    create_image(its.path, its.buffer);
                    resolve(its.path);
                } else {
                    reject(its.error);
                }
            };
        }
        const ajax_images = Promise.all(
            images.map(
                image_promise(root_path, result.post.id)
            )
        );
        ajax_images.then( (loaded_imgs) => {
            loaded_imgs.forEach( image_action(resolve, reject) );
        }).catch( e => reject(e) );
    });
};
