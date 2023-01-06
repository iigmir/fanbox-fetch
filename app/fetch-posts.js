import fetch_options from "./options.js";

export default async (url = "") => {
    const { body } = await fetch( url, fetch_options ).then( r => r.json() );
    // const get_params = (body = [""]) => {
    //     const search = new URL(body[0]).search.slice(1);
    //     const params_array = search.split( "&" ).map( a => a.split("=") );
    //     const params = Object.fromEntries( params_array );
    //     return { ...params, limit: String( params.limit * body.length ) };
    // }
    // const params = new URLSearchParams( get_params(body) ).toString();
    return body;
};

