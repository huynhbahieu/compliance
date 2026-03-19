import { Outlet, Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  AlertTriangle, 
  Award, 
  FileCheck,
  Bell,
  Search,
  ChevronDown,
  FolderOpen,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Audit', href: '/audits', icon: ClipboardCheck },
  { name: 'CAPA & Finding', href: '/capa', icon: AlertTriangle },
  { name: 'Chứng chỉ', href: '/certificates', icon: Award },
  { name: 'Kho lưu trữ', href: '/certificate-storage', icon: FolderOpen },
  { name: 'Checklist', href: '/checklist/1', icon: FileCheck },
];

export function Layout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Backdrop for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-white flex-shrink-0 h-screen transition-transform duration-300 ${
        isMobile ? 'fixed z-40' : 'fixed z-20'
      } w-64 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-lg font-semibold whitespace-nowrap">KIỂM SOÁT NỘI BỘ</h1>
          <p className="text-sm text-slate-400 mt-1 whitespace-nowrap">VTEC Compliance</p>
        </div>
        
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-100px)]">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Toggle Button - Desktop Only */}
      {!isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`fixed top-20 z-30 bg-blue-600 text-white p-2 rounded-r-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ${
            isSidebarOpen ? 'left-64' : 'left-0'
          }`}
          title={isSidebarOpen ? 'Đóng sidebar' : 'Mở sidebar'}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${
        isMobile ? 'ml-0' : (isSidebarOpen ? 'ml-64' : 'ml-0')
      }`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 flex-shrink-0 z-10">
          <div className="px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
              title="Menu"
            >
              <Menu className="w-6 h-6 text-slate-600" />
            </button>

            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full pl-11 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-slate-200">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-xs sm:text-sm">QA</span>
                </div>
                <div className="text-sm hidden xl:block">
                  <p className="font-medium text-slate-900 whitespace-nowrap">Quản lý KSNB</p>
                  <p className="text-slate-500 whitespace-nowrap text-xs">Administrator</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}