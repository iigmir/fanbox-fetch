// Packages
import { writeFile } from "node:fs/promises";
// Scripts
import { create_dir } from "./fs.module.js";
import { get_posts_info } from "./posts.module.js";
import { GetAccount } from "./helpers.js";
import PostScript from "./single-post.js";

/**
 * Request action
 * @param {Array[PostInfoInterface]} posts 
 * @param {String} root_path 
 * @see <https://stackoverflow.com/a/37576787>
 */
export const fetch_post = async (posts = [], root_path = "./results/example") => {
    for (const post of posts) {
        await PostScript(root_path)(post);
    }
};

export const main = async (input_account = "") => {
    const account = GetAccount(input_account)
    const result_path = `./results/${account}`;
    const posts = await get_posts_info(account, result_path);
    await create_dir(result_path);
    // write posts file
    await writeFile(posts.path, posts.content);
    await fetch_post(JSON.parse(posts.content), result_path);
};
