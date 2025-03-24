import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { timeAgo } from '../utlis/DateFun';
const ConversationButton = ({ conversation, handleConversationClick, userId }) => {
    const otherUser = conversation.members.find(member => member.id != userId);
    return (
        <ListItem 
            key={conversation.id} 
            button="true"
            sx={{ display: 'flex', gap: '0.5rem', borderRadius: '10px', padding: '0 0.7rem', cursor: 'pointer' }}
            onClick={() => handleConversationClick(conversation)}
        >
            <ListItemAvatar>
                <img src={otherUser?.avatar} alt={otherUser?.name} className='w-12 h-12 rounded-full object-cover' />
            </ListItemAvatar>
            <ListItemText primary={
                <p className='font-semibold '>{otherUser?.name}</p>
            } secondary={
                <p className='text-sm'>
                    {conversation.lastMessage}・{conversation.updatedAt ? timeAgo(conversation.updatedAt) : "Vừa xong"}
                </p>
            } />
        </ListItem>
    );
}

export default ConversationButton;
