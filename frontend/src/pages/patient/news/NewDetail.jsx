import { useTranslation } from "react-i18next";
import { Calendar, Clock, Share2, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Chip, Skeleton } from "@mui/material";
import ParagraphSkeleton from "../../../components/loading/ParagraphSkeleton";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articleApi from "../../../service/articleApi";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";

const NewsDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [topRecentArticles, setTopRecentArticles] = useState([]);
  const [recommendedServices, setRecommendedServices] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { showErrorSnackbar } = useCustomSnackbar();

  // Mock data for the news article
  const newsArticle = {
    title: "Breakthrough in Diabetes Treatment Research",
    coverImage: "/images/news/diabetes-research.jpg",
    publishDate: "2024-03-15",
    readTime: "5 min read",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h2>Key Findings</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h2>Implications for Treatment</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
    tags: ["Diabetes", "Research", "Healthcare", "Treatment"],
  };


  useEffect(() => {
    setLoading(true);
    articleApi
      .getArticleById(id)
      .then((res) => {
        console.log(res.data);
        setArticle(res.data.article);
        setTopRecentArticles(res.data.recommend_article);
        setRecommendedServices(res.data.services);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setLoading(false);
        showErrorSnackbar(
          error.response?.data?.message || t("news.error_fetching")
        );
        navigate("/news");
      });
  }, [id]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <Breadcrumbs sx={{ marginBottom: "20px" }}>
        <Link to="/news" className="text-blue-500 hover:underline">
          {t("news.news")}
        </Link>
        <span className="text-gray-500">
          {loading ? "Loading..." : article.title}
        </span>
      </Breadcrumbs>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Cover Image */}
          <div className="relative w-full h-48 sm:h-60 md:h-72 rounded-xl overflow-hidden mb-4 sm:mb-6">
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                className="rounded-xl"
              />
            ) : (
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Article Header */}
          <div className="mb-6 sm:mb-8">
            {loading ? (
              <Skeleton
                variant="text"
                width="80%"
                height={50}
                className="mb-4"
              />
            ) : (
              <p className="text-2xl sm:text-3xl font-bold mb-4">
                {article.title}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {loading ? (
                  <Skeleton
                    variant="text"
                    width={100}
                    height={20}
                    className="mb-2"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={16} />
                    <span>{formatDateWithTime(article.created_at)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-500">
                  <Eye size={16} />
                  <span>{article?.views}</span>
                </div>
              </div>

              {/* Share Button */}
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto">
                <Share2 size={16} />
                <span>{t("news.share")}</span>
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {newsArticle.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  variant="outlined"
                  className="mb-2"
                />
              ))}
            </div>

            {loading ? (
              <ParagraphSkeleton />
            ) : (
              <div className="prose max-w-none">
                <div
                  className="ProseMirror"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 space-y-6 sm:space-y-8">
          {/* Recent News */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <p className="text-lg font-semibold mb-4">
              {t("news.recentNews")}
            </p>
            <div className="space-y-4">
              {topRecentArticles.map((news) => (
                <Link 
                  key={news.id} 
                  className="flex gap-3 group"
                  to={`/news/${news.id}`}
                >
                  <img
                    src={news.cover_image}
                    alt={news.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold text-sm line-clamp-2 group-hover:text-blue-500">
                      {news.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{formatDateWithTime(news.created_at)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recommended Services */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              {t("news.recommendedServices")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {recommendedServices.map((service) => (
                <Link 
                  key={service.id} 
                  className="bg-gray-50 rounded-lg p-3"
                  to={`/services/${service.id}`}
                >
                  <img
                    src={service.thumbnail}
                    alt={service.name}
                    className="w-full h-24 sm:h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-medium">{service.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    {service.description}
                  </p>
                  <p className="text-blue-500 font-medium">{service.price}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Advertisement Space */}
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm">
            <img src="https://nuu.edu.vn/wp-content/uploads/quang-cao-phong-kham-da-khoa-nhu-the-nao-1024x1024.jpg" alt="" className="rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
