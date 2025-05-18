import "./patientHomePage.css";
import doctorImg from "@images/doctor.png";
import { useTranslation } from "react-i18next";
import ServiceCard from "../../../components/card/ServiceCard";
import MyDateCalendar from "../../../components/calendar/MyDateCalendar";
import Appoinment from "../../../components/calendar/Appoinment";
import { Link } from "react-router-dom";
import MySlider from "../../../components/MySlider";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FacilityCard from "../../../components/card/FacilityCard";
import { getNews } from "../../../service/newsApi";
import NewCard from "../../../components/card/NewCard";
import { PatientLayoutContext } from "../../../context/PateintLayoutProvider";
import { useContext } from "react";
import api from "../../../service/api";

const PatientHomePage = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const { user } = useContext(PatientLayoutContext);

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
    api.get('homepage').then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      console.log("done");
    });
  }, []);

  return (
    <div id="home-page">
      <h1 className="mb-4">
        {t("hello")},{" "}
        <span style={{ color: "#212529" }}>{user.name}!</span>
      </h1>

      <div className="flex justify-between gap-5" id="home-content">
        <div className="col-6">
          <div id="welcome">
            <div id="welcome-booking">
              <img src={doctorImg} alt="" />
              <h3>{t("welcome-heading")}</h3>
              <p>
                Chúng tôi cung cấp thông tin chi tiết về tiến trình dịch vụ của
                bạn
              </p>
              <p>Lịch hẹn của tôi đã được xác nhận chưa ?</p>
              <p>Đơn khám của bạn đã có kết quả chưa ?</p>
              <button className="booking-btn">Đặt lịch ngay</button>
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
              <Appoinment />
            </div>
          </div>
        </div>
      </div>

      <MySlider />

      <div className="row items-start max-md:flex-col">
        <div className="mt-10 w-[65%] max-md:w-full">
          <h2 style={{ marginBottom: "20px" }}>Tin tức y tế</h2>
          <div>
            {news.length ? (
              <div id="highlight-news">
                <div
                  className="row"
                  style={{ marginBottom: "30px", alignItems: "center" }}
                >
                  <h1>Tin tức nổi bật</h1>
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

                  <div id="sub-news-list">
                    {news.slice(1, 5).map((article, index) => (
                      <NewCard newsItem={article} key={index} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>

        <div className="mt-10 w-[32%] items-start max-md:w-full">
          <h2 style={{ marginBottom: "20px" }}>Các cơ sở nổi bật</h2>
          <div className="flex flex-col gap-5">
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

export default PatientHomePage;
