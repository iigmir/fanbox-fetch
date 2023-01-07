# fanbox-fetch

To fetch images from [Pixiv Fanbox](https://fanbox.cc).

## Minimum requirement

* A nodeJS version over 18 to support [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
* A cookie from `fanbox.cc` to fetch restricted images.
    * **WARNING**: cookies stores your personal information and registered payment information. Providing cookies to third parties can make them use information improperly and expose your account to risk. See [self-XSS](https://en.wikipedia.org/wiki/Self-XSS) for details.

## How to use

1. Download the repo.
2. Copy your cookie into `.env` file like this: `USER_COOKIE=YOUR_COOKIE_AT_FANBOX`.
3. Press `npm install`.
4. If you want to download all images posts form an author, press `npm start THE_AUTHOR`; if you want to doanload just one post instead, press `npm run single THE_AUTHOR THE_POST`.
