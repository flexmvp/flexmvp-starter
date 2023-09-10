import { Article } from "@/core/article";
import { Article as ArticleModel } from "@/core/models/article";
import { Comment as CommentModel } from "@/core/models/comment";
import { builder } from "../builder";

const CommentType = builder.objectRef<CommentModel>("Comment").implement({
  fields: (t) => ({
    id: t.exposeID("commentId"), // .exposeID("commentId")
    text: t.exposeString("text"),
  }),
});

const ArticleType = builder.objectRef<ArticleModel>("Article").implement({
  fields: (t) => ({
    id: t.exposeID("articleId"), // .exposeID("articleId")
    url: t.exposeString("url"),
    title: t.exposeString("title"),
    comments: t.field({
      type: [CommentType],
      resolve: (article) => Article.comments(article.articleId),
    }),
  }),
});

builder.queryFields((t) => ({
  getArticle: t.field({
    type: ArticleType,
    args: {
      articleId: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      const result = await Article.get(args.articleId);

      if (!result) {
        throw new Error("Article not found");
      }

      return result;
    },
  }),
  listArticles: t.field({
    type: [ArticleType],
    resolve: () => Article.list(),
  }),
}));

builder.mutationFields((t) => ({
  addComment: t.field({
    type: CommentType,
    args: {
      articleId: t.arg.string({ required: true }),
      text: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Article.addComment(args.articleId, args.text),
  }),
  createArticle: t.field({
    type: ArticleType,
    args: {
      url: t.arg.string({ required: true }),
      title: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Article.create(args.title, args.url),
  }),
  updateArticle: t.field({
    type: ArticleType,
    args: {
      articleId: t.arg.string({ required: true }),
      url: t.arg.string({ required: true }),
      title: t.arg.string({ required: true }),
    },
    resolve: (_, args) =>
      Article.update(args.articleId, {
        url: args.url,
        title: args.title,
      }),
  }),
  deleteArticle: t.field({
    type: ArticleType,
    args: {
      articleId: t.arg.string({ required: true }),
    },
    resolve: (_, args) => Article._delete(args.articleId),
  }),
}));
