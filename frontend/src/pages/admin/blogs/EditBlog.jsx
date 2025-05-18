import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAdminLayout } from "../../../context/AdminLayoutProvider";
import RichTextEditor from "../../../components/RichTextEditor";
import blogApi from "../../../service/admin/blogApi";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";

const EditBlog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setTitle } = useAdminLayout();
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
  const [articleTitle, setArticleTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    setTitle(
      isEditing
        ? t("admin.medical_articles.edit")
        : t("admin.medical_articles.create")
    );
    if (id) {
      setIsEditing(true);
      fetchArticle();
    }
  }, [t, id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await blogApi.getById(id);
      const article = response.data;
      setArticleTitle(article.title);
      setContent(article.content);
      setCoverImage(article.cover_image || "");
      setTags(article.tags || []);
      if (editorRef.current) {
        editorRef.current.setContent(article.content);
      }
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

  const handleContentChange = (html) => {
    setContent(html);
  };

  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      const blogData = {
        title: articleTitle,
        content: editorRef.current?.getHTML() || content,
        cover_image: coverImage,
        tags,
        status: "draft",
      };

      if (isEditing) {
        await blogApi.update(id, blogData);
        showSuccessSnackbar(t("admin.medical_articles.draft_updated"));
      } else {
        await blogApi.create(blogData);
        showSuccessSnackbar(t("admin.medical_articles.draft_saved"));
      }
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error saving draft:", error);
      showErrorSnackbar(
        error.response?.data?.message ||
          t("admin.medical_articles.error_saving")
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      const blogData = {
        title: articleTitle,
        content: editorRef.current?.getHTML() || content,
        cover_image: coverImage,
        tags,
        status: "published",
      };

      if (isEditing) {
        await blogApi.update(id, blogData);
        showSuccessSnackbar(t("admin.medical_articles.article_updated"));
      } else {
        await blogApi.create(blogData);
        showSuccessSnackbar(t("admin.medical_articles.published"));
      }
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error publishing article:", error);
      showErrorSnackbar(
        error.response?.data?.message ||
          t("admin.medical_articles.error_publishing")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  if (loading && isEditing) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">
          {isEditing
            ? t("admin.medical_articles.edit")
            : t("admin.medical_articles.create")}
        </h1>

        {/* Cover Image Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("admin.medical_articles.cover_image")}
          </label>
          <div className="flex items-center">
            <input
              type="text"
              placeholder={t("admin.medical_articles.enter_image_url")}
              className="flex-grow p-2 border border-gray-300 rounded-md mr-2 text-sm"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
              {t("admin.medical_articles.upload")}
            </button>
          </div>
          {coverImage && (
            <div className="mt-2 relative">
              <img
                src={coverImage}
                alt="Cover preview"
                className="w-full h-48 object-cover rounded-md"
                onError={(e) => {
                  e.target.src = "/api/placeholder/800/200";
                  e.target.alt = "Invalid image URL";
                }}
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                onClick={() => setCoverImage("")}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Title Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("admin.medical_articles.title")}
          </label>
          <input
            type="text"
            placeholder={t("admin.medical_articles.enter_title")}
            className="w-full p-3 border border-gray-300 rounded-md font-medium"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </div>

        {/* Tags Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("admin.medical_articles.tags")}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1"
              >
                #{tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder={t("admin.medical_articles.add_tag")}
              className="flex-grow p-2 border border-gray-300 rounded-md"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>
        </div>

        {/* Editor Section */}
        <div className="border border-gray-300 rounded-md overflow-hidden mb-6 bg-white">
          <div className="bg-gray-50 border-b border-gray-300 p-2">
            <h2 className="font-medium">
              {t("admin.medical_articles.content")}
            </h2>
          </div>
          <div className="p-2">
            <RichTextEditor
              ref={editorRef}
              onChange={handleContentChange}
              content={content}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            onClick={() => navigate("/admin/blogs")}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
          >
            {t("admin.medical_articles.cancel")}
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={loading || !articleTitle || !content}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
          >
            {loading
              ? t("admin.medical_articles.saving")
              : t("admin.medical_articles.save_draft")}
          </button>
          <button
            onClick={handlePublish}
            disabled={loading || !articleTitle || !content}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {loading
              ? t("admin.medical_articles.publishing")
              : t("admin.medical_articles.publish")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
