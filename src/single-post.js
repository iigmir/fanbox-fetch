// Packages
import { writeFile, } from "node:fs/promises";
import { existsSync, mkdirSync } from "fs";
// Scripts
import { FetchPost } from "./single-post.module.js";
import { create_dir } from "./fs.module.js";
import { FetchImageAction } from "./image.module.js";
import { PostInfoInterface } from "./interfaces.js";
import { GetImages } from "./data-processing/index.js";

const create_directory = (result_path = "./results/example/1") => {
    const metadata_dir = `${result_path}/metadata`;
    if (!existsSync(result_path)) {
        mkdirSync(result_path, { recursive: true });
    }
    return Promise.all([
        create_dir(result_path),
        create_dir(metadata_dir),
    ]);
};

const create_metadatas = (result_path = "./results/example/1", contents = [], metadata = [], images = []) => {
    const metadata_dir = `${result_path}/metadata`;
    return Promise.all([
        writeFile(`${metadata_dir}/contents.json`, JSON.stringify(contents)),
        writeFile(`${metadata_dir}/metadata.json`, JSON.stringify(metadata)),
        writeFile(`${metadata_dir}/images.json`, JSON.stringify(images)),
    ]);
};

export default (root_path = "./results/example") => {
    return async (post = PostInfoInterface) => {
        console.log("Downloading: " + post.id);
        const result = await FetchPost(post.id);
        const result_path = `${root_path}/${result.postId}`;
        const images = GetImages(result.post.body).map( ({ content }) => content );
        // AJAX
        await create_directory( result_path );
        await create_metadatas( result_path, result, result.post, images );
        if( images.length < 16 ) {
            await FetchImageAction( images, root_path, result.post.id );
        } else {
            console.warn("Images won't download because it is too many. Consider using Python script.");
        }
    };
}
