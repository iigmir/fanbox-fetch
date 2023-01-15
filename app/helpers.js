export const GetAccount = (input = "@") => {
    if( input.length < 1 || input == undefined ) {
        throw new Error("No account given");
    }
    return input.replace( /^@/, "" );
};
