import { Hospital, Users, Video, ScrollText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAdminLayout } from '../../context/AdminLayoutProvider';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
import api from '../../service/api';
const DashboardPage = () => {
    const { t } = useTranslation();
    const { setTitle } = useAdminLayout();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
      setTitle("admin.dashboard.title")
      api.get("admin/dashboard").then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
    })

    const stats = [
        {
          title: "Medical Facilities",
          count: 247,
          increase: "+12%",
          icon: <Hospital className="text-blue-500" size={24} />,
          bgColor: "bg-blue-50"
        },
        {
          title: "Patient User Accounts",
          count: 14829,
          increase: "+5.3%",
          icon: <Users className="text-green-500" size={24} />,
          bgColor: "bg-green-50"
        },
        {
          title: "Medical Vlogs",
          count: 392,
          increase: "+18%",
          icon: <ScrollText className="text-purple-500" size={24} />,
          bgColor: "bg-purple-50"
        }
    ];

    return (
        <div className="p-6 bg-gray-100">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stat.count.toLocaleString()}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-green-500 text-sm font-medium">{stat.increase}</span>
                  <span className="text-gray-500 text-sm ml-2">from last month</span>
                </div>
              </div>
            ))}
          </div>
    
          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        {item % 3 === 0 ? (
                          <Hospital size={20} className="text-blue-600" />
                        ) : item % 3 === 1 ? (
                          <Users size={20} className="text-green-600" />
                        ) : (
                          <Video size={20} className="text-purple-600" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {item % 3 === 0
                          ? "New medical facility registered"
                          : item % 3 === 1
                          ? "12 new patient accounts created"
                          : "New medical vlog uploaded"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item % 2 === 0 ? "2 hours ago" : "5 hours ago"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Analytics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">User Growth</h2>
              </div>
              <div className="p-6 h-64 flex items-center justify-center">
                <p className="text-gray-500">User growth chart will appear here</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">Vlog Metrics</h2>
              </div>
              <div className="p-6 h-64 flex items-center justify-center">
                <p className="text-gray-500">Vlog metrics chart will appear here</p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default DashboardPage;
