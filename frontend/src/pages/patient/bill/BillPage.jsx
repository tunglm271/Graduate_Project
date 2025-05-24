import { Divider, Button, Chip } from "@mui/material";
import "./bill-page.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import transactionApi from "../../../service/transactionApi";
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";

const BillPage = () => {
  const { id } = useParams();
  const [bill, setBill] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { showErrorSnackbar } = useCustomSnackbar();

  useEffect(() => {
    if (id) {
      transactionApi
        .getBill(id)
        .then((response) => {
          setBill(response.data);
          setServices(response.data.services);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching bill data:", error);
          setError(true);
          showErrorSnackbar("Có lỗi xảy ra trong quá trình lấy dữ liệu");
          setLoading(false);
        });
    }
  }, [id]);

  if (error) {
    return <Navigate to="/appointments" replace />;
  }

  const handlePayment = () => {
    transactionApi
      .vnPayPayment(id)
      .then((response) => {
        const { data } = response.data;
        window.location.href = data;
      })
      .catch((error) => {
        console.error("Error during payment:", error);
      });
  };

  return (
    <div className="lg:p-5 p-3 mx-auto px-4">
      <div className="bg-white rounded-lg">
        <div className="border-dot"></div>
        <div className="p-4 md:p-5">
          <div className="flex gap-2 text-[#007bff] text-lg items-center mb-2">
            <LocationOnIcon />
            <span>Cơ sở khám bệnh</span>
          </div>
          <p className="font-semibold">
            {bill?.medical_facility?.facility_name}
          </p>
          <p className="text-sm md:text-base">
            {bill?.medical_facility?.address}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg mt-5 p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
          <p className="text-xl">Dịch vụ</p>
          <div className="flex items-center text-gray-500 text-sm">
            <p className="text-center w-24 md:w-32">Đơn giá</p>
            <p className="text-center w-24 md:w-32">Số lượng</p>
            <p>Thành tiền</p>
          </div>
        </div>
        {loading ? (
          <div className="flex flex-col gap-4 mt-4">
            <Skeleton variant="rectangular" width="100%" height={50} />
            <Skeleton variant="rectangular" width="100%" height={50} />
            <Skeleton variant="rectangular" width="100%" height={50} />
          </div>
        ) : (
          services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 md:gap-4 text-gray-600 text-sm py-2"
            >
              <div className="flex items-center gap-2">
                <img
                  src={service.thumbnail}
                  alt=""
                  className="w-10 h-10 object-contain"
                />
                <p className="text-gray-700 font-semibold">{service.name}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm w-full md:w-auto justify-between md:justify-end">
                <p className="text-center w-24 md:w-32">
                  {service.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <p className="text-center w-24 md:w-32">
                  {service.pivot.quantity}
                </p>
                <p className="text-right">
                  {(service.price * service.pivot.quantity).toLocaleString(
                    "vi-VN",
                    { style: "currency", currency: "VND" }
                  )}
                </p>
              </div>
            </div>
          ))
        )}
        <Divider className="my-4" />
      </div>

      <div className="bg-[#fffefb] rounded-lg mt-5">
        <div className="p-4 md:p-6 bg-white flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
          <span>Phương thức thanh toán</span>
          <Chip
            label="Thanh toán qua VNpay"
            variant="outlined"
            color="primary"
            className="text-sm"
          />
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-[70%_1fr_1fr] gap-4 text-gray-600 text-sm px-3">
          <div></div>
          <div className="p-2">Tổng tiền dịch vụ</div>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={50} />
          ) : (
            <div className="text-right p-2">
              ₫{parseInt(bill?.total_amount).toLocaleString("vi-VN")}
            </div>
          )}
          <div></div>
          <div className="p-2">Tổng thanh toán</div>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={50} />
          ) : (
            <div className="text-right p-2 text-xl text-[#007bff]">
              ₫{parseInt(bill?.total_amount).toLocaleString("vi-VN")}
            </div>
          )}
        </div>
        <Divider />
        <div className="p-4 md:p-6">
          <Button
            variant="contained"
            sx={{
              display: "block",
              ml: "auto",
              backgroundColor: "#007bff",
              color: "#fff",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#0056b3" },
              width: { xs: "100%", md: "auto" },
            }}
            onClick={handlePayment}
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillPage;
