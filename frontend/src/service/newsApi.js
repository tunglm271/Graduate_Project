import axios from 'axios';

const apiKey = 'pub_61438c9d4b761f29509ca770cb50451f32a7d'

const newsApi = axios.create({
    baseURL: 'https://newsdata.io/api/1/news', 
    headers: { 'Content-Type': 'application/json' }
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getNews = async (retries = 3, delayMs = 1000) => {
    const params = {
        country: 'vi',
        language: 'vi',
        apiKey: apiKey,
        category: 'health', 
    };
    try {
        const response = await newsApi.get('', { params });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 429 && retries > 0) {
            console.warn(`Rate limit exceeded. Retrying in ${delayMs}ms...`);
            await delay(delayMs);
            return getNews(retries - 1, delayMs * 2);
        } else {
            console.error('Error fetching news:', error);
            throw error;
        }
    }
}

export default newsApi;