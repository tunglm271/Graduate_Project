import { ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Box } from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Link } from 'react-router-dom';
const HealthExamatitonRecord = ({record}) => {
    return (
        <Box  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <ListItem sx={{ paddingY: 0 }}>
                <ListItemAvatar>
                    <Avatar>
                        <MedicalServicesIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText 
                    primary={record.service}
                    primaryTypographyProps={{ sx: { fontWeight: "bold" } }} 
                    secondary={
                        <>
                            <Typography variant="body2" color="text.primary">
                            Ngày trả kết quả: {record.date}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Cơ sở: {record.hospital}
                            </Typography>
                        </>
                    } 
                />
            </ListItem>
            <Link 
                style={{
                    textDecoration: 'none',
                    color: 'white',
                    backgroundColor: '#007bff',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    width: '140px',
                    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
                    textAlign: 'center'
                }}
                to={`record/${record.id}`}
            >
                Xem kết quả
            </Link>
        </Box>
    );
}

export default HealthExamatitonRecord;
