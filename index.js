import { main as main_by_account } from "./src/posts.js";
import { main as main_by_url_params } from "./src/fetch-single-file.js";
import { GetParsedUrl } from "./src/helpers.js";

const input = process.argv[2];

// Conditions
const is_url = /^http/.test(input);

if( is_url ) {
    const parsed_url = GetParsedUrl(input);
    main_by_url_params( parsed_url.account, parsed_url.id );
} else {
    main_by_account(input);
}
