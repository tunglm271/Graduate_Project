import React, { useState } from 'react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SearchIcon from '@mui/icons-material/Search';
import { Badge, IconButton, Menu, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
const ChatBoxList = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const messages = [
        {
            avatar: 'https://res.cloudinary.com/dftiye2et/image/upload/v1740473611/samples/man-portrait',
            name: 'Nguyễn Văn A',
            message: 'Xin chào bạn'
        },
        {
            avatar: 'https://res.cloudinary.com/dftiye2et/image/upload/v1740473611/samples/man-portrait',
            name: 'Nguyễn Văn B',
            message: 'Xin chào bạn'
        },
        {
            avatar: 'https://res.cloudinary.com/dftiye2et/image/upload/v1740473611/samples/man-portrait',
            name: 'Nguyễn Văn C',
            message: 'Xin chào bạn'
        }
    ]


    return (
        <>
            <IconButton onClick={handleClick}>
                <Badge 
                    badgeContent={4} 
                    color="primary" 
                    sx={{
                        '& .MuiBadge-badge': {
                            transform: 'scale(1) translate(50%, -50%)', 
                            margin: '3px',
                        },
                    }}
                    
                >
                    <QuestionAnswerIcon color="black" sx={{
                        fontSize: "30px",
                        opacity: 1,
                        color: "rgba(0, 0, 0, 1)"
                    }}/>
                </Badge>
            </IconButton>
            <Menu
                id="chat-box-list"
                anchorEl={anchorEl}
                open={open}
                slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        p: 0.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                onClose={() => setAnchorEl(null)}
            >
                <h4 style={{padding: '0.5rem 1rem'}}>Đoạn chat</h4>
                <div className='flex gap-2 items-center bg-slate-200 rounded-3xl' style={{ padding: '0.5rem', margin: '0 0.5rem' }}>
                    <SearchIcon />
                    <input type="text" placeholder='Tìm kiếm' className='focus:outline-0'/>
                </div>
                <ul className='flex flex-col gap-2' style={{marginTop: '0.5rem'}}>
                    {messages.map((message, index) => (
                        <li>
                            <ListItem button key={index} sx={{display: 'flex', gap: '0.5rem', borderRadius: '10px', padding: '0 0.7rem'}}>
                                <ListItemAvatar>
                                    <img src={message.avatar} alt="" className='w-12 h-12 rounded-full object-cover'/>
                                </ListItemAvatar>
                                <ListItemText primary={message.name} secondary={message.message} />
                            </ListItem>
                        </li>
                    ))}
                </ul>
            </Menu>
        </>
    );
}

export default ChatBoxList;
