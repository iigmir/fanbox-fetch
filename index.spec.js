import FetchPolyfill from "node-fetch";
import FetchPostAPI from "./app/fetch-post-api.js";
import FetchPost from "./app/fetch-post.js";
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

describe("FetchPost", () => {
    it("should get posts", async () => {
        const url = "https://api.fanbox.cc/post.listCreator?creatorId=hiten&maxPublishedDatetime=2022-12-18 22:08:31&maxId=4949682&limit=80";
        const result = await FetchPost(url);
        strictEqual( result[0].id, "4949682" );
        strictEqual( result[64].id, "230963" );
    });
});
