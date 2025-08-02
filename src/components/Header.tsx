import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PenTool, User, Settings, LogOut, Bookmark, Heart } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthDialog from "@/components/auth/AuthDialog";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
            <PenTool className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">Barruu</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-muted-foreground hover:text-foreground transition-colors ${
              location.pathname === "/" ? "text-foreground font-medium" : ""
            }`}
          >
            Home
          </Link>
          <Link 
            to="/explore"
            className={`text-muted-foreground hover:text-foreground transition-colors ${
              location.pathname === "/explore" ? "text-foreground font-medium" : ""
            }`}
          >
            Explore
          </Link>
          {isAuthenticated && (
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Following
            </a>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <Link to="/write">
                <Button variant="ghost" size="sm">
                  <PenTool className="w-4 h-4 mr-2" />
                  Write
                </Button>
              </Link>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">@{user?.username}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/profile/${user?.username}`} className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bookmark className="w-4 h-4 mr-2" />
                    Reading List
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="w-4 h-4 mr-2" />
                    Liked Articles
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setAuthMode("signin");
                  setAuthDialogOpen(true);
                }}
              >
                Sign In
              </Button>
              <Button 
                variant="hero" 
                size="sm"
                onClick={() => {
                  setAuthMode("signup");
                  setAuthDialogOpen(true);
                }}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>

      <AuthDialog 
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </header>
  );
};

export default Header;