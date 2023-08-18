'use client'

import parse from "html-react-parser";
import { Button } from "react-bootstrap";
import illustration from '@/public/images/illustration.jpg'
import Image from "next/image";

var QuillDeltaToHtmlConverter =
    require("quill-delta-to-html").QuillDeltaToHtmlConverter;

interface ArticleClientProps {
    blog: any,
    isAdmin?: boolean,
}

const ArticleClient: React.FC<ArticleClientProps> = ({ blog, isAdmin }) => {

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
                priority
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
                    <Button
                        className="btn-30color"
                        onClick={() => {
                            window.location.assign(editLink);
                        }}
                    >
                        Modifier l&apos;article
                    </Button>
                )
            }
            <Button
                className="btn-10color"
                onClick={() => {
                    window.location.assign('/');
                }}
            >
                Retour à l&apos;accueil
            </Button>
            <hr />
            <div className="blog-content">{parse(html)}</div>
            <br />
        </div>
    );
};

export default ArticleClient;