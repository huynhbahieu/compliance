import { Outlet, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  AlertTriangle, 
  Award, 
  FileCheck,
  Bell,
  Search,
  ChevronDown,
  FolderOpen
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
  
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 fixed h-screen">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-lg font-semibold">KIỂM SOÁT NỘI BỘ</h1>
          <p className="text-sm text-slate-400 mt-1">VTEC Compliance</p>
        </div>
        
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm audit, CAPA, chứng chỉ..."
                  className="w-full pl-11 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">QA</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-slate-900">Quản lý KSNB</p>
                  <p className="text-slate-500">Administrator</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}