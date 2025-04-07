import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom';
import transactionApi from '../../../service/transactionApi';
const PaymentResult = () => {
    const query = new URLSearchParams(useLocation().search);
    const { id } = useParams();
    const queryParams = {};
    for (let [key, value] of query.entries()) {
        queryParams[key] = value;
    }
    queryParams['appointment_id'] = id;
    console.log(queryParams);
    useEffect(() => {
        transactionApi.verifyPayment(queryParams,id).then((response) => {
            console.log(response);
        })
    }, []);

    return (
        <div className='p-5'>
            <div className='bg-white rounded-lg p-6 w-4xl mx-auto shadow-lg flex flex-col' >
                {queryParams.vnp_ResponseCode === "00" ? (
                    <div className='flex flex-col items-center'>
                        <CheckCircleIcon sx={{ fontSize: 100, color: "#4CAF50" }} />
                        <h1 className='text-2xl font-semibold text-[#007bff]'>Thanh toán thành công</h1>
                        <p className='text-gray-500 mt-1'>Cảm ơn bạn đã thanh toán dịch vụ của chúng tôi</p>
                        <p className='text-gray-500'>Mã giao dịch: {queryParams.vnp_TransactionNo}</p>
                        <p className='text-gray-500'>Số tiền: {queryParams.vnp_Amount / 100} VNĐ</p>
                        <p className='text-gray-500'>Ngày thanh toán: {queryParams.vnp_PayDate}</p>
                        <p className='text-gray-500'>Ngân hàng: {queryParams.vnp_BankCode}</p>
                    </div>
                ) : (
                    <div className='flex flex-col items-center'>
                        <ErrorIcon sx={{ fontSize: 100, color: "#f44336" }} />
                        <h1 className='text-2xl font-semibold text-[#007bff]'>Thanh toán thất bại</h1>
                        <p className='text-gray-500'>Vui lòng thử lại sau</p>
                    </div>
                )}
                <Link className='text-blue-500 text-center hover:underline mt-3' to={`/appointments`}>Quay lại</Link>
            </div>
        </div>
    );
}

export default PaymentResult;
