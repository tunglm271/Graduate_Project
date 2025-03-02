import CashFlowLineChart from "../../components/chart/CashFlowLineChart";

const FacilityDashboard = () => {
    const formattedDate = new Intl.DateTimeFormat("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).format(new Date());

    return (
        <div style={{padding: "20px"}} className="bg-white w-full h-full">
            <h2 className="text-2xl font-semibold" style={{marginBottom: "3px", fontWeight: 700}}>Good Morning, Admin Pk!</h2>
            <p className="text-gray-500 font-semibold" style={{marginBottom: "10px"}}>{formattedDate}</p>
            <div className="flex justify-between items-center">
                <CashFlowLineChart />
            </div>
        </div>
    );
}

export default FacilityDashboard;
