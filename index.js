// Packages
import { writeFile } from "node:fs/promises";
// Scripts
import { FetchPost } from "./app/ajax.js";
import { create_dir } from "./app/fs.js";
import { get_posts_file, fetch_image_action } from "./app/middlewares.js";
import PostScript from "./single-post.js";
// Interfaces
import { PostInfoInterface } from "./app/interfaces.js";

const fetch_post = async (posts = [PostInfoInterface], root_path = "./results/example") => {
    posts.forEach( PostScript(root_path) );
};

const main = async (account = "") => {
    // Input check
    if( account.length < 1 || account == undefined ) {
        throw new Error("No account given");
    }
    // Step 1: Fetch all posts
    const result_path = `./results/${account}`;
    const posts = await get_posts_file(account, result_path);
    // Step 2: Create the author & write posts file
    await create_dir(result_path);
    await writeFile(posts.path, posts.content);
    // Step 3: Fetch a post info
    await fetch_post(JSON.parse(posts.content), result_path);
};

main(process.argv[2]);

