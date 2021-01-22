import axiosClient from './axiosClient';

class ArticleApi {
    getAll = (params) => {
        const url = '/getArticles';
        return axiosClient.get(url, { params: { ...params } });

    };

    getById = (body) => {
        const url = '/getArticleById';
        return axiosClient.post(url, { ...body });

    };
}
const articleApi = new ArticleApi();
export default articleApi;