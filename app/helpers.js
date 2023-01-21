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
    const not_fanbox = /fanbox.cc/.test(url.host) === false;
};
