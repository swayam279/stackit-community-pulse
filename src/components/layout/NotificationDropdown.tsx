import { useState } from "react";
import { Bell, MessageSquare, Award, User, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: "answer" | "comment" | "mention" | "award";
  title: string;
  content: string;
  author: string;
  timestamp: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "answer",
    title: "New answer to your question",
    content: "Someone answered your question about React state management",
    author: "reactpro",
    timestamp: "2 minutes ago",
    isRead: false
  },
  {
    id: "2",
    type: "mention",
    title: "You were mentioned",
    content: "@devuser123 mentioned you in a discussion about TypeScript",
    author: "tsexpert",
    timestamp: "1 hour ago",
    isRead: false
  },
  {
    id: "3",
    type: "award",
    title: "Your answer was accepted",
    content: "Your answer about CSS Grid was marked as the best solution",
    author: "csslearner",
    timestamp: "3 hours ago",
    isRead: false
  },
  {
    id: "4",
    type: "comment",
    title: "New comment on your answer",
    content: "Someone commented on your Redux Toolkit answer",
    author: "statemaster",
    timestamp: "5 hours ago",
    isRead: true
  }
];

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "answer":
        return <MessageSquare className="w-4 h-4 text-primary" />;
      case "comment":
        return <MessageSquare className="w-4 h-4 text-accent" />;
      case "mention":
        return <User className="w-4 h-4 text-warning" />;
      case "award":
        return <Award className="w-4 h-4 text-success" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-3 cursor-pointer ${!notification.isRead ? 'bg-accent/10' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex gap-3 w-full">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm text-foreground">
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {notification.content}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>by {notification.author}</span>
                      <span>•</span>
                      <span>{notification.timestamp}</span>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center justify-center">
          <span className="text-sm text-primary">View all notifications</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;