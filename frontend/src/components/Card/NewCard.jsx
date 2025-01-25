import React from 'react';

const handleCardClick = (url) => {
  window.open(url, '_blank');
};

const NewCard = ({newsItem}) => {
    return (
        <div className='sub-news' onClick={() => handleCardClick(newsItem.link)}>
        <div>
          <img src={newsItem.image_url} alt="" />
        </div>

        <div style={{width: '55%'}}>
          <h3 className='news-title'>{newsItem.title}</h3>
          <p>{new Date(newsItem.pubDate).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>
    );
}

export default NewCard;
