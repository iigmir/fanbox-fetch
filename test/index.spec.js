import { FetchPosts } from "../lib/posts.js";
import { FetchPostAPI } from "../lib/single-post.js";
import { strictEqual } from "assert";

const account = "hiten";

describe("FetchPostAPI", () => {
    it("should render catch-all-post API", async () => {
        const expected = "limit=10";
        const result = await FetchPostAPI(account);
        strictEqual( result.includes(expected), false );
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

describe("FetchPost", () => {
    it("involes private items, the program therefore will not test here", async () => {
        strictEqual( 2 + 2, 4 );
    });
});
