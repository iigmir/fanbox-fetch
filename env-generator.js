import { readdir, readFile, writeFile } from "fs";
const input = process.argv[2];

function main(input = "") {
    function get_cookie() {
        const cookie_prefix = /^Cookie:/.test(input);
        if( cookie_prefix ) {
            return String(input).replace(/^Cookie:/, "");
        }
        return String(input);
    }
    if (!input) {
        throw new Error("Cookie not given. Please refer the Cookies section of manual for details.");
    }
    const cookie = 'USER_COOKIE="' + get_cookie() + '"';
    writeFile("./.env", cookie, up => { if (up) { throw up }; });
}

main(input);


