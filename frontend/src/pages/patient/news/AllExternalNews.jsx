import { getNews } from "../../../service/newsApi";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import { Calendar, ExternalLink } from "lucide-react";

const AllExternalNews = () => {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        const filteredNews = data.results.filter(
          (article) => article.image_url !== null
        );
        setNews(filteredNews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(i18n.language === "vi" ? "vi-VN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleNewsClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {t("news.new-from-external-sources")}
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
            news.map((article) => (
              <div
                key={article.article_id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => handleNewsClick(article.link)}
              >
                <div className="relative h-48 sm:h-56">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
                    <img
                      src={article.source_icon}
                      alt={article.source_name}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar size={14} />
                    <span>{formatDate(article.pubDate)}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {article.source_name}
                    </span>
                    <ExternalLink size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* No News Message */}
      {!loading && news.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{t("news.no_articles")}</p>
        </div>
      )}
    </div>
  );
};

export default AllExternalNews;
