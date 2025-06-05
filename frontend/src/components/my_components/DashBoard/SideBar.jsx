import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Gavel,
  Package,
  Activity,
  UserCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CreateAuction from "./SideBar/CreateAuction";
import JoinAuction from "./SideBar/JoinAuction";

const navItems = [
  {
    title: "Dashboard",
    icon: <Home className="w-5 h-5" />,
    href: "/dashboard",
  },
  {
    title: "My Auctions",
    icon: <Gavel className="w-5 h-5" />,
    href: "/dashboard/my-auctions",
  },
  {
    title: "All Auctions",
    icon: <Package className="w-5 h-5" />,
    href: "/dashboard/auctions",
  },
  {
    title: "My Activity",
    icon: <Activity className="w-5 h-5" />,
    href: "/dashboard/activity",
  },
];

function SideBar() {
  const location = useLocation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const logoutPromise = logout();
    toast.promise(logoutPromise, {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Failed to logout",
    });
    try {
      await logoutPromise;
      navigate("/login");
    } catch (error) {
      // Error handled by toast
    }
  };

  return (
    <>
      {/* Desktop Sidebar - unchanged for lg screens */}
      <div className="hidden lg:flex flex-col h-screen border-r bg-card shadow-md w-64">
        <div className="p-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Gavel className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">LiveBid</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
            <li className="flex text-xs items-center gap-3 font-semibold uppercase text-muted-foreground pl-2 pt-4">
              <div className="flex-grow border-t text-muted-foreground"/>
              <span>Quick Actions</span>
              <div className="flex-grow border-t text-muted-foreground"/>
            </li>
            <li>
              <CreateAuction vis={true} />
            </li>
            <li>
              <JoinAuction vis={true} />
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Tablet Sidebar - Collapsed with icons only */}
      <div className="hidden md:flex lg:hidden flex-col h-screen border-r bg-card shadow-md w-16">
        <div className="p-4 flex justify-center">
          <Link to="/dashboard">
            <Gavel className="w-6 h-6 text-primary" />
          </Link>
        </div>

        <nav className="flex-1 p-2">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center justify-center p-3 rounded-lg transition-colors group relative",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  title={item.title}
                >
                  {item.icon}
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    {item.title}
                  </div>
                </Link>
              </li>
            ))}
            <li>
              <div className="flex-grow border-t text-muted-foreground"/>
            </li>
            <li>
              <CreateAuction vis={false} />
            </li>
            <li>
              <JoinAuction vis={false} />
            </li>
          </ul>
        </nav>

        <div className="p-2 border-t">
          <Button
            variant="ghost"
            size="icon"
            className="w-full"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between p-4 border-b bg-card z-40">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Gavel className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold">LiveBid</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu */}
          <div className="absolute top-0 right-0 bg-card w-64 h-full shadow-lg">
            <div className="p-4 border-b flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                        location.pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
                <li className="flex text-xs font-semibold uppercase text-muted-foreground pl-2 pt-4">
                  Quick Actions
                </li>
                <li>
                  <CreateAuction vis={true}/>
                </li>
                <li>
                  <JoinAuction vis={true} />
                </li>
              </ul>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;
