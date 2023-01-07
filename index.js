// Packages
import { writeFile } from "node:fs/promises";
// Scripts
import { create_dir } from "./app/fs.js";
import { get_posts_file } from "./app/middlewares.js";
import PostScript from "./single-post.js";
// Interfaces
import { PostInfoInterface } from "./app/interfaces.js";

/**
 * Fetch a post info
 * @param {Array[PostInfoInterface]} posts 
 * @param {String} root_path 
 */
const fetch_post = async (posts = [PostInfoInterface], root_path = "./results/example") => {
    // posts.forEach( PostScript(root_path) );
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
    const posts = await get_posts_file(account, result_path);
    await create_dir(result_path);
    // write posts file
    await writeFile(posts.path, posts.content);
    await fetch_post(JSON.parse(posts.content), result_path);
};

main(process.argv[2]);

