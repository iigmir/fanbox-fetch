import FetchPolyfill from "node-fetch";
import FetchPostAPI from "./app/fetch-post-api.js";
import FetchPosts from "./app/fetch-posts.js";
import { strictEqual } from "assert";

const account = "hiten";

if( fetch == undefined ) {
    fetch = FetchPolyfill;
}

describe("FetchPostAPI", () => {
    it("should render catch-all-post API", async () => {
        const expected = "limit=70";
        const result = await FetchPostAPI(account);
        strictEqual( result.includes(expected), true );
    });
});

describe("FetchPosts", () => {
    it("should get posts", async () => {
        const url = "https://api.fanbox.cc/post.listCreator?creatorId=hiten&maxPublishedDatetime=2022-12-18 22:08:31&maxId=4949682&limit=80";
        const result = await FetchPosts(url);
        strictEqual( result[0].id, "4949682" );
        strictEqual( result[64].id, "230963" );
    });
});
