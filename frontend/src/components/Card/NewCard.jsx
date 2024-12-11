const NewCard = ({newsItem}) => {
    return (
        <div className='row'>
        <img src={newsItem.image_url} alt="" />
        
        <div style={{width: '55%'}}>
          <h3 className='news-title'>{newsItem.title}</h3>
          <p>{new Date(newsItem.pubDate).toLocaleDateString()}</p>
        </div>
      </div>
    );
}

export default NewCard;
