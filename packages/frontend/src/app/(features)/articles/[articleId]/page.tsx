"use client";
import { Article } from "@flexmvp-starter/graphql/genql";
import { useTypedQuery } from "@flexmvp-starter/graphql/urql";

import { toast } from "react-toastify";
import { EditArticleForm } from "@flexmvp/app/(features)/articles/[articleId]/EditArticleForm";
import { PageHeading } from "@flexmvp/components";
import { useRedirectClient } from "@flexmvp/hooks";

type ArticlePageProps = {
  params: {
    articleId: string;
  };
};

export default function ArticlePage({ params }: ArticlePageProps) {
  const { articleId } = params;
  const [{ fetching, data, stale }, rest] = useTypedQuery({
    query: {
      getArticle: [
        { articleId },
        {
          id: true,
          url: true,
          title: true,
          comments: {
            id: true,
          },
        },
      ],
    },
  });
  const article = data?.getArticle;
  const redirect = useRedirectClient();

  const onSuccess = (data: Partial<Article>) => {
    toast.success(
      <>
        Article <em>{data.title} </em> updated
      </>
    );
  };

  const onDelete = ({ title }: Partial<Article>) => {
    redirect("/articles");
    toast.success(
      <>
        Article <em>{title}</em> deleted
      </>
    );
  };

  return (
    <>
      <PageHeading>
        <PageHeading.Title>{article?.title || "..."}</PageHeading.Title>
        <PageHeading.Subtitle>Edit Article</PageHeading.Subtitle>
      </PageHeading>
      <pre>{JSON.stringify(rest, null, 2)}</pre>
      <EditArticleForm
        articleId={articleId}
        defaultValues={{
          title: article?.title,
          url: article?.url,
        }}
        disabled={fetching}
        onSuccess={onSuccess}
        onDelete={onDelete}
      />
    </>
  );
}
