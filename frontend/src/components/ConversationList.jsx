import AppContext from '../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import { Badge, IconButton, Menu } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SearchIcon from '@mui/icons-material/Search';
import { fetchConversations } from "../service/firebase/conversation";
import ConversationButton from "./ConversationButton";
import { getUser } from "../utlis/auth";

const ConversationList = () => {
  const user = getUser();
  const { setChatbox } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleConversationClick = (conv) => {
    setChatbox({
      id: conv.id,
      contactName: conv.members.find(member => member.id != user.id).name,
      avatar: conv.members.find(member => member.id != user.id).avatar,
      contactId: conv.members.find(member => member.id != user.id).id,
    });
    setAnchorEl(null);
  }

  useEffect(() => {
    const unsubscribe = fetchConversations(setConversations, user.id);
    setLoading(false);
    return () => unsubscribe();
  }, []);

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
              {loading ? <p>Loading...</p> :
              <ul className='flex flex-col gap-2' style={{marginTop: '0.5rem'}}>
                  {conversations.map((conv) => (
                    <ConversationButton key={conv.id} conversation={conv} handleConversationClick={handleConversationClick} userId={user.id}/>
                  ))}
              </ul>
              }
          </Menu>
      </>
  );
};

export default ConversationList;