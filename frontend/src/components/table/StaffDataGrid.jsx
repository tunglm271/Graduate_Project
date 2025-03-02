import { DataGrid } from "@mui/x-data-grid";
import { Avatar, AvatarGroup, Typography, Box, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { blue } from '@mui/material/colors';
import { useEffect, useState } from "react";
import { Visibility } from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
const ActionCell = ({ id, setData = null }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleDelete = () => {
      handleClose();
    };
  
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", height: "100%" }}>
        <IconButton color="gray" component={Link} to={`/facility/staffs/${id}`} size="small">
          <Visibility />
        </IconButton>
        <IconButton color="gray" size="small" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    );
  };


const rows = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "John Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    workingDays: ["Mon", "Wed", "Fri"],
    service: "Haircut",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/40?img=2",
    name: "Jane Smith",
    phone: "987-654-3210",
    email: "jane.smith@example.com",
    workingDays: ["Tue", "Thu", "Sat"],
    service: "Massage",
  },
];

const StaffDataGrid = ({ setDataCount }) => {
    const [ data, setData ] = useState([]);

    const columns = [
        {
          field: "name",
          headerName: "Name",
          width: 200,
          renderCell: (params) => (
            <Box display="flex" alignItems="center" gap={1} sx={{ height:"100%" }}>
              <Avatar src={params.row.avatar} alt={params.row.name} />
              <Typography>{params.row.name}</Typography>
            </Box>
          ),
        },
        {
          field: "contact",
          headerName: "Contact",
          width: 250,
          renderCell: (params) => (
            <Box sx={{ height:"100%", paddingTop: "5px" }}>
              <Typography variant="body2">{params.row.phone}</Typography>
              <Typography variant="body2" color="primary" sx={{ textDecoration: "underline" }}>
                {params.row.email}
              </Typography>
            </Box>
          ),
        },
        {
          field: "workingDays",
          headerName: "Working Days",
          width: 250,
          renderCell: (params) => (
            <Box display="flex" justifyContent="flex-start" sx={{ width: "100%", height:"100%" }}>
              <AvatarGroup max={7} spacing={-5} sx={{ justifyContent: "flex-start", height:"100%" }}>
                {params.row.workingDays.map((day, index) => (
                  <Avatar
                    key={index}
                    sx={{
                      width: 30,
                      height: 30,
                      fontSize: 10,
                      marginY: "auto",
                      bgcolor: blue[500],
                      border: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    {day}
                  </Avatar>
                ))}
              </AvatarGroup>
            </Box>
          ),
        },
        { field: "service", headerName: "Service", width: 150 },
        {
          field: "action",
          headerName: "Action",
          width: 100,
          sortable: false,
          filterable: false,
          disableColumnMenu: true,
          flex: 1,
          renderHeader: () => <span></span>,
          renderCell: (params) => (
            <ActionCell id={params.row.id} setData={setData}/>
          ),
        },
      ];

    useEffect(() => {
        setData(rows);
        setDataCount(data.length);
    })

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        pageSizeOptions={[5, 10]}
        onRowSelectionModelChange={(ids) => setDataCount(ids.length)}
        sx={{ 
            border: "none",
            boxShadow: "none",
            "& .MuiDataGrid-cell:focus": { outline: "none" },
            "& .MuiDataGrid-columnHeaderTitle": { fontWeight: "600", color: "#4a5565" },
            "& .MuiDataGrid-columnHeader:focus": { outline: "none" },
            "& .MuiDataGrid-topContainer": {
              backgroundColor: "#f1f5f9",
              textTransform: "uppercase",
              fontWeight: "600",
              color: "#4b5563",
              borderRadius: "8px 8px 0 0",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "white", 
            },
        }}
      />
    </div>
  );
};

export default StaffDataGrid;
