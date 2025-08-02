import { Button } from "@/components/ui/button";
import { PenTool, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthDialog from "@/components/auth/AuthDialog";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Explore
          </a>
          {isLoggedIn && (
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Following
            </a>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <>
              <Link to="/write">
                <Button variant="ghost" size="sm">
                  <PenTool className="w-4 h-4 mr-2" />
                  Write
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <User className="w-4 h-4" />
              </Button>
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