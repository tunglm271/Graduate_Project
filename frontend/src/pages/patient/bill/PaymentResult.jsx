import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";
import transactionApi from "../../../service/transactionApi";
import dayjs from "dayjs";
const PaymentResult = () => {
  const query = new URLSearchParams(useLocation().search);
  const { id } = useParams();
  const queryParams = {};
  for (let [key, value] of query.entries()) {
    queryParams[key] = value;
  }
  queryParams["appointment_id"] = id;
  console.log(queryParams);
  useEffect(() => {
    transactionApi.verifyPayment(queryParams, id).then((response) => {
      console.log(response);
    });
  }, []);

  const formatPayDate = (dateString) => {
    if (!dateString) return "";
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hour = dateString.substring(8, 10);
    const minute = dateString.substring(10, 12);
    const second = dateString.substring(12, 14);
    return dayjs(`${year}-${month}-${day}T${hour}:${minute}:${second}`).format(
      "DD/MM/YYYY HH:mm:ss"
    );
  };

  return (
    <div className="p-5">
      <div className="bg-white rounded-lg p-6 my-20 w-4xl mx-auto shadow-lg flex flex-col">
        {queryParams.vnp_ResponseCode === "00" ? (
          <div className="flex flex-col items-center">
            <CheckCircleIcon sx={{ fontSize: 100, color: "#4CAF50" }} />
            <p className="text-2xl font-semibold text-[#007bff]">
              Thanh toán thành công
            </p>
            <p className="text-gray-500 mt-1">
              Cảm ơn bạn đã thanh toán dịch vụ của chúng tôi
            </p>
            <div className="w-full max-w-md mt-7">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Mã giao dịch:</span>
                <span className="text-gray-700">
                  {queryParams.vnp_TransactionNo}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Số tiền:</span>
                <span className="text-gray-700">
                  {queryParams.vnp_Amount / 100} VNĐ
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Ngày thanh toán:</span>
                <span className="text-gray-700">
                  {formatPayDate(queryParams.vnp_PayDate)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Ngân hàng:</span>
                <span className="text-gray-700">
                  {queryParams.vnp_BankCode}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <ErrorIcon sx={{ fontSize: 100, color: "#f44336" }} />
            <p className="text-2xl font-semibold text-red-500">
              Thanh toán thất bại
            </p>
            <p className="text-gray-500">Vui lòng thử lại sau</p>
          </div>
        )}
        <Link
          className="text-blue-500 text-xl text-center hover:underline mt-7"
          to={`/appointments`}
        >
          Quay lại
        </Link>
      </div>
    </div>
  );
};

export default PaymentResult;
