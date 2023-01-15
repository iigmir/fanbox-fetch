import { readFile } from "fs";
import { fetch_post } from "./posts.js";

const action = (up, source) => {
    if (up) throw up;
    const get_json = (contents = "") => {
        try {
            return JSON.parse(contents);
        } catch (error) {
            return [];
        }
    };
    const contents = get_json(source);
    const account = contents[0].creatorId;
    const result_path = `./results/${account}`;
    fetch_post(contents, result_path);
};

const main = (path) => {
    readFile( path, "utf-8", action);
};

main(process.argv[2]);
