import { base_url, options } from "./fetch.js";

/**
 * @typedef {Object} PostInterface
 * @property {String} author The creator's account name.
 * @property {String} postId The post's ID.
 * @property {Object} post The post's infomation.
 */

/**
 * Get the post info
 * @param {String} postId 
 * @returns {PostInterface}
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
 * Pretty much all params from `/post.paginateCreator`. which normolly returns something like this:
 * 
 * ```json
 * [
 *     "https://api.fanbox.cc/post.listCreator?creatorId=CREATOR&maxPublishedDatetime=PUBLISHED_DATE&maxId=FIRST_POST_ID&limit=PAGES_LISTED",
 *     "...so on"
 * ]
 * ```
 * 
 * Here, the function alter the `limit` param to total number of posts by the creator,
 * so that the `FetchPostAPI` function can request all posts.
 * 
 * @param {Array} body Response items from `/post.paginateCreator`.
 * @returns {String} Params for `/post.listCreator` like `creatorId=CREATOR&maxPublishedDatetime=PUBLISHED_DATE&maxId=FIRST_POST_ID&limit=TOTAL_PAGEs`.
 */
const GenerateListCreatorParams = (body = [""]) => {
    const search = new URL(body[0]).search.slice(1);
    const params_array = search.split( "&" ).map( a => a.split("=") );
    const params = Object.fromEntries( params_array );
    const limit = String(params.limit * body.length);
    return new URLSearchParams({ ...params, limit, }).toString();
};

/**
 * Get the creator's posts API path
 * @param {String} creatorId 
 * @returns {String} API path
 */
export const FetchPostAPI = async (creatorId = "") => {
    const ajax_url = `${base_url}/post.paginateCreator?creatorId=${creatorId}`;
    const { body } = await fetch( ajax_url, options ).then( r => r.json() );
    return `${base_url}/post.listCreator?${GenerateListCreatorParams(body)}`;
};
