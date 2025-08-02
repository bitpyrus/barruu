import { PenTool, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
                <PenTool className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Barruu</span>
            </div>
            <p className="body-sm text-muted-foreground">
              A modern publishing platform for writers and readers who value quality content.
            </p>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="body-sm text-muted-foreground hover:text-primary transition-colors">Write</a></li>
              <li><a href="#" className="body-sm text-muted-foreground hover:text-primary transition-colors">Explore</a></li>
              <li><a href="#" className="body-sm text-muted-foreground hover:text-primary transition-colors">Following</a></li>
              <li><a href="#" className="body-sm text-muted-foreground hover:text-primary transition-colors">Bookmarks</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="body-sm text-muted-foreground hover:text-primary transition-colors">Guidelines</a></li>
              <li><a href="#" className="body-sm text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="body-sm text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="body-sm text-muted-foreground hover:text-primary transition-colors">Newsletter</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="body-sm text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="body-sm text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="body-sm text-muted-foreground hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="body-sm text-muted-foreground hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="body-sm text-muted-foreground">
            © 2024 Barruu. Made with ❤️ for writers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;