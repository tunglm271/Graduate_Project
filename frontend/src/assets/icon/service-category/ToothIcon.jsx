const ToothIcon = ({size = 40}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <path fill="#B4DFFB" d="M22,4 C15.372583,4 11,11.6111593 11,21 C11,30.3888407 15.372583,60 22,60 C25.8661992,60 26.3053608,35.4098157 31.5,35.3875505 C37.6946392,35.4098157 37.1338008,60 41,60 C47.627417,60 52,30.3888407 52,21 C52,11.6111593 47.627417,4 41,4 C37.8333333,4 34.6666667,7 31.5,7 C28.3333333,7 25.1666667,4 22,4 Z"/>
          <path stroke="#FFF" strokeLinecap="round" strokeWidth="2" d="M24,8 C19.581722,8 16,11.581722 16,16"/>
        </g>
      </svg>
    );
}

export default ToothIcon;
