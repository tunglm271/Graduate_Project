import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { format, addDays, isToday, isSameDay } from "date-fns";
import PropTypes from "prop-types";
import { useMediaQuery, useTheme } from "@mui/material";

const DateSlider = ({ selectedDate, setSelectedDate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const swiperRef = useRef(null);

  // Tạo danh sách 21 ngày (10 ngày trước, ngày hiện tại, 10 ngày sau)
  const today = new Date();
  const days = Array.from({ length: 21 }, (_, i) => addDays(today, i - 10));

  // Lấy index của ngày hôm nay
  const todayIndex = days.findIndex((date) => isToday(date));

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(todayIndex - 3); // Cuộn slider về ngày hôm nay
    }
  }, []);

  const handleTodayClick = () => {
    setSelectedDate(today);
    if (swiperRef.current) {
      swiperRef.current.slideTo(todayIndex - 3); // Cuộn slider về ngày hôm nay
    }
  };

  return (
    <div className="w-full mx-auto mb-5">
      <Swiper
        slidesPerView={isMobile ? 5 : 7} // Số lượng slide
        spaceBetween={30}
        modules={[]}
        centeredSlides={false}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Lưu instance Swiper
      >
        {days.map((date, index) => (
          <SwiperSlide key={date.toISOString()}>
            <button
              className={`w-16 h-16 lg:w-20 lg:h-20 flex flex-col items-center justify-center rounded-2xl border-none cursor-pointer hover:bg-gray-300
                ${
                  isSameDay(selectedDate, date)
                    ? "bg-gray-200 text-black"
                    : "bg-slate-100 text-gray-600"
                }
              `}
              onClick={() => {
                setSelectedDate(date);
                if (swiperRef.current) swiperRef.current.slideTo(index - 3); // Cuộn về ngày được chọn
              }}
            >
              <p
                className={`text-xs mb-2 ${
                  isSameDay(selectedDate, date)
                    ? ""
                    : isToday(date)
                    ? "text-blue-500"
                    : ""
                }`}
              >
                {format(date, "EEE")}
              </p>
              <p
                className={`font-bold rounded-full p-[2px] w-8 h-8 flex items-center justify-center
                  ${
                    isSameDay(selectedDate, date)
                      ? "bg-black text-white"
                      : isToday(date)
                      ? "text-blue-500"
                      : ""
                  }
                `}
              >
                {format(date, "dd")}
              </p>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Nút Quay lại Hôm nay */}
      <div className="flex justify-between px-4 items-center">
        <p className="text-center text-gray-700 font-medium">
          {format(selectedDate, "d 'tháng' M")}
        </p>

        <button
          onClick={handleTodayClick}
          className={`font-semibold underline text-sm transition
            ${
              isSameDay(selectedDate, today)
                ? "text-gray-400 cursor-default" // Xám nếu đang ở hôm nay
                : "cursor-pointer text-blue-500 hover:text-blue-700" // Xanh nếu chọn ngày khác
            }
          `}
          disabled={isSameDay(selectedDate, today)}
        >
          Hôm nay
        </button>
      </div>
    </div>
  );
};

DateSlider.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  setSelectedDate: PropTypes.func.isRequired,
};

export default DateSlider;
