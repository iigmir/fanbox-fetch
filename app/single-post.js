// Packages
import { writeFile } from "node:fs/promises";
// Scripts
import { FetchPost } from "../lib/single-post.js";
import { create_dir } from "../lib/fs.js";
import { FetchImageAction } from "../lib/image.js";
import { PostInfoInterface } from "../lib/interfaces.js";
import { GetImages } from "../lib/data-processing/index.js";

export default (root_path = "./results/example") => {
    const write_data_infos = (result_path, contents, metadata, images) => {
        return Promise.all([
            writeFile(`${result_path}/contents.json`, JSON.stringify(contents)),
            writeFile(`${result_path}/metadata.json`, JSON.stringify(metadata)),
            writeFile(`${result_path}/images.json`, JSON.stringify(images)),
        ]);
    };
    return async (post = PostInfoInterface) => {
        console.log("Downloading: " + post.id);
        const result = await FetchPost(post.id);
        const result_path = `${root_path}/${result.postId}`;
        const images = GetImages(result.post.body).map( ({ content }) => content );
        // AJAX
        await create_dir(result_path);
        await write_data_infos( result_path, result, result.post, images );
        if (Array.isArray(images)) {
            await FetchImageAction(images, root_path, result.post.id);
        }
    };
}
