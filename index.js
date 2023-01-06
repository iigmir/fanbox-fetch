import FetchPolyfill from "node-fetch";

if( fetch == undefined ) {
    fetch = FetchPolyfill;
}

const main = (account = "") => {};

main(process.argv[2]);
