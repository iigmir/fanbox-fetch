import fetch_options from "./options.js";

export default async (url = "") => {
    const { body } = await fetch( url, fetch_options ).then( r => r.json() );
    return body.items;
};

