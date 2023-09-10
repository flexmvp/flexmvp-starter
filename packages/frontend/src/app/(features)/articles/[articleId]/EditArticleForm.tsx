import { Article, ArticleRequest } from "@flexmvp-starter/graphql/genql";
import { useTypedMutation } from "@flexmvp-starter/graphql/urql";
import { DefaultValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { CustomFormProps, Form } from "@flexmvp/components";

const formSchema = z.object({
  url: z.string().url("not a valid URL").min(1, "URL is required"),
  title: z.string().min(1, "Title is required"),
});
type FormSchemaType = z.infer<typeof formSchema>;

type EditArticleFormProps = CustomFormProps<FormSchemaType, Article> & {
  articleId: string;
  onDelete?: (article: Partial<Article>) => void;
};

export function EditArticleForm({
  articleId,
  defaultValues,
  onSuccess,
  onDelete,
  ...props
}: EditArticleFormProps) {
  const [result, updateArticle] = useTypedMutation((opts: FormSchemaType) => ({
    updateArticle: [
      { ...opts, articleId },
      {
        id: true,
        title: true,
        url: true,
      },
    ],
  }));
  const [_, deleteArticle] = useTypedMutation(
    (opts: { articleId: string }) => ({
      deleteArticle: [
        { articleId: opts.articleId },
        {
          id: true,
          title: true,
          url: true,
        },
      ],
    })
  );

  const onSubmit: SubmitHandler<FormSchemaType> = async ({ url, title }) => {
    try {
      const response = await updateArticle({
        url,
        title,
      });
      if (!response.data) throw new Error("No data returned from server");
      if (onSuccess) onSuccess(response.data?.updateArticle);
    } catch (error) {
      throw new Error("An error occurred while creating the article.");
    }
  };

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await deleteArticle({
        articleId,
      });
      if (!response.data) throw new Error("No data returned from server");
      if (onDelete) onDelete(response.data?.deleteArticle);
    } catch (error) {
      throw new Error("An error occurred while deleting the article.");
    }
  };

  return (
    <Form
      {...props}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      schema={formSchema}
    >
      <Form.TextInput placeholder="A good title" label="Title" id="title" />
      <Form.TextInput placeholder="http://example.com" label="URL" id="url" />
      <Form.Button>Save Article</Form.Button>
      {onDelete && (
        <Form.Button
          color="error"
          variant="outline"
          type="button"
          onClick={handleDelete}
          end
        >
          Delete
        </Form.Button>
      )}
    </Form>
  );
}
