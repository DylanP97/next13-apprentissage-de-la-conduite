'use client'

import parse from "html-react-parser";
import { Button } from "react-bootstrap";
import illustration from '@/public/images/illustration.jpg'
import Image from "next/image";
import Link from "next/link";
import ArticleAuthor from "./ArticleAuthor";
import ArticleComments from "./ArticleComments";

var QuillDeltaToHtmlConverter =
    require("quill-delta-to-html").QuillDeltaToHtmlConverter;

interface ArticleClientProps {
    blog: any,
    isAdmin?: boolean,
    author?: any,
    comments?: any,
    currentUser?: any,
}

const ArticleClient: React.FC<ArticleClientProps> = ({ blog, isAdmin, author, comments, currentUser }) => {

    const editLink = `/admin-edition/${blog.id}`;
    var cfg = {};
    var converter = new QuillDeltaToHtmlConverter(blog?.data?.ops, cfg);
    var html = converter.convert();

    return (
        <div className="article home-container">
            <Image
                className="article-cover"
                src={blog.imageUrl ? `${blog.imageUrl}` : illustration}
                alt="blog-img"
                width={2000}
                height={2000}
                priority={true}
                loading="eager"
            />
            <h1>{blog.title}</h1>
            <div style={{ marginBottom: '20px' }}>
                {
                    blog.tags.map((tag: string) => {
                        return <p style={{ width: 'fit-content' }} key={tag}>#{tag}</p>
                    })
                }
            </div>
            {
                isAdmin && (
                    <Link
                        href={editLink}
                        className="btn btn-30color"
                    >
                        Modifier l&apos;article
                    </Link>
                )
            }
            <Link
                className="btn btn-10color"
                href="/"
            >
                Retour à l&apos;accueil
            </Link>
            <hr />
            <div className="blog-content">{parse(html)}</div>
            <br />
            <div className="article-footer" style={{ marginBottom: '50px'}}>
                <div className="article-footer-tags" style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                    {
                        blog.tags.map((tag: string) => {
                            return (
                                <p style={{ fontStyle: 'italic' }} key={'tagFooterBlog' + tag}>#{tag}</p>
                            )
                        })
                    }
                </div>
                <ArticleAuthor author={author} />
                <ArticleComments currentUser={currentUser} commentsList={comments} />
            </div>
        </div>
    );
};

export default ArticleClient;