import React, { useEffect, useState } from 'react';
import { loaderState } from '../../recoil/loaderState';
import { useRecoilState } from 'recoil';
import articleApi from '../../api/articleApi';
import {
    useParams
} from "react-router-dom";

function Article(props) {
    const [loader, setLoader] = useRecoilState(loaderState);
    const [article, setArticle] = useState(null);

    let { slug } = useParams();
    const res = slug.split(".");


    const getArticleById = async (arraySlug) => {
        if (arraySlug && arraySlug.length !== 2) {
            return;
        }
        setLoader(true);
        try {
            const response = await articleApi.getById({ _id: res[1] });
            setArticle(response);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.log('Failed to fetch article list: ', error);
        }
    }

    useEffect(() => {
        console.log(res);
        getArticleById(res);
    }, []);

    console.log(loader);
    return (
        <>
            <section className="slice slice-lg" data-offset-top="#header-main" style={{ paddingTop: 89 }}>
                <div className="container pt-6">
                    <div className="row justify-content-center">
                        <div className="col-md-9">
                            <h1 className="lh-150 mb-3">{article ? article.title : ''}</h1>
                            <p className="lead text-muted mb-0">{article ? article.description : ''}</p>
                            <div className="media align-items-center mt-5">
                                <div>
                                    <a href="javscript://" className="avatar rounded-circle mr-3">
                                        <img alt="Placeholder"
                                            src="https://preview.webpixels.io/purpose-website-ui-kit/assets/img/theme/light/team-6-800x800.jpg" />
                                    </a>
                                </div>
                                <div className="media-body">
                                    <span className="d-block h6 mb-0">John Sullivan</span>
                                    <span className="text-sm text-muted">25 Jan 2019</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-cover bg-size--cover"
                style={{
                    height: 600,
                    backgroundImage: article ? `url("${process.env.REACT_APP_IMAGE_URL}${article.banner}")` : '',
                    backgroundPosition: 'top center'
                }}></section>
            <section className="slice">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <article dangerouslySetInnerHTML={{ __html: article ? article.body : '' }}>
                            </article>
                            <hr />
                            <h5 className="mb-4">Comments</h5>
                            <div className="mb-3">
                                <div className="media media-comment">
                                    <img alt="Placeholder" className="rounded-circle shadow mr-4" src="https://preview.webpixels.io/purpose-website-ui-kit/assets/img/theme/light/team-2-800x800.jpg" style={{ width: "64px" }} />
                                    <div className="media-body">
                                        <div className="media-comment-bubble left-top">
                                            <h6 className="mt-0">Alexis Ren</h6>
                                            <p className="text-sm lh-160">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
                                            <div className="icon-actions">
                                                <a href="javascript://" className="love active">
                                                    <i className="far fa-heart"></i>
                                                    <span className="text-muted">10 likes</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="media media-comment align-items-center">
                                    <img alt="Placeholder" className="avatar rounded-circle shadow mr-4" src="https://preview.webpixels.io/purpose-website-ui-kit/assets/img/theme/light/team-2-800x800.jpg" />
                                    <div className="media-body">
                                        <form>
                                            <div className="form-group mb-0">
                                                <div className="input-group input-group-merge border">
                                                    <textarea className="form-control" data-toggle="autosize" placeholder="Write your comment" rows="1"
                                                        style={{ overflow: 'hidden', overflowWrap: 'break-word', resize: 'none', height: 346 }}></textarea>
                                                    <div className="input-group-append">
                                                        <button className="btn btn-primary" type="button">
                                                            <span className="far fa-paper-plane"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Article;