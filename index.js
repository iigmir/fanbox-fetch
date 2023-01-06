// Packages
import { mkdir, writeFile } from "node:fs/promises";
// Scripts
import { FetchPostAPI, FetchPosts, FetchPost } from "./app/ajax.js";
// Interfaces
import { PostInfoInterface } from "./app/interfaces.js";

const create_dir = async (path = "") => {
    try {
        await mkdir(path);
    } catch (error) {
        console.warn(error.message);
    }
};

const fetch_post = async (posts = [PostInfoInterface], root_path = "./results/example") => {
    const one_script = async (post = PostInfoInterface, root_path = "./results/example") => {
        const result = await FetchPost(post.id);
        const result_path = `${root_path}/${result.postId}`;
        await create_dir(result_path);
        await writeFile(`${result_path}/metafile.json`, JSON.stringify(result.post));
    };
    one_script( posts[0], root_path );
};


const get_posts_file = async (account = "", result_path = "") => {
    const apiurl = await FetchPostAPI(account);
    const posts = await FetchPosts(apiurl);
    return {
        path: `${result_path}/posts.json`,
        content: JSON.stringify(posts),
    };
};

const main = async (account = "") => {
    // Input check
    if( account.length < 1 || account == undefined ) {
        throw new Error("No account given");
    }
    // Step 1: Create the author
    const result_path = `./results/${account}`;
    create_dir(result_path);
    // Step 2: Fetch all posts
    const posts = await get_posts_file(account, result_path);
    await writeFile(posts.path, posts.content);
    // Step 3: Fetch a post info
    await fetch_post(JSON.parse(posts.content), result_path);
};

main(process.argv[2]);
