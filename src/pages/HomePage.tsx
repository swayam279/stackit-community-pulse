import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionCard from "@/components/questions/QuestionCard";
import { TrendingUp, Clock, Star } from "lucide-react";

// Mock data for demonstration
const mockQuestions = [
  {
    id: "1",
    title: "How to handle state management in React with TypeScript?",
    content: "I'm working on a large React application with TypeScript and struggling with state management. What are the best practices for managing complex state across multiple components?",
    author: "devuser123",
    tags: ["react", "typescript", "state-management", "hooks"],
    votes: 15,
    answers: 3,
    views: 247,
    createdAt: "2 hours ago"
  },
  {
    id: "2",
    title: "Best practices for API error handling in Node.js",
    content: "What's the recommended approach for handling different types of API errors in a Node.js Express application? Looking for patterns that scale well.",
    author: "backendpro",
    tags: ["nodejs", "express", "error-handling", "api"],
    votes: 8,
    answers: 1,
    views: 156,
    createdAt: "4 hours ago"
  },
  {
    id: "3",
    title: "CSS Grid vs Flexbox: When to use which?",
    content: "I'm confused about when to use CSS Grid and when to use Flexbox. Can someone explain the key differences and provide examples of when each is most appropriate?",
    author: "csslearner",
    tags: ["css", "grid", "flexbox", "layout"],
    votes: 23,
    answers: 5,
    views: 412,
    createdAt: "6 hours ago"
  },
  {
    id: "4",
    title: "Database indexing strategies for large datasets",
    content: "Working with a PostgreSQL database that has millions of records. What are effective indexing strategies to optimize query performance?",
    author: "dbadmin2024",
    tags: ["postgresql", "database", "indexing", "performance"],
    votes: 12,
    answers: 2,
    views: 298,
    createdAt: "8 hours ago"
  }
];

const HomePage = () => {
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-light to-accent-light rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to StackIt
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          A community-driven platform for developers to ask questions and share knowledge
        </p>
        <Button size="lg" variant="default">
          Ask Your First Question
        </Button>
      </div>

      {/* Sort Tabs */}
      <Tabs value={sortBy} onValueChange={setSortBy} className="w-full">
        <div className="flex justify-between items-center">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="newest" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Newest
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trending
            </TabsTrigger>
          </TabsList>

          <div className="text-sm text-muted-foreground">
            {mockQuestions.length} questions
          </div>
        </div>

        <TabsContent value="newest" className="space-y-4 mt-6">
          {mockQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4 mt-6">
          {mockQuestions
            .sort((a, b) => b.votes - a.votes)
            .map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default HomePage;