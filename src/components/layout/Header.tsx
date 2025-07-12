import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg">
            S
          </div>
          <span className="text-xl font-bold text-foreground">StackIt</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search questions..."
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <Link to="/ask">
            <Button variant="default" size="sm">
              <Plus className="w-4 h-4" />
              Ask Question
            </Button>
          </Link>

          <ThemeToggle />
          <NotificationDropdown />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;