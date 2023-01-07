import { FetchPostAPI, FetchPosts, FetchImage } from "./ajax.js";
import { PostImageInterface } from "./interfaces.js";
import { create_image } from "./fs.js";

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
            return { path: api_interface.path, buffer, okay: true };
        } catch (error) {
            // await writeFile("./error.log", error);
            console.warn( error );
            return { path: api_interface.path, buffer: error, okay: false };
        }
    };
}

export const fetch_image_action = (images, root_path = "./results/example", result) => {
    const ajax_images = Promise.all(images.map(image_promise(root_path, result.post.id)));
    const loaded_action = loaded_imgs => {
        const cb = its => {
            if (its.okay) {
                create_image(its.path, its.buffer);
            }
        };
        loaded_imgs.forEach(cb);
    };
    ajax_images.then(loaded_action);
};
