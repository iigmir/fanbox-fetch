import { FetchPostAPI, FetchPosts, FetchImage } from "./ajax.js";
import { PostImageInterface } from "./interfaces.js";

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
            await writeFile("./error.log", error);
            return { path: api_interface.path, buffer: error, okay: false };
        }
    };
}

