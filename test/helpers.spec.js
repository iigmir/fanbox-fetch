import { GetAccount, GetParsedUrl } from "../app/helpers.js";
import { strictEqual, deepStrictEqual, throws } from "assert";

describe("GetAccount", () => {
    it("should get an account", async () => {
        const account = "hiten";
        const result = GetAccount(account);
        strictEqual( result, "hiten" );
    });
    it("should get an account without the '@' prefix", async () => {
        const account = "@miyajimareiji";
        const result = GetAccount(account);
        strictEqual( result, "miyajimareiji" );
    });
    it("should throw an error if input is invalid", async () => {
        /**
         * @see https://stackoverflow.com/a/6645586
         */
        const expected = () => GetAccount("");
        throws( expected, { message: "No account given" } );
    });
});

describe("GetParsedUrl", () => {
    it("should get an account and an ID: The @ prefix", async () => {
        const input = "https://www.fanbox.cc/@hiten/posts/4949682";
        const result = GetParsedUrl(input);
        const expected = { account: "hiten", id: "4949682" };
        deepStrictEqual( result, expected );
    });
    it("should get an account and an ID: The URL prefix", async () => {
        const input = "https://miyajimareiji.fanbox.cc/posts/5130849";
        const result = GetParsedUrl(input);
        const expected = { account: "miyajimareiji", id: "5130849" };
        deepStrictEqual( result, expected );
    });
    it("should get an account and an ID: No ID", async () => {
        const input = "https://miyajimareiji.fanbox.cc";
        const result = GetParsedUrl(input);
        const expected = { account: "miyajimareiji", id: "" };
        deepStrictEqual( result, expected );
    });
    it("should throw an error if input is invalid: Domain", async () => {
        const input = "https://www.example.com";
        const expected = () => GetParsedUrl(input);
        throws( expected, { message: "Not a fanbox site" } );
    });
});
