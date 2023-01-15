const example_api = {
    text: "Foo0\n\nBar\n\nBaz\n\n2000",
    files: [
        {
            "id": "foobar",
            "name": "Foobar2000",
            "extension": "mp4",
            "size": 100,
            "url": "https://example.com/example.mp4"
        }
    ],
    images: [{
        "id": "foobarbaz",
        "extension": "png",
        "width": 0,
        "height": 0,
        "originalUrl": "https://example.com/foobarbaz.png",
        "thumbnailUrl": "https://example.com/foobarbaz-t.jpeg"
    }]
};

const get_api = (type = "") => (content = "") => ({ type, content });

export const GetBlocks = (api = example_api) => {
    const texts = api.text?.split("\n").map( get_api("text") ) ?? [];
    const files = api.files?.map( get_api("file") ) ?? [];
    const images = api.images?.map( get_api("image") ) ?? [];
    return texts.concat(files, images);
};

export const GetContentImages = (api = example_api) => api.images?.map( get_api("image") ?? [] );
