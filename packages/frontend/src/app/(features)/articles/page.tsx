"use client";
import { Article } from "@flexmvp-starter-2/graphql/genql";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { Button, Divider } from "react-daisyui";
import { toast } from "react-toastify";
import { Modal, PageHeading, ResponsiveButton } from "@flexmvp/components";
import { ArticlesList } from "./ArticlesList";
import { CreateArticleForm } from "./CreateArticleForm";

export default function ArticlesPage() {
  const { Dialog, handleShow, handleHide, dialogRef } = Modal.useDialog();

  const onSuccess = (data: Partial<Article>) => {
    handleHide();
    const successMessage = (
      <>
        Article <em>{data.title} </em> created
      </>
    );

    toast.success(successMessage);
  };

  return (
    <>
      <PageHeading>
        <PageHeading.Title>Articles</PageHeading.Title>
        <PageHeading.Subtitle>
          A collection of links to articles around the internet
        </PageHeading.Subtitle>
        <PageHeading.Actions>
          <ResponsiveButton
            startIcon={<PlusIcon className="w-6 h-6 mr-2" />}
            onClick={handleShow}
            color="primary"
          >
            New Article
          </ResponsiveButton>
        </PageHeading.Actions>
      </PageHeading>

      <ArticlesList />
      <Dialog responsive backdrop closeButton hasForm>
        <Modal.Header className="">New Article</Modal.Header>
        <Modal.Body>
          <CreateArticleForm method="dialog" onSuccess={onSuccess} />
        </Modal.Body>
        {/* <Modal.Actions>
          <Button onClick={() => {}}>Close</Button>
        </Modal.Actions> */}
      </Dialog>
    </>
  );
}
