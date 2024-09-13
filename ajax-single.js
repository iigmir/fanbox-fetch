import { main } from "./src/fetch-single-file.js";

const account = process.argv[2];
const id = process.argv[3];

main(account, id);
