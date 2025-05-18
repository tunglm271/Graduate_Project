import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import articleApi from "../../../service/articleApi";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";

const AllNews = () => {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showErrorSnackbar } = useCustomSnackbar();

  useEffect(() => {
    articleApi
      .getArticles()
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        showErrorSnackbar(t("news.error_fetching"));
        setLoading(false);
      });
  }, []);

  const formatDateWithTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(i18n.language === "vi" ? "vi-VN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {t("news.all_news")}
        </h1>
        <p className="text-gray-600">{t("news.latest_updates")}</p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <Skeleton variant="rectangular" height={200} />
                <div className="p-4">
                  <Skeleton variant="text" width="80%" height={24} />
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="40%" height={16} />
                </div>
              </div>
            ))
          : // Actual news articles
            articles.map((article) => (
              <Link
                to={`/news/${article.id}`}
                key={article.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative h-48 sm:h-56">
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {article.content.replace(/<[^>]+>/g, "")}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatDateWithTime(article.created_at)}</span>
                    <span>
                      {article.views || 0} {t("news.views")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
      </div>

      {/* Load More Button */}
      {!loading && articles.length > 0 && (
        <div className="mt-8 text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
            {t("news.see-more")}
          </button>
        </div>
      )}

      {/* No Articles Message */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{t("news.no_articles")}</p>
        </div>
      )}
    </div>
  );
};

export default AllNews;
