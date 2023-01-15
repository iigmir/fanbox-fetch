const example_api = {
    blocks: [{
        "type": "p",
        "text": ""
    },
    {
        "type": "url_embed",
        "urlEmbedId": "foobar"
    },
    {
        "type": "p",
        "text": ""
    },
    {
        "type": "image",
        "imageId": "baz2000"
    }],
    imageMap: {
        "baz2000": {
            "id": "baz2000",
            "extension": "png",
            "width": 0,
            "height": 0,
            "originalUrl": "https://example.com/foobarbaz.png",
            "thumbnailUrl": "https://example.com/foobarbaz-t.jpeg"
        }
    },
    urlEmbedMap: {
        "foobar": {
            "id": "foobar",
            "type": "",
            "html": "<div></div>"
        }
    },
};

/**
 * Get all blocks.
 * @param {Object} api 
 * @returns {Array}
 */
export const GetBlocks = (api = example_api) => {
    const get_property = (type = "") => {
        switch (type) {
            case "p": return "text";
            case "url_embed": return "urlEmbedId";
            case "image": return "imageId";
            default: "";
        }
    };
    const get_property_value = (item, property, api) => {
        const hash_value = item[property];
        switch (property) {
            case "text": return item.text;
            case "urlEmbedId": return api.urlEmbedMap[hash_value];
            case "imageId": return api.imageMap[hash_value];
            default: "";
        }
    };
    const main = (api) => {
        return (item) => {
            const type = item.type;
            const property = get_property(type);
            const content = get_property_value(item, property, api);
            return { type, content };
        };
    }
    const array = api.blocks;
    return array.map( main(api) );
};

export const GetContentImages = (api = example_api) => {
    const array = GetBlocks(api);
    const main = (its) => its.type === "image";
    return array.filter( main );
};
