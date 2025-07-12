import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowUp, 
  ArrowDown, 
  Check, 
  Pin,
  PinOff,
  User,
  Award,
  MessageSquare,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Answer {
  id: string;
  content: string;
  author: string;
  authorReputation: number;
  votes: number;
  isAccepted: boolean;
  isPinned: boolean;
  createdAt: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface AnswerInterfaceProps {
  answer: Answer;
  isQuestionAuthor: boolean;
  onVote: (answerId: string, direction: 'up' | 'down') => void;
  onAccept: (answerId: string) => void;
  onPin: (answerId: string) => void;
}

const AnswerInterface = ({ answer, isQuestionAuthor, onVote, onAccept, onPin }: AnswerInterfaceProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    toast({
      title: "Comment added",
      description: "Your comment has been posted."
    });
    setNewComment("");
    setShowComments(true);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "report":
        toast({
          title: "Answer reported",
          description: "Thank you for helping maintain the community."
        });
        break;
      case "share":
        navigator.clipboard.writeText(window.location.href + `#answer-${answer.id}`);
        toast({
          title: "Link copied",
          description: "Answer link copied to clipboard."
        });
        break;
      case "bookmark":
        toast({
          title: "Answer bookmarked",
          description: "Answer saved to your bookmarks."
        });
        break;
    }
  };

  return (
    <Card className={`${answer.isAccepted ? "border-success" : ""} ${answer.isPinned ? "border-warning" : ""}`}>
      <CardContent className="p-6">
        <div className="flex gap-6">
          {/* Vote Section */}
          <div className="flex flex-col items-center space-y-2 min-w-[60px]">
            <Button
              variant="vote"
              size="icon"
              onClick={() => onVote(answer.id, 'up')}
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
            <span className="text-lg font-semibold">{answer.votes}</span>
            <Button
              variant="vote"
              size="icon"
              onClick={() => onVote(answer.id, 'down')}
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
            
            {/* Action Buttons */}
            {isQuestionAuthor && (
              <Button
                variant={answer.isAccepted ? "default" : "vote"}
                size="icon"
                onClick={() => onAccept(answer.id)}
                className={answer.isAccepted ? "text-success" : ""}
                title={answer.isAccepted ? "Accepted answer" : "Mark as accepted"}
              >
                <Check className={`w-5 h-5 ${answer.isAccepted ? "fill-current" : ""}`} />
              </Button>
            )}
            
            {isQuestionAuthor && (
              <Button
                variant={answer.isPinned ? "default" : "vote"}
                size="icon"
                onClick={() => onPin(answer.id)}
                className={answer.isPinned ? "text-warning" : ""}
                title={answer.isPinned ? "Unpin answer" : "Pin answer"}
              >
                {answer.isPinned ? <PinOff className="w-5 h-5" /> : <Pin className="w-5 h-5" />}
              </Button>
            )}
          </div>

          {/* Answer Content */}
          <div className="flex-1 space-y-4">
            {/* Pinned Badge */}
            {answer.isPinned && (
              <div className="flex items-center gap-2 text-warning text-sm font-medium">
                <Pin className="w-4 h-4" />
                Pinned by question author
              </div>
            )}

            {/* Accepted Badge */}
            {answer.isAccepted && (
              <div className="flex items-center gap-2 text-success text-sm font-medium">
                <Check className="w-4 h-4" />
                Accepted Answer
              </div>
            )}

            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-foreground">
                {answer.content}
              </div>
            </div>

            {/* Answer Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComments(!showComments)}
                  className="text-muted-foreground"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {answer.comments.length} comment{answer.comments.length !== 1 ? 's' : ''}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleAction("share")}>
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction("bookmark")}>
                      Bookmark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction("report")}>
                      Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 bg-accent-light p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{answer.author}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {answer.authorReputation}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  answered {answer.createdAt}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            {showComments && (
              <div className="border-t pt-4 space-y-3">
                {answer.comments.map((comment) => (
                  <div key={comment.id} className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-sm text-foreground">{comment.content}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>{comment.author}</span>
                      <span>•</span>
                      <span>{comment.createdAt}</span>
                    </div>
                  </div>
                ))}
                
                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={2}
                    className="resize-none text-sm"
                  />
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" disabled={!newComment.trim()}>
                      Add Comment
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowComments(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnswerInterface;