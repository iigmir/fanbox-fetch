/**
 * Get an account without the "@" prefix.
 * @param {String} input 
 * @returns Account
 */
export const GetAccount = (input = "@") => {
    if( input.length < 1 || input == undefined ) {
        throw new Error("No account given");
    }
    return input.replace( /^@/, "" );
};

/**
 * 
 * @param {String} input URL
 */
export const GetParsedUrl = (input = "") => {
    const url = new URL(input);
    const not_fanbox = /fanbox.cc/.test(url.hostname) === false;
    if( not_fanbox ) {
        throw new TypeError("Not a fanbox site");
    }
    /**
     * Get account
     * @param {URL.hostname} hostname 
     * @param {URL.pathname} pathname 
     * @returns Account
     */
    const get_account = (hostname = "", pathname = "") => {
        const account_at_pathname = /^\/@/.test(pathname);
        const sperated_host = hostname.split(".");
        const sperated_pathname = pathname.split("/");
        const account_value = account_at_pathname ? sperated_pathname[1] : sperated_host[0];
        return GetAccount( account_value );
    };
    const account = get_account( url.hostname, url.pathname );
    /**
     * Get an ID
     * @param {URL.pathname} pathname 
     * @returns Creation ID
     */
    const get_id = (pathname = "") => {
        const filtered_path = pathname.match(/\bposts\/([\w\s\.]*)$/g) ?? [""];
        return filtered_path[0].split("/")[1] ?? "";
    };
    const id = get_id( url.pathname );
    return { account, id };
};
