// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import doctor from "../../assets/images/doctor.png";
import MyDateCalendar from "../../components/MyDateCalendar";
import { Link } from "react-router-dom";
import Appoinment from "../../components/Appoinment";
import ServiceCard from "../../components/Card/ServiceCard";
import MySlider from "../../components/MySlider";
import { getNews } from "../../service/newsApi";
import NewCard from "../../components/Card/NewCard";
import FacilityCard from "../../components/Card/FacilityCard";
import CircularProgress from "@mui/material/CircularProgress";
const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        const filteredNews = data.results.filter(
          (article) => article.image_url !== null
        );
        setNews(filteredNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    console.log("news", news);
  }, [news]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div id="home-page">
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div className="col-6">
          <div id="welcome">
            <h1>
              Xin chào, <span style={{ color: "#212529" }}>Remy Sharp !</span>
            </h1>
            <div id="welcome-booking">
              <img src={doctor} alt="" />
              <h3>Cập nhật liên tục tiến trình lịch khám của bạn</h3>
              <p>
                Chúng tôi cung cấp thông tin chi tiết về tiến trình dịch vụ của
                bạn
              </p>
              <p>Lịch hẹn của tôi đã được xác nhận chưa ?</p>
              <p>Đơn khám của bạn đã có kết quả chưa ?</p>
              <button>Đặt lịch ngay</button>
            </div>
          </div>

          <div id="featured-services">
            <h2>Dịch vụ nổi bật</h2>
            <div id="services-grid">
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
            </div>
          </div>
        </div>

        <div id="appointment-quick-view">
          <h3>Lịch hẹn</h3>
          <MyDateCalendar />
          <div>
            <div className="row">
              <h3>Lịch khám</h3>
              <Link to="/" style={{ color: "blue" }}>
                Xem thêm
              </Link>
            </div>

            <div id="appoinment-list">
              <Appoinment />
            </div>
          </div>
        </div>
      </div>

      <MySlider />

      <div className="row" style={{alignItems: 'start'}}>
        <div id="news">
          <h2 style={{ marginBottom: "20px" }}>Tin tức y tế</h2>
          <div>
            {news.length ? (
              <div id="highlight-news">
                <div
                  className="row"
                  style={{ marginBottom: "30px", alignItems: "center" }}
                >
                  <h1 style={{ marginBottom: "20px" }}>Tin tức nổi bật</h1>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#007bff",
                      fontWeight: "600",
                    }}
                  >
                    Xem thêm
                  </Link>
                </div>
                <div className="row" style={{ alignItems: "start" }}>
                  <div id="first-new">
                    <img src={news[0].image_url} alt="" />
                    <h3>{news[0].title}</h3>
                    <p>{news[0].description}</p>
                    <p>{new Date(news[0].pubDate).toLocaleDateString()}</p>
                  </div>

                  <div id="sub-news">
                    {news.slice(1, 5).map((article) => (
                      <NewCard newsItem={article} key={article.id} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>

        <div id="facility-list">
          <h2 style={{ marginBottom: "20px" }}>Các cơ sở nổi bật</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            <FacilityCard />
            <FacilityCard />
            <FacilityCard />
            <FacilityCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
