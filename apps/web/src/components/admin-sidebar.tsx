import { Link, useLocation } from '@tanstack/react-router';
import { LayoutDashboard, Tag, Users, Grid3x3 } from 'lucide-react';

export function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      to: '/admin',
      icon: LayoutDashboard,
      label: 'Dashboard',
      match: (pathname: string) => pathname === '/admin',
    },
    {
      to: '/admin/discounts',
      icon: Tag,
      label: 'Discounts',
      match: (pathname: string) => pathname.startsWith('/admin/discounts'),
    },
    {
      to: '/admin/users',
      icon: Users,
      label: 'Users',
      match: (pathname: string) => pathname.startsWith('/admin/users'),
    },
    {
      to: '/admin/venue-types',
      icon: Grid3x3,
      label: 'Venue Types',
      match: (pathname: string) => pathname.startsWith('/admin/venue-types'),
    },
  ];

  return (
    <aside className="w-64 shrink-0">
      <div className="card sticky top-24">
        <div className="mb-4 border-b border-gray-200 pb-4">
          <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
          <p className="text-sm text-gray-600">Manage system</p>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.match(location.pathname);

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
