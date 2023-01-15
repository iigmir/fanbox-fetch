import PostScript from "./single-post.js";
import { create_dir } from "../lib/fs.js";

export const main = async (account = "", id = "") => {
    if( account.length < 1 || account == undefined ) {
        throw new Error("No account given");
    }
    if( id.length < 1 || id == undefined ) {
        throw new Error("No account given");
    }
    const result_path = `./results/${account}`;
    const post = { id };
    await create_dir(result_path);
    PostScript(result_path)(post);
}
