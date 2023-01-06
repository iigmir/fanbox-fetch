const fetch_options = {
    headers: {
        "Accept": "application/json, text/plain, */*",
        "Origin": `https://fanbox.cc`,
        "Referer": `https://fanbox.cc`,
    }
};

export default async (creatorId = "") => {
    const base_url = `https://api.fanbox.cc`;
    const ajax_url = `${base_url}/post.paginateCreator?creatorId=${creatorId}`;
    const { body } = await fetch( ajax_url, fetch_options ).then( r => r.json() );
    const get_params = (body = [""]) => {
        const search = new URL(body[0]).search.slice(1);
        const params_array = search.split( "&" ).map( a => a.split("=") );
        const params = Object.fromEntries( params_array );
        return { ...params, limit: String( params.limit * body.length ) };
    }
    const params = new URLSearchParams( get_params(body) ).toString();
    return `${base_url}/post.listCreator?${params}`;
};
