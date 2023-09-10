import { InferModel } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const articles = pgTable(
  "article",
  {
    articleId: text("article_id").primaryKey(),
    title: text("title").notNull(),
    url: text("url").notNull(),
    created: timestamp("created").defaultNow().notNull(),
    updated: timestamp("updated").defaultNow().notNull(),
  },
  (article) => {
    return {
      createdIdx: index("name_idx").on(article.created),
    };
  }
);

export type Article = InferModel<typeof articles>;
export type NewArticle = InferModel<typeof articles, "insert">;
