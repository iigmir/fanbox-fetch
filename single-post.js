// Packages
import { writeFile } from "node:fs/promises";
// Scripts
import { FetchPost } from "./app/v2/single-post.js";
import { create_dir } from "./app/v2/fs.js";
import { fetch_image_action } from "./app/v2/image.js";
import { PostInfoInterface } from "./app/v2/interfaces.js";

export default (root_path = "./results/example") => {
    return async (post = PostInfoInterface) => {
        console.log("Downloading: " + post.id);
        const result = await FetchPost(post.id);
        const result_path = `${root_path}/${result.postId}`;
        const images = result.post.body.images;
        // AJAX
        await create_dir(result_path);
        await writeFile(`${result_path}/metafile.json`, JSON.stringify(result.post));
        if (Array.isArray(images)) {
            await fetch_image_action(images, root_path, result.post.id);
        }
    };
}
