import dotenv from "dotenv";
dotenv.config();

const base_url = `https://api.fanbox.cc`;

const options = {
    credentials: "include",
    headers: {
        "Accept": "application/json, text/plain, */*",
        "Origin": `https://fanbox.cc`,
        "Referer": `https://fanbox.cc`,
        "Cookie": process.env.USER_COOKIE,
	    "User-Agent": "Mozilla/5.0 (Linux) Gecko/20100101 Firefox/100.0 iFanboxFetch/1.0"
    }
};

if( fetch == undefined ) {
    throw new Error("Fetch API required");
}

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

/**
 * Well... Posts.
 * @param {String} url URL
 * @returns {Object}
 */
export const FetchPosts = async (url = "") => {
    const { body } = await fetch( url, options ).then( r => r.json() );
    return body.items;
};

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
 * 
 * @param {String} url Given image URL.
 * @returns {Buffer} Image buffer.
 * @see <https://stackoverflow.com/a/69589656>
 */
export const FetchImage = async (url = "") => {
    const imageBlob = await fetch( url, options ).then( r => r.blob() );
    const arrayBuffer = await imageBlob.arrayBuffer();
    return Buffer.from(arrayBuffer);
};


