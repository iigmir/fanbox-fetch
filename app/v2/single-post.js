import { base_url, options } from "./fetch.js";

/**
 * Get the post info
 * @param {String} postId 
 * @returns {Object}
 */
export const FetchPost = async (postId = "") => {
    const url = `${base_url}/post.info?postId=${postId}`;
    const { body } = await fetch( url, options ).then( r => r.json() );
    return {
        author: body.creatorId,
        postId: postId,
        post: body
    };
};

/**
 * Get the creator's posts API path
 * @param {String} creatorId 
 * @returns {String} API path
 */
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
