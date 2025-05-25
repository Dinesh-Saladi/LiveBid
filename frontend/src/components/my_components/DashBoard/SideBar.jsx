import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Gavel,
  Package,
  Activity,
  UserCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
  {
    title: "Account",
    icon: <UserCircle className="w-5 h-5" />,
    href: "/dashboard/account",
  },
];

function Sidebar() {
  const location = useLocation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen border-r bg-card">
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
        </ul>
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={async () => {
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
          }}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
