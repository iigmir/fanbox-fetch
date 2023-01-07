// Packages
import { writeFile } from "node:fs/promises";
// Scripts
import { FetchPost, FetchImage } from "./app/ajax.js";
import { create_dir, create_image } from "./app/fs.js";
import { get_posts_file } from "./app/middlewares.js";
// Interfaces
import { PostInfoInterface, PostImageInterface } from "./app/interfaces.js";

function image_promise(root_path, result) {
    return async (item = PostImageInterface, index = 0) => {
        const api_interface = {
            filename: `${String(index + 1)}.${item.extension}`,
            path: `${root_path}/${result.post.id}/${String(index + 1)}.${item.extension}`,
            url: item.originalUrl,
        };
        try {
            const buffer = await FetchImage(api_interface.url);
            return { path: api_interface.path, buffer, okay: true };
        } catch (error) {
            await writeFile("./error.log", error);
            return { path: api_interface.path, buffer: error, okay: false };
        }
    };
}

const fetch_post = async (posts = [PostInfoInterface], root_path = "./results/example") => {
    const one_script = async (post = PostInfoInterface, root_path = "./results/example") => {
        console.log("Downloading: " + post.id);
        const result = await FetchPost(post.id);
        const result_path = `${root_path}/${result.postId}`;
        const images = result.post.body.images;
        // AJAX
        await create_dir(result_path);
        await writeFile(`${result_path}/metafile.json`, JSON.stringify(result.post));
        const ajax_images = Promise.all( images.map( image_promise(root_path, result) ) );
        const loaded_action = loaded_imgs => {
            loaded_imgs.forEach(its => {
                if (its.okay) {
                    create_image(its.path, its.buffer);
                }
            });
        };
        ajax_images.then( loaded_action );
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
