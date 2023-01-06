// Packages
import { mkdir, writeFile } from "node:fs/promises";
// Scripts
import { FetchPostAPI, FetchPosts } from "./app/ajax.js";

const main = async (account = "") => {
    // Input check
    if( account.length < 1 || account == undefined ) {
        throw new Error("No account given");
    }
    // Functions
    const create_dir = async (path = "") => {
        try {
            await mkdir(path);
        } catch (error) {
            console.warn(error.message);
        }
    };
    const get_posts_file = async (account = "", result_path = "") => {
        const apiurl = await FetchPostAPI(account);
        const posts = await FetchPosts(apiurl);
        return {
            path: `${result_path}/posts.json`,
            content: JSON.stringify(posts),
        };
    };
    // Main
    const result_path = `./results/${account}`;
    create_dir(result_path);
    const posts = await get_posts_file(account, result_path);
    await writeFile(posts.path, posts.content);
};

main(process.argv[2]);
