import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import articleApi from '../../api/articleApi';
import CardArticle from '../../components/CardArticle/CardArticle';
import Pagination from '../../components/Pagination';
import { loaderState } from '../../recoil/loaderState';

function Home(props) {

    const [loader, setLoader] = useRecoilState(loaderState);
    const [articleList, setArticleList] = useState([]);

    const [pageIndex, setPageIndex] = useState(1);
    // const [pageSize, setPageSize] = useState(9);
    const pageSize = 9;
    const [totalPages, setTotalPages] = useState(0);
    // const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(0);

    

    const search = async () => {
        const req = {
            pageIndex,
            pageSize
        }
        setLoader(true);
        try {
            const { count, pageIndex, articles, totalPages } = await articleApi.getAll(req);
            setArticleList(articles);
            setCount(count);
            setPageIndex(Number(pageIndex));
            setTotalPages(totalPages);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.log('Failed to fetch article list: ', error);
        }
    }

    useEffect(() => {
        search();
    }, []);
    console.log(loader);
    return (
        <section className="slice-xl delimiter-top">
            <div className="container">
                <div className="mb-5 text-center">
                    <h3>Chia sẻ kiến thức về Valorant</h3>
                </div>
                <div className="row">
                    <CardArticle articleList={articleList}></CardArticle>

                </div>

                <div className={'text-right mt-4'}>
                    <Pagination count={count}
                        pageIndex={pageIndex}
                        changePagination={(i) => {
                            setPageIndex(i);
                            search();
                        }
                        }
                        totalPages={totalPages} ></Pagination>
                </div>
            </div>
        </section>
    );
}

export default Home;