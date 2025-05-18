import { useAdminLayout } from "../../context/AdminLayoutProvider";
import LanguageSelect from "../../components/LanguageSelect";
import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const AdminHeader = () => {
    const { t } = useTranslation();
    const { isMobile, toggleSidebar, sidebarOpen, sidebarWidth, sidebarExpanded, title } = useAdminLayout();
    return (
        <header className="bg-white shadow-sm flex justify-between">
          <div className="h-16 flex items-center px-4">
            {isMobile && (
              <button 
                onClick={toggleSidebar}
                className="p-2 mr-2 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                <Menu size={20} />
              </button>
            )}
            <h2 className="text-lg font-medium">{t(title)}</h2>
          </div>
          <LanguageSelect color="black" />
        </header>
    );
}

export default AdminHeader;
