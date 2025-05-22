import "./patientHomePage.css";
import doctorImg from "@images/doctor.png";
import { useTranslation } from "react-i18next";
import ServiceCard from "../../../components/card/ServiceCard";
import MyDateCalendar from "../../../components/calendar/MyDateCalendar";
import { Link } from "react-router-dom";
import MySlider from "../../../components/MySlider";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FacilityCard from "../../../components/card/FacilityCard";
import { getNews } from "../../../service/newsApi";
import { PatientLayoutContext } from "../../../context/PateintLayoutProvider";
import { useContext } from "react";
import patientApi from "../../../service/patientApi";
import { Skeleton } from "@mui/material";

const PatientHomePage = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const { user } = useContext(PatientLayoutContext);
  const [services, setServices] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState({
    news: true,
    main: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch news
        const newsData = await getNews();
        console.log(newsData);
        const filteredNews = newsData.results.filter(
          (article) => article.image_url !== null
        );
        setNews(filteredNews);
        setLoading((prev) => ({ ...prev, news: false }));

        const res = await patientApi.homePage();
        console.log(res);
        setServices(res.data.services);
        setFacilities(res.data.facilities);
        setAppointments(res.data.appointments);
        setLoading((prev) => ({ ...prev, main: false }));
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading({ news: false, main: false });
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading.main) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div id="home-page" className="p-4 md:p-6 lg:p-8">
      <p className="mb-4 text-2xl font-bold md:text-3xl">
        {t("hello")}, <span className="text-[#212529]">{user.name}!</span>
      </p>

      <div
        className="flex flex-col lg:flex-row justify-between gap-5"
        id="home-content"
      >
        <div className="w-full lg:w-2/3">
          <div id="welcome" className="mb-6">
            <div
              id="welcome-booking"
              className="p-4 md:p-6 bg-white rounded-lg shadow-md"
            >
              <div className="flex flex-col md:flex-row items-center gap-4">
                <img src={doctorImg} alt="Doctor" className="w-32 md:w-40" />
                <div className="text-left w-full">
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 w-full">
                    {t("welcome-heading")}
                  </h3>
                  <p className="text-white lg:mb-1 w-full">
                    Chúng tôi cung cấp thông tin chi tiết về tiến trình dịch vụ
                    của bạn
                  </p>
                  <p className="text-white lg:mb-1 w-4/5 lg:w-3/5 hidden md:block">
                    Lịch hẹn của tôi đã được xác nhận chưa ?
                  </p>
                  <p className="text-white lg:mb-3 w-3/5">
                    Đơn khám của bạn đã có kết quả chưa ?
                  </p>
                  <button className="booking-btn px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Đặt lịch ngay
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div id="featured-services" className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Dịch vụ nổi bật
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {
                loading.main ?
                Array.from({length: 6}).map(() => 
                  <Skeleton width={"100%"} height={50} />
                )
                :
                services.map((service, index) => (
                  <ServiceCard service={service} key={service.id || index} />
                ))
              }
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
          <MyDateCalendar appointments={appointments} />
        </div>
      </div>

      <div className="mt-8">
        <MySlider />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        <div className="w-full lg:w-[65%]">
          <p className="text-xl md:text-2xl font-semibold mb-6">
            Tin tức y tế
          </p>
          <div>
            {loading.news ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <CircularProgress />
              </div>
            ) : news.length > 0 ? (
              <div
                id="highlight-news"
                className="bg-white rounded-lg shadow-md p-4 md:p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <p className="text-xl md:text-2xl font-semibold">
                    Tin tức nổi bật
                  </p>
                  <Link
                    to="/news"
                    className="text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                  >
                    Xem thêm
                  </Link>
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div id="first-new" className="w-full lg:w-1/2">
                    <img
                      src={news[0].image_url}
                      alt={news[0].title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={news[0].source_icon}
                        alt={news[0].source_name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-600">
                        {news[0].source_name}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
                      <a
                        href={news[0].link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {news[0].title}
                      </a>
                    </h3>
                    <p className="text-gray-600 mb-2 line-clamp-3">
                      {news[0].description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(news[0].pubDate)}
                    </p>
                  </div>

                  <div className="w-full lg:w-1/2 grid gap-4">
                    {news.slice(1, 4).map((article) => (
                      <div
                        key={article.article_id}
                        className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={article.source_icon}
                            alt={article.source_name}
                            className="w-5 h-5 rounded-full"
                          />
                          <span className="text-sm text-gray-600">
                            {article.source_name}
                          </span>
                        </div>
                        <h4 className="font-semibold mb-2 hover:text-blue-600 transition-colors">
                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {article.title}
                          </a>
                        </h4>
                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                          {article.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-400">
                            {formatDate(article.pubDate)}
                          </p>
                          {article.image_url && (
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="w-20 h-20 object-cover rounded"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Không có tin tức nào
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-[32%]">
          <p className="text-xl md:text-2xl font-semibold mb-6">
            Các cơ sở nổi bật
          </p>
          <div className="flex flex-col gap-4">
            {facilities.map((facility, index) => (
              <FacilityCard facility={facility} key={facility.id || index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHomePage;
