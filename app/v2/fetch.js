import dotenv from "dotenv";
dotenv.config();

export const base_url = `https://api.fanbox.cc`;

export const options = {
    credentials: "include",
    headers: {
        "Accept": "application/json, text/plain, */*",
        "Origin": `https://fanbox.cc`,
        "Referer": `https://fanbox.cc`,
        "Cookie": process.env.USER_COOKIE,
	    "User-Agent": "Mozilla/5.0 (Linux) Gecko/20100101 Firefox/100.0 iFanboxFetch/1.0"
    }
};
