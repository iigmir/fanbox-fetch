// Packages
import FetchPolyfill from "node-fetch";
import { mkdir, writeFile } from "node:fs/promises";
// Scripts
import FetchPostAPI from "./app/fetch-post-api.js";
import FetchPosts from "./app/fetch-posts.js";

if( fetch == undefined ) {
    fetch = FetchPolyfill;
}

const main = async (account = "") => {
    if( account.length < 1 || account == undefined ) {
        throw new Error("No account given");
    }
    const result_path = `./results/${account}`;
    await mkdir(result_path);
    const apiurl = await FetchPostAPI(account);
    const posts = await FetchPosts(apiurl);
    await writeFile(`${result_path}/posts.json`, JSON.stringify(posts));
};

main(process.argv[2]);
