import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAdminLayout } from "../../../context/AdminLayoutProvider";
import blogApi from "../../../service/admin/blogApi";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";

const BlogDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setTitle } = useAdminLayout();
  const { showErrorSnackbar } = useCustomSnackbar();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTitle(t("admin.medical_articles.detail"));
    fetchArticle();
  }, [t]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await blogApi.getById(id);
      setArticle(response.data);
    } catch (error) {
      console.error("Error fetching article:", error);
      showErrorSnackbar(
        error.response?.data?.message ||
          t("admin.medical_articles.error_fetching")
      );
      navigate("/admin/blogs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="w-11/12 mx-auto my-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Cover Image */}
        {article.cover_image && (
          <div className="mb-8">
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

        {/* Meta Information */}
        <div className="flex items-center gap-4 mb-6 text-gray-600">
          <span className="flex items-center gap-1">
            <i className="fas fa-calendar"></i>
            {new Date(article.created_at).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-tag"></i>
            {article.status === "published"
              ? t("admin.medical_articles.status.published")
              : t("admin.medical_articles.status.draft")}
          </span>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="prose max-w-none">
          <div
            className="ProseMirror"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => navigate("/admin/blogs")}
            className="px-6 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
          >
            {t("admin.medical_articles.back")}
          </button>
          <button
            onClick={() => navigate(`/admin/blogs/edit/${id}`)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700"
          >
            {t("admin.medical_articles.edit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
