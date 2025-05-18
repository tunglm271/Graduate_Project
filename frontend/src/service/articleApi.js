import api from "./api";

const resource = "/articles";


const articleApi = {
    getArticles() {
        return api.get(resource);
    },

    getHomeArticles() {
        return api.get(`articles-homepage`);
    },

    getArticleById(id) {
        return api.get(`${resource}/${id}`);
    },
}

export default articleApi;
