export default {
    "scalars": [
        1,
        2,
        7
    ],
    "types": {
        "Article": {
            "comments": [
                4
            ],
            "id": [
                1
            ],
            "title": [
                2
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ID": {},
        "String": {},
        "Auth": {
            "code": [
                2
            ],
            "status": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Comment": {
            "id": [
                1
            ],
            "text": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Mutation": {
            "addComment": [
                4,
                {
                    "articleId": [
                        2,
                        "String!"
                    ],
                    "text": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createArticle": [
                0,
                {
                    "title": [
                        2,
                        "String!"
                    ],
                    "url": [
                        2,
                        "String!"
                    ]
                }
            ],
            "deleteArticle": [
                0,
                {
                    "articleId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateArticle": [
                0,
                {
                    "articleId": [
                        2,
                        "String!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ],
                    "url": [
                        2,
                        "String!"
                    ]
                }
            ],
            "verify": [
                3,
                {
                    "confirmationCode": [
                        2,
                        "String!"
                    ],
                    "emailAddress": [
                        2,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "Query": {
            "getArticle": [
                0,
                {
                    "articleId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "listArticles": [
                0
            ],
            "me": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Boolean": {}
    }
}