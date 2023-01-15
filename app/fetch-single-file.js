import PostScript from "./single-post.js";
import { create_dir } from "../lib/fs.js";
import { GetAccount } from "./helpers.js";

export const main = async (input_account = "", id = "") => {
    const account = GetAccount(input_account);
    if( id.length < 1 || id == undefined ) {
        throw new Error("No ID given");
    }
    const result_path = `./results/${account}`;
    const post = { id };
    await create_dir(result_path);
    PostScript(result_path)(post);
}
