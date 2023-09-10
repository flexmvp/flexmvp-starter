import { InferModel } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { articles } from "./article";

export const comments = pgTable("comment", {
  commentId: text("comment_id").primaryKey(),
  articleId: text("article_id")
    .references(() => articles.articleId)
    .notNull(),
  text: text("text").notNull(),
  created: timestamp("created").defaultNow().notNull(),
});

export type Comment = InferModel<typeof comments>;
export type NewComment = InferModel<typeof comments, "insert">;
