export const PostInfoInterface = {
    "id": "",
    "title": "",
    "feeRequired": 0,
    "publishedDatetime": "",
    "updatedDatetime": "",
    "tags": [],
    "isLiked": false,
    "likeCount": 0,
    "commentCount": 0,
    "isRestricted": false,
    "user": {
        "userId": "",
        "name": "",
        "iconUrl": ""
    },
    "creatorId": "",
    "hasAdultContent": false,
    "cover": {
        "type": "",
        "url": ""
    },
    "excerpt": ""
};

export const PostItemInterface = {
    "id": "",
    "title": "",
    "feeRequired": 0,
    "publishedDatetime": "",
    "updatedDatetime": "",
    "tags": [
        ""
    ],
    "isLiked": false,
    "likeCount": 0,
    "commentCount": 0,
    "isRestricted": false,
    "user": {
        "userId": "",
        "name": "",
        "iconUrl": ""
    },
    "creatorId": "",
    "hasAdultContent": false,
    "type": "",
    "coverImageUrl": "",
    "body": {
        "text": "",
        "images": [
            {
                "id": "",
                "extension": "",
                "width": 0,
                "height": 0,
                "originalUrl": "",
                "thumbnailUrl": ""
            }
        ]
    },
    "excerpt": "",
    "commentList": {
        "items": [],
        "nextUrl": null
    },
    "nextPost": null,
    "prevPost": {
        "id": "",
        "title": "",
        "publishedDatetime": ""
    },
    "imageForShare": ""
}

export const PostImageInterface = PostItemInterface.body.images;
