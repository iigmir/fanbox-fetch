// Packages
import { writeFile } from "node:fs/promises";
// Scripts
import { FetchPost } from "./app/ajax.js";
import { create_dir } from "./app/fs.js";
import { get_posts_file } from "./app/middlewares.js";
// Interfaces
import { PostInfoInterface } from "./app/interfaces.js";

const fetch_post = async (posts = [PostInfoInterface], root_path = "./results/example") => {
    const one_script = async (post = PostInfoInterface, root_path = "./results/example") => {
        const result = await FetchPost(post.id);
        const result_path = `${root_path}/${result.postId}`;
        await create_dir(result_path);
        await writeFile(`${result_path}/metafile.json`, JSON.stringify(result.post));
    };
    one_script( posts[0], root_path );
};

const main = async (account = "") => {
    // Input check
    if( account.length < 1 || account == undefined ) {
        throw new Error("No account given");
    }
    // Step 1: Create the author
    const result_path = `./results/${account}`;
    await create_dir(result_path);
    // Step 2: Fetch all posts
    const posts = await get_posts_file(account, result_path);
    await writeFile(posts.path, posts.content);
    // Step 3: Fetch a post info
    await fetch_post(JSON.parse(posts.content), result_path);
};

main(process.argv[2]);
