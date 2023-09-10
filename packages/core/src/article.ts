export * as Article from "./article";

import { ulid } from "ulid";
import { db } from "./db";
import { Article, articles } from "./models/article";
import { comments as commentsTable } from "./models/comment";
import { desc, eq } from "drizzle-orm/expressions";

/**
 * Create a new article
 */
export async function create(title: string, url: string) {
  const result = await db
    .insert(articles)
    .values({ articleId: ulid(), title, url })
    .returning();

  return result[0];
}

/**
 * Get an article by ID
 */
export async function get(articleId: string) {
  const result = await db
    .select()
    .from(articles)
    .where(eq(articles.articleId, articleId));

  return result[0];
}

/**
 * List all articles
 */
export async function list() {
  return await db.select().from(articles).orderBy(desc(articles.created));
}

/**
 * Update an article
 */
export async function update(
  articleId: string,
  { title, url }: Pick<Article, "title" | "url">
) {
  const result = await db
    .update(articles)
    .set({
      title,
      url,
    })
    .where(eq(articles.articleId, articleId))
    .returning();

  return result[0];
}

/**
 * Delete an article
 */
export async function _delete(articleId: string) {
  const result = await db
    .delete(articles)
    .where(eq(articles.articleId, articleId))
    .returning();

  return result[0];
}

/**
 * Add a comment to an article
 */
export async function addComment(articleId: string, text: string) {
  const result = await db
    .insert(commentsTable)
    .values({
      commentId: ulid(),
      articleId,
      text,
    })
    .returning();

  return result[0];
}

/**
 * List all comments for an article
 */
export async function comments(articleId: string) {
  return await db
    .select()
    .from(commentsTable)
    .where(eq(commentsTable.articleId, articleId));
}
