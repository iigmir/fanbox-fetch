// Packages
import { writeFile } from "node:fs/promises";
// Scripts
import { create_dir } from "./app/v2/fs.js";
import { get_posts_info } from "./app/v2/posts.js";
import PostScript from "./single-post.js";

/**
 * Request action
 * @param {Array[PostInfoInterface]} posts 
 * @param {String} root_path 
 * @see <https://stackoverflow.com/a/37576787>
 */
const fetch_post = async (posts = [], root_path = "./results/example") => {
    for (const post of posts) {
        await PostScript(root_path)(post);
    }
};

const main = async (account = "") => {
    // Input check
    if( account.length < 1 || account == undefined ) {
        throw new Error("No account given");
    }
    const result_path = `./results/${account}`;
    const posts = await get_posts_info(account, result_path);
    await create_dir(result_path);
    // write posts file
    await writeFile(posts.path, posts.content);
    await fetch_post(JSON.parse(posts.content), result_path);
};

main(process.argv[2]);

