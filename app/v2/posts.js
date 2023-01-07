import { FetchPostAPI } from "./single-post.js";
import { options } from "./fetch.js";

/**
 * Well... Posts.
 * @param {String} url URL
 * @returns {Object}
 */
export const FetchPosts = async (url = "") => {
    const { body } = await fetch( url, options ).then( r => r.json() );
    return body.items;
};

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

