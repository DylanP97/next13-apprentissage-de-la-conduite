'use client'

import { useState, useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ArticleEditionSimpleInput } from "../../components/ArticleEditionSimpleInput";
import { TagsEditor } from "../../components/TagsEditor";
import { toast } from "react-hot-toast";
import axios from "axios";
import ImageResize from "quill-image-resize-module-react";
import ImageUploader from "quill-image-uploader";
import { TOOLBAR_OPTIONS } from "@/app/libs/utils";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ImageUpload from "@/app/components/ImageUpload";
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageUploader", ImageUploader);



interface EditionArticleClientProps {
    blogs: any,
    blog?: any,
}

const EditionArticleClient: React.FC<EditionArticleClientProps> = ({ blogs, blog }) => {
    const [title, setTitle] = useState<string | null>();
    const [slug, setSlug] = useState<string | null>();
    const [tags, setTags] = useState(blog?.tags || [""]);
    const [blogPicture, setBlogPicture] = useState<any>();
    const [file, setFile] = useState<any>();
    const [html, setHtml] = useState<string | null>();
    const [quill, setQuill] = useState<Quill | null>(null);
    const [created, setCreated] = useState<boolean | null>();
    const [dataFetch, setDataFetch] = useState(false);

    const slugTitle = (title: string) => {
        const newSlug: any = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '').replace(/^-+|-+$/g, '');
        setSlug(newSlug)
    }

    const saveBlog = () => {
        if (quill == null) return;
        const quillContent = JSON.stringify(quill.getContents());

        const data = {
            "title": title ? title : blog?.title,
            "slug" : slug || blog?.slug,
            "tags": tags ? tags : blog?.tags,
            "imageUrl": file && file,
            "data": html && quillContent,
        }

        axios.put(`http://localhost:3000/api/blog/${blog.id}`, { data })
            .then(() => {
                toast.success("Votre article vient d'être sauvegarder.");
            })
            .catch((error) => {
                toast.error(error.message)
            })
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
                imageResize: {
                    parchment: Quill.import("parchment"),
                },
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
    }, [title])

    useEffect(() => {
        if (quill == null) return;
        if (blog) quill.setContents(blog.data);
        if (!blog && !created) {
            axios.post(`http://localhost:3000/api/blog`, blog.id)
                .then(() => {
                    setCreated(true)
                })
            // dispatch(createBlog(blogId))
        }
        if (!dataFetch) {
            // dispatch(getBlog(blogId));
            if (created) setTags(blog.tags)
            // dispatch(getBlogs());
            setDataFetch(true)
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
                <ArticleEditionSimpleInput instruction="Choissisez un titre pour votre article" label="Titre" data={blog?.title} state={setTitle} />
                <br />
                <Form.Group>
                    Sélectionner des catégories pour votre article
                    <TagsEditor blogs={blogs} tags={tags} state={setTags} blogtags={blog?.tags} /><br />
                </Form.Group>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <ImageUpload
                        onChange={(value) => setFile(value)}
                        value={file}
                    />
                </div>
                <br />
                <div>
                    <Button
                        className="btn-10color"
                        onClick={() => {
                            saveBlog();
                        }}
                    >
                        Sauvegarder
                    </Button>
                    <Button
                        className="btn-30color"
                        onClick={() => {
                            window.location.assign(`/article/${blog.id}`);
                        }}
                    >
                        Voir l&apos;article
                    </Button>
                    <Button
                        className="btn-30color"
                        onClick={() => {
                            window.location.assign(`/article-admin`);
                        }}
                    >
                        Retour à la gestion des articles
                    </Button>
                </div>
                <Form.Label className="savezone">
                    N&apos;oubliez pas de sauvegarder vos modifications.
                </Form.Label>
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
