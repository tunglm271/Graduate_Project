import { useTranslation } from "react-i18next";
import { getNews } from "../../../service/newsApi";
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import articleApi from "../../../service/articleApi";

const NewsList = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [outSourceNews, setOutSourceNews] = useState([]);
  const [topFamousArticles, setTopFamousArticles] = useState([]);
  const [topNewArticles, setTopNewArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        console.log(data);
        const filteredNews = data.results.filter(
          (article) => article.image_url !== null
        );
        setOutSourceNews(filteredNews);
      } catch (error) {
        console.error("Error fetching news:", error);
        navigate("/news");
      }
    };

    fetchNews();
    articleApi
      .getHomeArticles()
      .then((res) => {
        console.log(res.data);
        setTopFamousArticles(res.data.top_famous);
        setTopNewArticles(res.data.recent);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        navigate("/news");
      });
  }, [navigate]);

  const formatDateWithTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(i18n.language === "vi" ? "vi-VN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-7xl mx-auto py-4 sm:py-8 px-2 sm:px-4 lg:px-8">
      <div className="flex-1 space-y-6 sm:space-y-10">
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={200} />
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-bold text-blue-700 mb-2 sm:mb-0">
                {t("news.top_famous")}
              </h2>
              <Link
                to="/news-all"
                className="text-blue-400 text-sm font-medium hover:underline"
              >
                {t("news.see-more")}
              </Link>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <Link 
                className="w-full lg:w-2/5 bg-blue-50 rounded-lg p-3 flex flex-col group"
                to={`/news/${topFamousArticles[0].id}`}
              >
                <img
                  src={topFamousArticles[0].cover_image}
                  alt={topFamousArticles[0].title}
                  className="rounded-lg mb-3 h-32 sm:h-36 object-cover"
                />
                <p className="font-semibold text-sm sm:text-base mb-1 group-hover:text-blue-500">
                  {topFamousArticles[0].title}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-3">
                  {topFamousArticles[0].content.replace(/<[^>]+>/g, "")}
                </p>
                <div className="text-xs text-gray-400">
                  {formatDateWithTime(topFamousArticles[0].created_at)}
                  <span className="ml-2">
                    • {topFamousArticles[0].views || 0} {t("news.views")}
                  </span>
                </div>
              </Link>
              {/* List of Articles */}
              <div className="flex-1 flex flex-col gap-2 sm:gap-3 justify-between">
                {topFamousArticles.slice(1, 5).map((art, i) => (
                  <Link
                    to={`/news/${art.id}`}
                    key={i}
                    className="flex gap-2 items-center border-b pb-2 last:border-b-0 border-gray-200 group cursor-pointer hover:bg-slate-50 transition-colors duration-200"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 rounded overflow-hidden">
                      <img
                        src={art.cover_image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-blue-500">
                        {art.title}
                      </p>
                      <div className="text-xs text-gray-400">
                        {formatDateWithTime(art.created_at)}
                        <span className="ml-2">• {art.views || 0} {t("news.views")}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="mt-6 sm:mt-10 w-full">
          <div>
            {outSourceNews.length ? (
              <div
                id="highlight-news"
                className="bg-white rounded-xl shadow-sm p-3 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
                    {t("news.new-from-external-sources")}
                  </h1>
                  <Link
                    to="/news-external"
                    className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
                  >
                    {t("news.see-more")}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Featured News */}
                  <Link
                    to={outSourceNews[0].link}
                    target="_blank"
                    className="bg-gray-50 rounded-xl overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-200"
                  >
                    <div className="relative h-48 sm:h-64 md:h-72">
                      <img
                        src={outSourceNews[0].image_url}
                        alt={outSourceNews[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
                        <img
                          src={outSourceNews[0].source_icon}
                          alt={outSourceNews[0].source_name}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                        {outSourceNews[0].title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {outSourceNews[0].description}
                      </p>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                        <span>{outSourceNews[0].source_name}</span>
                        <span>
                          {new Date(
                            outSourceNews[0].pubDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Sub News List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                    {outSourceNews.slice(1, 5).map((article, index) => (
                      <Link
                        to={article.link}
                        target="_blank"
                        key={index}
                        className="bg-gray-50 rounded-xl overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex gap-3 p-2 sm:p-3">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <img
                                src={article.source_icon}
                                alt={article.source_name}
                                className="w-4 h-4 object-contain"
                              />
                              <span className="text-xs text-gray-500">
                                {article.source_name}
                              </span>
                            </div>
                            <h4 className="font-medium text-sm sm:text-base text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                              {article.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {new Date(article.pubDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="40%" height={20} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4 sm:gap-6">
        {/* Hotline Card */}
        <div className="bg-blue-900 text-white rounded-lg p-4 sm:p-5 flex flex-col items-center">
          <div className="text-base sm:text-lg font-bold mb-2">
            {t("news.hotline.title")}
          </div>
          <div className="text-xl sm:text-2xl font-bold mb-2">
            0800 100 1234
          </div>
          <div className="text-xs sm:text-sm mb-3 text-center">
            {t("news.hotline.description")}
          </div>
          <button className="bg-blue-500 rounded px-4 py-2 text-white text-sm sm:text-base font-medium">
            {t("news.hotline.contactButton")}
          </button>
        </div>
        {/* Ads */}
        <img
          src="https://nuu.edu.vn/wp-content/uploads/quang-cao-phong-kham-da-khoa-nhu-the-nao-1024x1024.jpg"
          alt="Ad"
          className="rounded-lg w-full"
        />
        <img
          src="https://baokhanhhoa.vn/file/e7837c02857c8ca30185a8c39b582c03/032025/6-3.4_20250306091709.jpg"
          alt="Ad"
          className="rounded-lg w-full"
        />
        {/* Latest News */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-sm sm:text-base">
              {t("news.latestNews.title")}
            </h3>
            <Link
              to="#"
              className="text-blue-400 text-xs font-medium hover:underline"
            >
              {t("news.see-more")}
            </Link>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={100} />
            ) : (
              topNewArticles.map((news, i) => (
                <Link
                  key={i}
                  className="flex gap-2 items-center cursor-pointer hover:bg-slate-50 transition-colors duration-200 group p-1 rounded"
                  to={`/news/${news.id}`}
                >
                  <div className="w-12 h-10 sm:w-14 sm:h-12 rounded overflow-hidden">
                    <img
                      src={news.cover_image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold line-clamp-2 group-hover:text-blue-500">
                      {news.title}
                    </p>
                    <div className="text-xs text-gray-400">
                      {formatDateWithTime(news.created_at)}
                      <span className="ml-2">• {news.views || 0} {t("news.views")}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsList;
