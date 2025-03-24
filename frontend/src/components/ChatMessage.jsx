import Cookies from 'js-cookie';

const ChatMessage = ({message}) => {
    const userId = Cookies.get('user_id');
    const sent = message.senderId == userId;
    return (
        <div className={`flex items-start gap-2 chat-message ${sent ? 'sent-message' : 'receive-message'}`} >
            <img src={message.senderAvatar} alt="" />
            <div>
                <h5 style={{marginBottom: "0.2rem"}}>{message.senderName}</h5>
                <p>{message.content}</p>
                <p className='text-xs'>{message.sent_at}</p>
            </div>
        </div>
    );
}

export default ChatMessage;
