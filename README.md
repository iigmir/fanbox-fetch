# fanbox-fetch

To fetch images from [Pixiv Fanbox](https://www.fanbox.cc).

## Minimum requirement

* A nodeJS version over 18 to support [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
* A cookie from `fanbox.cc` to fetch restricted images.
    * **WARNING**: cookies stores your personal information and registered payment information. Providing cookies to third parties can make them use information improperly and expose your account to risk. See [self-XSS](https://en.wikipedia.org/wiki/Self-XSS) for details.

## Install

1. Download the repo.
2. Copy your cookie into `.env` file like this: `USER_COOKIE=YOUR_COOKIE_AT_FANBOX`.
3. Press `npm install`.

## Commands

### `npm start`

* `npm start THE_AUTHOR`: Get all images posts form an author. For example, if typing `npm start hiten`, the script will download all scripts from [hiten's images](https://www.fanbox.cc/@hiten) from Fanbox.
* `npm start URL`: Download the creation by given URL. For example, typing `npm start https://miyajimareiji.fanbox.cc/posts/4889992` will get the [今週のかのかり裏話](https://miyajimareiji.fanbox.cc/posts/4889992) creation from Fanbox.

### `npm run single`

Format: `npm run single THE_AUTHOR THE_POST`.

### `npm run json`

To get files by given JSON path.

### `npm run check THE_AUTHOR`

To check if the images fetched successfully.

### `npm run test`

To run unit tests.
