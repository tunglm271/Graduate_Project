import { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Mail, Globe, FileText, Users, Database, ArrowLeft, CheckCircle, XCircle  } from 'lucide-react';
import { Link } from 'react-router-dom';
import adminFacilityApi from '../../service/admin/adminFacilityApi';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
const facilityData = {
    name: "Riverside Medical Center",
    address: "123 Health Avenue, Medical District, NY 10001",
    phone: "(555) 123-4567",
    email: "contact@riversidemedical.com",
    website: "www.riversidemedical.com",
    hours: "Mon-Fri: 8AM-8PM, Sat: 9AM-5PM, Sun: Closed",
    facilityId: "FACID-10042",
    status: "Active",
    lastUpdated: "2025-04-28"
  };
  
  const legalInfo = {
    licenseNumber: "MED-12345-NY",
    accreditation: "Joint Commission Accredited",
    established: "1985",
    ownership: "Riverside Healthcare Group",
    insuranceAccepted: ["Medicare", "Medicaid", "Blue Cross", "Aetna", "Cigna", "UnitedHealthcare"],
    taxId: "12-3456789",
    certifications: ["NCQA Recognition", "Patient-Centered Medical Home", "Quality Care Provider"]
  };
  
const FacilityDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [facility, setFacility] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        adminFacilityApi.getFacilityById(id)
            .then((response) => {
                console.log(response.data);
                setFacility(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching facility data:", error);
                setLoading(false);
            });
    }, [id]);


    return (
    <div className="w-11/12 mx-auto p-4 mt-4 bg-gray-100">
        {/* Admin Header */}
        <div className="mb-4 pb-2 border-b border-gray-300 flex justify-between items-center text-sm text-gray-500">
            <Link to="/admin/facilities" className="flex items-center hover:underline">
                <ArrowLeft size={16} className="inline mr-1" /> Back to Facility List
            </Link>
        </div>

        {/* Facility Info Card */}
        <div className="bg-white border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between">
                {
                    loading ?
                    <Skeleton variant="text" width={250} height={45} className="mr-2" /> :
                    <p className="text-xl font-semibold">{facility.facility_name}</p>
                }
                <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    facility.status == "active"
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                >
                    {facility.status == "active" ? (
                    <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {t("admin.facility_list.status.active")}
                    </>
                    ) : (
                    <>
                        <XCircle className="w-4 h-4 mr-1" />
                        {t("admin.facility_list.status.inactive")}
                    </>
                    )}
                </div>
            </div>
            </div>
            <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                    {
                        loading ?
                            <Skeleton variant="text" width={200} height={20} className="mr-2" /> :
                        <>
                            <MapPin size={16} className="mr-2 text-gray-500" />
                            <span>{facility.address}</span>
                        </>
                    }
                </div>
                <div className="flex items-center">
                    {
                        loading ?
                            <Skeleton variant="text" width={200} height={20} className="mr-2" /> :
                        <>
                            <Phone size={16} className="mr-2 text-gray-500" />
                            <span>{facility.phone}</span>
                        </>
                    }
                </div>
                <div className="flex items-center">
                    {
                        loading ?
                            <Skeleton variant="text" width={200} height={20} className="mr-2" /> :
                        <>
                            <Mail size={16} className="mr-2 text-gray-500" />
                            <span>{facility.email}</span>
                        </>
                    }
                </div>
                <div className="flex items-center">
                    {
                        loading ?
                        <Skeleton variant="text" width={200} height={20} className="mr-2" /> :
                        <>
                            <Globe size={16} className="mr-2 text-gray-500" />
                            <span>{facility.website || "Không có"}</span>
                        </>
                    }
                </div>
                <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-gray-500" />
                    <span>{facilityData.hours}</span>
                </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500">
                Last Updated: {facilityData.lastUpdated}
            </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-200">
            <div className="flex border-b border-gray-200">
            <button 
                className={`px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 ${activeTab === 0 ? 'bg-gray-100 border-b-2 border-gray-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab(0)}
            >
                Legal Information
            </button>
            <button 
                className={`px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 ${activeTab === 1 ? 'bg-gray-100 border-b-2 border-gray-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab(1)}
            >
                Staff
            </button>
            <button 
                className={`px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 ${activeTab === 2 ? 'bg-gray-100 border-b-2 border-gray-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab(2)}
            >
                Services
            </button>
            </div>
            
            <div className="p-4">
            {/* Legal Information Tab */}
            {activeTab === 0 && (
                <div>
                <div className="flex items-center mb-4">
                    <FileText size={18} className="mr-2 text-gray-600" />
                    <p className="text-lg font-semibold">Legal Documentation and Compliance</p>
                </div>
                
                <table className="w-full text-sm">
                    <tbody>
                    <tr className="border-b border-gray-100">
                        <td className="py-2 px-2 font-medium text-gray-600 w-1/4">License Number</td>
                        <td className="py-2 px-2">{facility.medical_practice_license}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="py-2 px-2 font-medium text-gray-600">Accreditation</td>
                        <td className="py-2 px-2">{legalInfo.accreditation}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="py-2 px-2 font-medium text-gray-600">Established</td>
                        <td className="py-2 px-2">{legalInfo.established}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="py-2 px-2 font-medium text-gray-600">Ownership</td>
                        <td className="py-2 px-2">{facility.legal_representative_name}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="py-2 px-2 font-medium text-gray-600">Tax ID</td>
                        <td className="py-2 px-2">{legalInfo.taxId}</td>
                    </tr>
                    </tbody>
                </table>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium mb-2">Insurance Accepted</h3>
                    <div className="flex flex-wrap gap-2">
                    {legalInfo.insuranceAccepted.map((insurance, index) => (
                        <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs"
                        >
                        {insurance}
                        </span>
                    ))}
                    </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium mb-2">Certifications</h3>
                    <ul className="list-disc pl-5 text-sm">
                    {legalInfo.certifications.map((cert, index) => (
                        <li key={index} className="mb-1">{cert}</li>
                    ))}
                    </ul>
                </div>
                </div>
            )}
            
            {/* Doctors Tab */}
            {activeTab === 1 && (
                <div>
                <div className="flex items-center mb-4">
                    <Users size={18} className="mr-2 text-gray-600" />
                    <h2 className="text-base">Medical Personnel</h2>
                </div>
                
                {
                    facility.doctors.length === 0 ?
                    <div className="text-gray-500 text-sm">No doctors available.</div> :
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="text-left p-2 border border-gray-200">ID</th>
                                <th className="text-left p-2 border border-gray-200">Name</th>
                                <th className="text-left p-2 border border-gray-200">Specialty</th>
                                <th className="text-left p-2 border border-gray-200">Qualifications</th>
                                <th className="text-left p-2 border border-gray-200">Experience</th>
                                <th className="text-left p-2 border border-gray-200">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facility.doctors.map((doctor) => (
                                <tr key={doctor.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="p-2 border border-gray-200 font-mono text-xs">{doctor.employeeId}</td>
                                <td className="p-2 border border-gray-200">{doctor.name}</td>
                                <td className="p-2 border border-gray-200">{doctor.specialization}</td>
                                <td className="p-2 border border-gray-200">{doctor.qualifications}</td>
                                <td className="p-2 border border-gray-200">{doctor.experience}</td>
                                <td className="p-2 border border-gray-200">
                                    <span className={`px-2 py-0.5 text-xs ${doctor.status === 'Active' ? 'bg-gray-100' : 'bg-gray-200'}`}>
                                    {doctor.status}
                                    </span>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                </div>
            )}
            
            {/* Services Tab */}
            {activeTab === 2 && (
                <div>
                    <div className="flex items-center mb-4">
                        <Database size={18} className="mr-2 text-gray-600" />
                        <h2 className="text-base">Services Management</h2>
                    </div>
                    
                    {
                        facility.services.length === 0 ?
                        <div className="text-gray-500 text-sm">No services available.</div> :
                        <table className="w-full border-collapse text-sm">
                            <thead>
                            <tr className="bg-gray-50">
                                <th className="text-left p-2 border border-gray-200">Service Name</th>
                                <th className="text-left p-2 border border-gray-200">Description</th>
                                <th className="text-left p-2 border border-gray-200">Price</th>
                                <th className="text-left p-2 border border-gray-200">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {facility.services.map((service) => (
                                <tr key={service.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="p-2 border border-gray-200 font-medium">{service.name}</td>
                                <td className="p-2 border border-gray-200">{service.description}</td>
                                <td className="p-2 border border-gray-200 font-mono text-xs">{service.price}</td>
                                <td className="p-2 border border-gray-200">
                                    <span className={`px-2 py-0.5 text-xs ${service.available ? 'bg-gray-100' : 'bg-gray-200'}`}>
                                    {service.available ? 'Available' : 'Unavailable'}
                                    </span>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    }
                </div>
            )}
            </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-right">
            Administrator View | v1.0.2
        </div>
    </div>
    );
}

export default FacilityDetail;
