import PostScript from "./single-post.js";

const account = process.argv[2];
const id = process.argv[3];

const main = async (account = "", id = "") => {
    if( account.length < 1 || account == undefined ) {
        throw new Error("No account given");
    }
    if( id.length < 1 || id == undefined ) {
        throw new Error("No account given");
    }
    const result_path = `./results/${account}`;
    const post = { id };
    PostScript(result_path, post);
}

main(account, id);
