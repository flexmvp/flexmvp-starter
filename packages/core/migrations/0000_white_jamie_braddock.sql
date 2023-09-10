CREATE TABLE IF NOT EXISTS "article" (
	"article_id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "comment" (
	"comment_id" text PRIMARY KEY NOT NULL,
	"article_id" text NOT NULL,
	"text" text NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_article_id_article_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "article"("article_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "name_idx" ON "article" ("created");