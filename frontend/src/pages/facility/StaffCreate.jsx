import { Breadcrumbs, Typography, Stack, IconButton, Divider } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import medicalServiceApi from "../../service/medicalServiceAPi";

const StaffCreate = () => {
    const { id } = useParams();
    const isEditMode = !!id;
    return (
        <div style={{ padding: 20 }}>
             <Stack direction="row" spacing={2} alignItems="center" marginBottom={"1rem"}>
                <IconButton component={Link} to={'/facility/services'} size="small" sx={{ p: 0 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs sx={{ display: "flex", alignItems: "center", mt: "5px" }}>
                    <Link to={'facility/services'}>Quản lý bác sĩ</Link>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>New</Typography>
                </Breadcrumbs>
            </Stack>
            <div className="bg-white rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-900 h-24 w-full"></div>

            </div>
        </div>
    );
}

export default StaffCreate;
