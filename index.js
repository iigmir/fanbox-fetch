// Packages
import { writeFile } from "node:fs/promises";
// Scripts
import { FetchPost } from "./app/ajax.js";
import { create_dir, create_image } from "./app/fs.js";
import { get_posts_file, image_promise } from "./app/middlewares.js";
// Interfaces
import { PostInfoInterface } from "./app/interfaces.js";

const fetch_post = async (posts = [PostInfoInterface], root_path = "./results/example") => {
    function fetch_image(images, root_path = "./results/example", result) {
        const ajax_images = Promise.all(images.map(image_promise(root_path, result.post.id)));
        const loaded_action = loaded_imgs => {
            const cb = its => {
                if (its.okay) {
                    create_image(its.path, its.buffer);
                }
            };
            loaded_imgs.forEach(cb);
        };
        ajax_images.then(loaded_action);
    }
    posts.forEach( async(post) => {
        console.log("Downloading: " + post.id);
        const result = await FetchPost(post.id);
        const result_path = `${root_path}/${result.postId}`;
        const images = result.post.body.images;
        // AJAX
        await create_dir(result_path);
        await writeFile(`${result_path}/metafile.json`, JSON.stringify(result.post));
        if( Array.isArray(images) ) {
            fetch_image(images, root_path, result);
        }
    });
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

