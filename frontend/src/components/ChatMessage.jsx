import Cookies from 'js-cookie';

export const ChatMessage = ({message}) => {
    const userId = Cookies.get('user_id');
    const sent = message.user_id == userId;
    return (
        <div className={`flex items-start gap-2 chat-message ${sent ? 'sent-message' : 'receive-message'}`} >
            <img src={message.avatar} alt="" />
            <div>
                <h5 style={{marginBottom: "0.2rem"}}>{message.username}</h5>
                <p>{message.message}</p>
                <p className='text-xs'>{message.sent_at}</p>
            </div>
        </div>
    );
}
