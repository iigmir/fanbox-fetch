// Packages
import { writeFile } from "node:fs/promises";
// Scripts
import { FetchPost } from "../lib/single-post.js";
import { create_dir } from "../lib/fs.js";
import { FetchImageAction } from "../lib/image.js";
import { PostInfoInterface } from "../lib/interfaces.js";
import { GetImages } from "../lib/data-processing/index.js";

export default (root_path = "./results/example") => {
    return async (post = PostInfoInterface) => {
        console.log("Downloading: " + post.id);
        const result = await FetchPost(post.id);
        const result_path = `${root_path}/${result.postId}`;
        const images = GetImages( result.post.body ).map( ({ content }) => content );
        // AJAX
        await create_dir(result_path);
        await writeFile(`${result_path}/metadata.json`, JSON.stringify(result.post));
        await writeFile(`${result_path}/images.json`, JSON.stringify(images));
        if (Array.isArray(images)) {
            await FetchImageAction(images, root_path, result.post.id);
        }
    };
}
