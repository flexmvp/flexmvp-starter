import { Article } from "@flexmvp-starter-2/graphql/genql";
import { useTypedQuery } from "@flexmvp-starter-2/graphql/urql";
import {
  ChevronRightIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { use, useMemo } from "react";
import { Button, Link, Mask, Table } from "react-daisyui";
import { List, Spinner } from "@flexmvp/components";
import { useBreakpoints } from "@flexmvp/hooks";

export function ArticlesList() {
  // Handle empty document cache
  // https://formidable.com/open-source/urql/docs/basics/document-caching/#adding-typenames
  const context = useMemo(
    () => ({ additionalTypenames: ["Article", "Comments"] }),
    []
  );
  const [response] = useTypedQuery({
    query: {
      listArticles: {
        id: true,
        url: true,
        title: true,
        comments: {
          id: true,
        },
      },
    },
    context: useMemo(() => ({}), []),
  });
  // const articles = {};

  return (
    <List fetching={response.fetching} header={["Article", "Comments"]}>
      {response.data?.listArticles.map((article) => (
        <List.Row key={article.id} href={`/article/${article.id}`}>
          <List.Cell>
            <ArticleTitle {...article} />
          </List.Cell>
          <List.Cell>{article.comments.length}</List.Cell>
          <List.Cell>
            <List.Actions>
              <List.ActionItem
                title="Edit Article"
                href={`/articles/${article.id}`} // Or you can provide an onClick if you prefer
                Icon={PencilSquareIcon}
              />
              {/* You can easily add more action items here if needed */}
            </List.Actions>
          </List.Cell>
          <List.Responsive
            secondaryText={`${article.comments.length} comments`}
            href={`/articles/${article.id}`}
          >
            {article.title}
          </List.Responsive>
        </List.Row>
      ))}
    </List>
  );
}

const ArticleTitle = ({ title, url }: { title: string; url: string }) => (
  <div className="flex items-center space-x-3 w-full overflow-x-hidden">
    <Mask
      variant="squircle"
      src={`https://ui-avatars.com/api/?name=${title}`}
      className="w-8 h-8 flex-shrink-0"
    />
    <div className="flex-grow">
      {/* Important for truncation in flex container */}
      <List.SingleLine>{title}</List.SingleLine>

      <List.SingleLine className={"text-sm opacity-50"}>
        <a target="_blank" rel="noopener noreferrer" href={url}>
          {url.replace(/(^\w+:|^)\/\//, "")}
        </a>
      </List.SingleLine>
    </div>
  </div>
);
