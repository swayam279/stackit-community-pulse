import { ArrowUp, ArrowDown, MessageSquare, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Question {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  createdAt: string;
}

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Vote/Stats Section */}
          <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground min-w-[80px]">
            <div className="flex flex-col items-center">
              <span className="font-semibold text-foreground">{question.votes}</span>
              <span>votes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={`font-semibold ${question.answers > 0 ? 'text-success' : 'text-foreground'}`}>
                {question.answers}
              </span>
              <span>answers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-foreground">{question.views}</span>
              <span>views</span>
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1">
            <div className="space-y-3">
              <Link 
                to={`/questions/${question.id}`}
                className="block hover:text-primary transition-colors"
              >
                <h3 className="text-lg font-semibold leading-tight">
                  {question.title}
                </h3>
              </Link>

              <p className="text-muted-foreground line-clamp-2">
                {question.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <Button key={tag} variant="tag" size="sm">
                    {tag}
                  </Button>
                ))}
              </div>

              {/* Author and Date */}
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>
                  asked by <span className="text-primary font-medium">{question.author}</span>
                </span>
                <span>{question.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;