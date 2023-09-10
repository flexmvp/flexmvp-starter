import { Api } from "sst/constructs";
import { expect, it } from "vitest";
import { createClient } from "@flexmvp-starter/graphql/genql";
import { Article } from "@flexmvp-starter/core/src/article";

// it("create an article", async () => {
//   const client = createClient({
//     url: Api.api.url + "/graphql",
//   });

//   const article = await client.mutation({
//     createArticle: [
//       { title: "Hello world", url: "https://example.com" },
//       {
//         id: true,
//       },
//     ],
//   });
//   const list = await Article.list();
//   expect(
//     list.find((a) => a.articleId === article.createArticle.id)
//   ).not.toBeNull();
// });
