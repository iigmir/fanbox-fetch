// Packages
import { writeFile } from "node:fs/promises";
// Scripts
import { FetchPost, FetchImage } from "./app/ajax.js";
import { create_dir, create_image } from "./app/fs.js";
import { get_posts_file } from "./app/middlewares.js";
// Interfaces
import { PostInfoInterface, PostItemInterface } from "./app/interfaces.js";

const fetch_post = async (posts = [PostInfoInterface], root_path = "./results/example") => {
    const one_image_cb = (root_path = "") => async (item = PostItemInterface.body.images[0], index = 0) => {
        const api_interface = {
            filename: `${String( index + 1 )}.${item.extension}`,
            path: `${root_path}/${item.id}/${String( index + 1 )}.${item.extension}`,
            url: item.originalUrl,
        };
        const buffer = await FetchImage( api_interface.url );
        create_image( api_interface.path, buffer );
    }
    const one_script = async (post = PostInfoInterface, root_path = "./results/example") => {
        const result = await FetchPost(post.id);
        const result_path = `${root_path}/${result.postId}`;
        await create_dir(result_path);
        await writeFile(`${result_path}/metafile.json`, JSON.stringify(result.post));
        one_image_cb(root_path)(result.post.body.images[0], 0);
    };
    one_script( posts[0], root_path );
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
