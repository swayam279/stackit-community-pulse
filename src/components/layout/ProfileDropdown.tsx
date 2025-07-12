import { User, Settings, LogOut, Star, MessageSquare, Award, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock user data
const mockUser = {
  username: "devuser123",
  email: "dev@example.com",
  reputation: 1250,
  questionsAsked: 12,
  answersGiven: 34,
  avatar: null
};

const ProfileDropdown = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account."
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {/* User Info Section */}
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-medium">{mockUser.username}</p>
              <p className="text-xs text-muted-foreground">{mockUser.email}</p>
              <div className="flex items-center gap-1 mt-1">
                <Award className="w-3 h-3 text-warning" />
                <span className="text-xs text-muted-foreground">{mockUser.reputation} reputation</span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />

        {/* User Stats */}
        <div className="p-2 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <HelpCircle className="w-4 h-4" />
              Questions Asked
            </span>
            <span className="font-medium">{mockUser.questionsAsked}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="w-4 h-4" />
              Answers Given
            </span>
            <span className="font-medium">{mockUser.answersGiven}</span>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Profile Actions */}
        <Link to="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <User className="w-4 h-4 mr-2" />
            View Profile
          </DropdownMenuItem>
        </Link>

        <Link to="/my-questions">
          <DropdownMenuItem className="cursor-pointer">
            <HelpCircle className="w-4 h-4 mr-2" />
            My Questions
          </DropdownMenuItem>
        </Link>

        <Link to="/unanswered">
          <DropdownMenuItem className="cursor-pointer">
            <Star className="w-4 h-4 mr-2" />
            Unanswered Questions
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link to="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;