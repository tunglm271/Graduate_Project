import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
  Chip,
  Skeleton,
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useAdminLayout } from "../../../context/AdminLayoutProvider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import blogApi from "../../../service/admin/blogApi";

const BlogsList = () => {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [statusChangeDialog, setStatusChangeDialog] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [articleToChangeStatus, setArticleToChangeStatus] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const { setTitle } = useAdminLayout();

  useEffect(() => {
    setTitle(t("admin.medical_articles.title"));
    fetchArticles();
  }, [t]);

  const fetchArticles = () => {
    setLoading(true);
    blogApi
      .getAll()
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleDeleteClick = (article) => {
    setArticleToDelete(article);
    setDeleteDialog(true);
  };

  const handleStatusClick = (article) => {
    setArticleToChangeStatus(article);
    setStatusChangeDialog(true);
  };

  const confirmStatusChange = () => {
    if (articleToChangeStatus) {
      const apiCall =
        articleToChangeStatus.status === "published"
          ? blogApi.unpublish(articleToChangeStatus.id)
          : blogApi.publish(articleToChangeStatus.id);

      apiCall
        .then((res) => {
          console.log(res);
          fetchArticles(); // Refresh the list after status change
        })
        .catch((error) => {
          console.error("Error changing article status:", error);
        });
    }
    setStatusChangeDialog(false);
    setArticleToChangeStatus(null);
  };

  const cancelStatusChange = () => {
    setStatusChangeDialog(false);
    setArticleToChangeStatus(null);
  };

  const confirmDelete = () => {
    if (articleToDelete) {
      blogApi
        .delete(articleToDelete.id)
        .then(() => {
          fetchArticles(); // Refresh the list after deletion
        })
        .catch((error) => {
          console.error("Error deleting article:", error);
        });
    }
    setDeleteDialog(false);
    setArticleToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialog(false);
    setArticleToDelete(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
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
    <div className="w-full p-4">
      <Button
        component={Link}
        to="/admin/blogs/new"
        variant="contained"
        color="primary"
        startIcon={<Plus size={16} />}
        sx={{ marginBottom: "16px" }}
      >
        {t("admin.medical_articles.create")}
      </Button>
      <Paper className="w-full mb-4 shadow-md">
        <TableContainer>
          <Table aria-label="medical articles table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#bbdefb" }}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {t("admin.medical_articles.table.number")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {t("admin.medical_articles.table.article_name")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {t("admin.medical_articles.table.status")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {t("admin.medical_articles.table.created")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {t("admin.medical_articles.table.updated")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  {t("admin.medical_articles.table.actions")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array.from(new Array(rowsPerPage)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={80} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={100} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={100} />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center space-x-2">
                          <Skeleton variant="circular" width={32} height={32} />
                          <Skeleton variant="circular" width={32} height={32} />
                          <Skeleton variant="circular" width={32} height={32} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : articles
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((article, index) => (
                      <TableRow
                        key={article.id}
                        sx={{
                          "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
                          "&:hover": { backgroundColor: "#e3f2fd" },
                        }}
                      >
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell sx={{ fontWeight: "medium" }}>
                          <div className="flex items-center">
                            <img
                              src={article.cover_image}
                              alt={article.title}
                              className="w-12 h-12 object-cover rounded-md mr-2"
                            />
                            {article.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={t(
                              `admin.medical_articles.status.${article.status}`
                            )}
                            size="small"
                            onClick={() => handleStatusClick(article)}
                            sx={{
                              textTransform: "capitalize",
                              fontWeight: "medium",
                              cursor: "pointer",
                              color:
                                article.status === "published"
                                  ? green[800]
                                  : grey[800],
                              backgroundColor:
                                article.status === "published"
                                  ? green[300]
                                  : grey[300],
                              "&:hover": {
                                backgroundColor:
                                  article.status === "published"
                                    ? green[400]
                                    : grey[400],
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell>{formatDate(article.created_at)}</TableCell>
                        <TableCell>{formatDate(article.updated_at)}</TableCell>
                        <TableCell>
                          <div className="flex justify-center space-x-2">
                            <IconButton
                              color="primary"
                              size="small"
                              aria-label="view details"
                              component={Link}
                              to={`/admin/blogs/${article.id}`}
                            >
                              <Eye size={18} />
                            </IconButton>
                            <IconButton
                              color="success"
                              size="small"
                              aria-label="edit article"
                              component={Link}
                              to={`/admin/blogs/edit/${article.id}`}
                            >
                              <Edit size={18} />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteClick(article)}
                              color="error"
                              size="small"
                              aria-label="delete article"
                            >
                              <Trash2 size={18} />
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={articles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("admin.medical_articles.delete.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("admin.medical_articles.delete.message", {
              name: articleToDelete?.title,
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            {t("admin.medical_articles.delete.cancel")}
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            {t("admin.medical_articles.delete.confirm")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Change Confirmation Dialog */}
      <Dialog
        open={statusChangeDialog}
        onClose={cancelStatusChange}
        aria-labelledby="status-dialog-title"
        aria-describedby="status-dialog-description"
      >
        <DialogTitle id="status-dialog-title">
          {t("admin.medical_articles.status_change.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="status-dialog-description">
            {t(
              `admin.medical_articles.status_change.${
                articleToChangeStatus?.status === "published"
                  ? "unpublish"
                  : "publish"
              }_message`,
              { name: articleToChangeStatus?.title }
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelStatusChange} color="primary">
            {t("admin.medical_articles.status_change.cancel")}
          </Button>
          <Button
            onClick={confirmStatusChange}
            color="primary"
            variant="contained"
            autoFocus
          >
            {t("admin.medical_articles.status_change.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BlogsList;
