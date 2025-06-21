import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import SpecialtyApi from "../../service/SpecialtyApi";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

export default function FacilitySpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [newSpecialty, setNewSpecialty] = useState({
    name: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = () => {
    setLoading(true);
    SpecialtyApi.getAll()
      .then((response) => {
        setSpecialties(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch specialties:", error);
        showErrorSnackbar("Không thể tải danh sách chuyên khoa.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAdd = () => {
    if (newSpecialty.name.trim()) {
      setSubmitting(true);
      SpecialtyApi.create(newSpecialty)
        .then((response) => {
          setSpecialties([...specialties, response.data]);
          setNewSpecialty({ name: "", description: "" });
          showSuccessSnackbar("Thêm chuyên khoa thành công!");
        })
        .catch((error) => {
          console.error("Failed to add specialty:", error);
          showErrorSnackbar("Thêm chuyên khoa thất bại.");
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  const handleDelete = (id) => {
    setSubmitting(true);
    SpecialtyApi.delete(id)
      .then(() => {
        setSpecialties(specialties.filter((s) => s.id !== id));
        showSuccessSnackbar("Xóa chuyên khoa thành công!");
      })
      .catch((error) => {
        console.error("Failed to delete specialty:", error);
        showErrorSnackbar("Xóa chuyên khoa thất bại.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleEdit = (id, name, description) => {
    setEditId(id);
    setEditValue({ name, description });
  };

  const handleSave = (id) => {
    setSubmitting(true);
    SpecialtyApi.update(id, editValue)
      .then((response) => {
        setSpecialties(
          specialties.map((s) => (s.id === id ? response.data : s))
        );
        setEditId(null);
        setEditValue({ name: "", description: "" });
        showSuccessSnackbar("Cập nhật chuyên khoa thành công!");
      })
      .catch((error) => {
        console.error("Failed to update specialty:", error);
        showErrorSnackbar("Cập nhật chuyên khoa thất bại.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditValue({ name: "", description: "" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Quản lý chuyên khoa</h1>
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <TextField
            label="Tên chuyên khoa mới"
            value={newSpecialty.name}
            onChange={(e) =>
              setNewSpecialty({ ...newSpecialty, name: e.target.value })
            }
            fullWidth
            size="small"
            disabled={submitting}
          />
          <TextField
            label="Mô tả"
            value={newSpecialty.description}
            onChange={(e) =>
              setNewSpecialty({ ...newSpecialty, description: e.target.value })
            }
            fullWidth
            size="small"
            disabled={submitting}
          />
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={!newSpecialty.name.trim() || submitting}
            className="min-w-[100px]"
          >
            {submitting ? <CircularProgress size={24} /> : "Thêm"}
          </Button>
        </div>
      </div>
      <TableContainer className="bg-white rounded shadow min-h-96">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tên chuyên khoa</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mô tả</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {specialties.map((s, idx) => (
              <TableRow key={s.id}>
                <TableCell>{idx + 1}</TableCell>
                {editId === s.id ? (
                  <>
                    <TableCell>
                      <TextField
                        value={editValue.name}
                        onChange={(e) =>
                          setEditValue({ ...editValue, name: e.target.value })
                        }
                        size="small"
                        className="w-full"
                        disabled={submitting}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editValue.description}
                        onChange={(e) =>
                          setEditValue({
                            ...editValue,
                            description: e.target.value,
                          })
                        }
                        size="small"
                        className="w-full"
                        disabled={submitting}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={() => handleSave(s.id)}
                        disabled={!editValue.name.trim() || submitting}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleCancel}
                        disabled={submitting}
                      >
                        <CancelIcon />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell sx={{ fontWeight: "bold" }}>{s.name}</TableCell>
                    <TableCell>{s.description}</TableCell>
                    <TableCell>
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={() => handleEdit(s.id, s.name, s.description)}
                        disabled={submitting}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => handleDelete(s.id)}
                        disabled={submitting}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
