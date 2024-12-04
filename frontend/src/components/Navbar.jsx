import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 z-40 w-full border-b border-white/10 bg-gradient-to-r from-base-300/80 to-base-100/80 backdrop-blur-lg">
      <nav className="container mx-auto h-16 px-4">
        <div className="flex h-full items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="group flex items-center gap-3 transition-all hover:opacity-90">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 shadow-lg shadow-primary/10 transition-all group-hover:bg-primary/30">
              <MessageSquare className="size-5 text-primary" />
            </div>
            <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-xl font-bold text-transparent">
              Chatty
            </h1>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-3">
            <Link
              to="/settings"
              className="btn btn-ghost btn-sm gap-2 rounded-lg hover:bg-white/5"
            >
              <Settings className="size-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link 
                  to="/profile" 
                  className="btn btn-ghost btn-sm gap-2 rounded-lg hover:bg-white/5"
                >
                  <User className="size-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button 
                  onClick={logout}
                  className="btn btn-ghost btn-sm gap-2 rounded-lg text-error hover:bg-error/10"
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
