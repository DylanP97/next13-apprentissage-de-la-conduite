"use client";

import { useState, useCallback, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { ArticleEditionSimpleInput } from "../../components/ArticleEditionSimpleInput";
import { TagsEditor } from "../../components/TagsEditor";
import { toast } from "react-hot-toast";
import axios from "axios";
import ImageUploader from "quill-image-uploader";
import { TOOLBAR_OPTIONS } from "@/app/libs/utils";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ImageUpload from "@/app/components/ImageUpload";
Quill.register("modules/imageUploader", ImageUploader);

interface EditionArticleClientProps {
  blogs: any;
  blog?: any;
}

const EditionArticleClient: React.FC<EditionArticleClientProps> = ({
  blogs,
  blog,
}) => {
  const [title, setTitle] = useState<string | null>();
  const [slug, setSlug] = useState<string | null>();
  const [published, setPublished] = useState<boolean>(blog.published || false);
  const [tags, setTags] = useState(blog?.tags || [""]);
  const [file, setFile] = useState<any>();
  const [html, setHtml] = useState<string | null>();
  const [quill, setQuill] = useState<Quill | null>(null);
  const [created, setCreated] = useState<boolean | null>();
  const [dataFetch, setDataFetch] = useState(false);

  const slugTitle = (title: string) => {
    const newSlug: any = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/^-+|-+$/g, "");
    setSlug(newSlug);
  };

  const saveBlog = () => {
    if (quill == null) return;
    const quillContent = JSON.stringify(quill.getContents());

    const data = {
      title: title ? title : blog?.title,
      slug: slug || blog?.slug,
      published: published,
      tags: tags ? tags : blog?.tags,
      imageUrl: file && file,
      data: html && quillContent,
    };

    axios
      .put(`/api/blog/${blog.id}`, { data })
      .then(() => {
        toast.success("Votre article vient d'être sauvegarder.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const wrapperRef = useCallback((wrapper: any) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        imageUploader: {
          upload: (file: any) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("image", file);

              fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`,
                {
                  method: "POST",
                  body: formData,
                }
              )
                .then((response) => response.json())
                .then((result) => {
                  resolve(result.data.url);
                })
                .catch((error) => {
                  reject("Upload failed");
                  console.error("Error:", error);
                });
            });
          },
        },
      },
    });
    q.disable();
    q.setText("Chargement du contenu...");
    setQuill(q);
  }, []);

  useEffect(() => {
    if (title) slugTitle(title);
  }, [title]);

  useEffect(() => {
    if (quill == null) return;
    if (blog) quill.setContents(blog.data);
    if (!blog && !created) {
      axios.post(`/api/blog`).then(() => {
        setCreated(true);
      });
    }
    if (!dataFetch) {
      if (created) setTags(blog.tags);
      setDataFetch(true);
    }
    quill.enable();
  }, [blog, created, quill, dataFetch, tags]);

  useEffect(() => {
    if (quill == null) return;
    setHtml(quill.root.innerHTML);
  }, [setHtml, quill]);

  return (
    <div className="createblog">
      <div className="settingsblog">
        <ArticleEditionSimpleInput
          instruction="Choisissez un titre pour votre article"
          label="Titre"
          data={blog?.title}
          state={setTitle}
        />
        <br />
        <div>
          Sélectionner des catégories pour votre article
          <TagsEditor
            blogs={blogs}
            tags={tags}
            state={setTags}
            blogtags={blog?.tags}
          />
          <br />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Form.Label>Choisissez la photo de couverture</Form.Label>
          <ImageUpload
            onChange={(value) => setFile(value)}
            value={file ? file : blog?.imageUrl}
          />
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Form.Label>
            Visibilité de votre article :{" "}
            {published ? "Article Publié" : "Non visible"}
          </Form.Label>
        </div>
        <br />
        <p className="savezone">
          N&apos;oubliez pas de sauvegarder vos modifications.
        </p>
        <div>
          <button
            className="btn btn-10color"
            onClick={() => {
              saveBlog();
            }}
          >
            Sauvegarder
          </button>
          <button
            onClick={() => {
              setPublished(!published);
            }}
            className="btn btn-30color"
          >
            {published
              ? "Cliquez pour le rendre invisible aux utilisateurs"
              : "Cliquez pour le rendre disponible aux utilisateurs."}
          </button>
          <button
            className="btn btn-30color"
            onClick={() => {
              window.location.assign(`/article/${blog.id}`);
            }}
          >
            Voir l&apos;article
          </button>
          <button
            className="btn btn-30color"
            onClick={() => {
              window.location.assign(`/admin-articles`);
            }}
          >
            Retour à la gestion des articles
          </button>
        </div>
        <br />
        <label style={{ display: "none" }} htmlFor="html"></label>
        <br />
      </div>
      <br />
      <div ref={wrapperRef} />
    </div>
  );
};

export default EditionArticleClient;
