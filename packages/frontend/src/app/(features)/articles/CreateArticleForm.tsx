// CreateArticleForm.tsx

import {
  Article,
  ArticleRequest,
  MutationRequest,
} from "@flexmvp-starter-2/graphql/genql";
import { useTypedMutation } from "@flexmvp-starter-2/graphql/urql";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "react-daisyui";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormProps } from "@flexmvp/components"; // Assuming you have exported the new Form component here

const formSchema = z.object({
  url: z.string().url("not a valid URL").min(1, "URL is required"),
  title: z.string().min(1, "Title is required"),
});
type CreateFormSchema = z.infer<typeof formSchema>;

type CreateFormProps = Partial<FormProps<CreateFormSchema>> & {
  onSuccess?: (data: Partial<Article>) => void;
};

export function CreateArticleForm({ onSuccess, ...props }: CreateFormProps) {
  const [result, createArticle] = useTypedMutation(
    (opts: CreateFormSchema) => ({
      createArticle: [
        opts,
        {
          id: true,
          title: true,
        },
      ],
    })
  );

  const onSubmit: SubmitHandler<CreateFormSchema> = async ({ url, title }) => {
    try {
      const response = await createArticle({ url, title });
      if (!response.data) throw new Error("No data returned from server");
      if (onSuccess) onSuccess(response.data?.createArticle);
    } catch (error) {
      throw new Error("An error occurred while creating the article.");
    }
  };

  return (
    <Form {...props} onSubmit={onSubmit} schema={formSchema}>
      <Form.TextInput placeholder="A good title" label="Title" id="title" />
      <Form.TextInput placeholder="http://example.com" label="URL" id="url" />
      <Form.Button loading={result.fetching}>Submit</Form.Button>
    </Form>
  );
}
