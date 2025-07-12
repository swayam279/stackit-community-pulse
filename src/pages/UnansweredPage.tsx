import { useState } from "react";
import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/questions/QuestionCard";
import { Star, Filter } from "lucide-react";

// Mock data for unanswered questions
const mockUnansweredQuestions = [
  {
    id: "5",
    title: "How to implement OAuth 2.0 with Refresh Tokens in React?",
    content: "I'm trying to implement secure authentication with OAuth 2.0 in my React application. I need help with handling refresh tokens securely and managing token expiration.",
    author: "securitydev",
    tags: ["react", "oauth", "authentication", "security"],
    votes: 5,
    answers: 0,
    views: 89,
    createdAt: "1 hour ago"
  },
  {
    id: "6", 
    title: "Best practices for handling WebSocket connections in React",
    content: "What are the best practices for managing WebSocket connections in React? Should I use useEffect, custom hooks, or context providers?",
    author: "websocketdev",
    tags: ["react", "websocket", "real-time", "hooks"],
    votes: 3,
    answers: 0,
    views: 45,
    createdAt: "3 hours ago"
  },
  {
    id: "7",
    title: "How to optimize MongoDB queries for large collections?",
    content: "I have a MongoDB collection with over 10 million documents. What are the best indexing strategies and query optimization techniques?",
    author: "mongodev",
    tags: ["mongodb", "performance", "database", "optimization"],
    votes: 8,
    answers: 0,
    views: 167,
    createdAt: "5 hours ago"
  }
];

const UnansweredPage = () => {
  const [sortBy, setSortBy] = useState("newest");

  const sortedQuestions = [...mockUnansweredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "votes":
        return b.votes - a.votes;
      case "views":
        return b.views - a.views;
      default:
        return 0; // newest (already in order)
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-warning/10 p-2 rounded-lg">
            <Star className="w-6 h-6 text-warning" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Unanswered Questions</h1>
            <p className="text-muted-foreground">
              Help the community by answering these questions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-background border border-border rounded-md px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="votes">Most Voted</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-accent-light rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{mockUnansweredQuestions.length}</div>
            <div className="text-sm text-muted-foreground">Unanswered Questions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {mockUnansweredQuestions.reduce((sum, q) => sum + q.votes, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Votes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {mockUnansweredQuestions.reduce((sum, q) => sum + q.views, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {sortedQuestions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No unanswered questions!</h3>
            <p>All questions in the community have been answered.</p>
          </div>
        ) : (
          sortedQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        )}
      </div>

      {/* Call to Action */}
      {sortedQuestions.length > 0 && (
        <div className="bg-gradient-to-r from-primary-light to-accent-light rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Ready to help?</h3>
          <p className="text-muted-foreground mb-4">
            Share your knowledge and help fellow developers solve their problems
          </p>
          <Button variant="default">
            Browse All Questions
          </Button>
        </div>
      )}
    </div>
  );
};

export default UnansweredPage;