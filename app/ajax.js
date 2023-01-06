import FetchPolyfill from "node-fetch";
import dotenv from "dotenv";

const base_url = `https://api.fanbox.cc`;

const options = {
    credentials: "include",
    headers: {
        "Accept": "application/json, text/plain, */*",
        "Origin": `https://fanbox.cc`,
        "Referer": `https://fanbox.cc`,
        "Cookie": process.env.USER_COOKIE
    }
};

// Pre-production scripts
// Load dotenv
dotenv.config();
// Fetch polyfill
if( fetch == undefined ) {
    fetch = FetchPolyfill;
}

export const FetchPostAPI = async (creatorId = "") => {
    const ajax_url = `${base_url}/post.paginateCreator?creatorId=${creatorId}`;
    const { body } = await fetch( ajax_url, options ).then( r => r.json() );
    const get_params = (body = [""]) => {
        const search = new URL(body[0]).search.slice(1);
        const params_array = search.split( "&" ).map( a => a.split("=") );
        const params = Object.fromEntries( params_array );
        return { ...params, limit: String( params.limit * body.length ) };
    }
    const params = new URLSearchParams( get_params(body) ).toString();
    return `${base_url}/post.listCreator?${params}`;
};

export const FetchPosts = async (url = "") => {
    const { body } = await fetch( url, options ).then( r => r.json() );
    return body.items;
};

export const FetchPost = async (postId = "") => {
    const url = `${base_url}/post.info?postId=${postId}`;
    const { body } = await fetch( url, options ).then( r => r.json() );
    // console.log({ url, postId, options, response });
    // console.log( body );
    return {
        author: body.creatorId,
        postId: postId,
        post: body
    };
};


