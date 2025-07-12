import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowUp, 
  ArrowDown, 
  MessageSquare, 
  Check, 
  ChevronLeft,
  User,
  Calendar,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockQuestion = {
  id: "1",
  title: "How to handle state management in React with TypeScript?",
  content: `I'm working on a large React application with TypeScript and struggling with state management. What are the best practices for managing complex state across multiple components?

I've tried using useState and useContext, but as the application grows, it becomes harder to manage. I'm considering Redux, but I'm not sure if it's overkill for my use case.

Here's a simplified version of what I'm trying to achieve:

\`\`\`typescript
interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// How do I best manage this across multiple components?
\`\`\`

Any recommendations for patterns or libraries that work well with TypeScript?`,
  author: "devuser123",
  authorReputation: 1250,
  tags: ["react", "typescript", "state-management", "hooks"],
  votes: 15,
  views: 247,
  createdAt: "2 hours ago",
  answers: [
    {
      id: "1",
      content: `For TypeScript React applications, I recommend a combination approach depending on your app's complexity:

**For smaller to medium apps:**
- Use \`useContext\` with \`useReducer\` for global state
- Keep local state with \`useState\` for component-specific data

**For larger apps:**
- Consider Zustand - it's lightweight and TypeScript-friendly
- Redux Toolkit if you need time-travel debugging and complex state logic

Here's a simple example with Zustand:

\`\`\`typescript
import { create } from 'zustand'

interface UserStore {
  user: User | null
  isLoading: boolean
  error: string | null
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}))
\`\`\`

This gives you excellent TypeScript support and is much simpler than Redux for most use cases.`,
      author: "reactpro",
      authorReputation: 3420,
      votes: 8,
      isAccepted: true,
      createdAt: "1 hour ago"
    },
    {
      id: "2",
      content: `I'd also recommend looking into **TanStack Query** (formerly React Query) for server state management. It pairs really well with any client state solution.

For client state, if you want something even simpler than Zustand, check out **Valtio**. It uses proxies to make state mutations feel more natural:

\`\`\`typescript
import { proxy } from 'valtio'

const state = proxy<UserState>({
  user: null,
  isLoading: false,
  error: null
})

// Just mutate directly!
state.user = newUser
state.isLoading = false
\`\`\`

The key is to separate server state (data from APIs) from client state (UI state, form data, etc.).`,
      author: "statemaster",
      authorReputation: 2100,
      votes: 3,
      isAccepted: false,
      createdAt: "30 minutes ago"
    }
  ]
};

const QuestionDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [newAnswer, setNewAnswer] = useState("");
  const [questionVotes, setQuestionVotes] = useState(mockQuestion.votes);
  const [answerVotes, setAnswerVotes] = useState<Record<string, number>>(
    mockQuestion.answers.reduce((acc, answer) => ({
      ...acc,
      [answer.id]: answer.votes
    }), {})
  );

  const handleVote = (type: 'question' | 'answer', targetId: string, direction: 'up' | 'down') => {
    if (type === 'question') {
      setQuestionVotes(prev => direction === 'up' ? prev + 1 : prev - 1);
    } else {
      setAnswerVotes(prev => ({
        ...prev,
        [targetId]: direction === 'up' ? prev[targetId] + 1 : prev[targetId] - 1
      }));
    }
    
    toast({
      title: "Vote recorded",
      description: `Your ${direction}vote has been recorded.`
    });
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    toast({
      title: "Answer posted!",
      description: "Your answer has been added to the question."
    });
    setNewAnswer("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Navigation */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Questions
      </Link>

      {/* Question */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Vote Section */}
            <div className="flex flex-col items-center space-y-2 min-w-[60px]">
              <Button
                variant="vote"
                size="icon"
                onClick={() => handleVote('question', mockQuestion.id, 'up')}
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
              <span className="text-lg font-semibold">{questionVotes}</span>
              <Button
                variant="vote"
                size="icon"
                onClick={() => handleVote('question', mockQuestion.id, 'down')}
              >
                <ArrowDown className="w-5 h-5" />
              </Button>
            </div>

            {/* Question Content */}
            <div className="flex-1 space-y-4">
              <h1 className="text-2xl font-bold">{mockQuestion.title}</h1>
              
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-foreground">
                  {mockQuestion.content}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {mockQuestion.tags.map((tag) => (
                  <Button key={tag} variant="tag" size="sm">
                    {tag}
                  </Button>
                ))}
              </div>

              {/* Question Meta */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {mockQuestion.answers.length} answers
                  </span>
                  <span>{mockQuestion.views} views</span>
                </div>
                
                <div className="flex items-center gap-3 bg-accent-light p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{mockQuestion.author}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {mockQuestion.authorReputation}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    asked {mockQuestion.createdAt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answers */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {mockQuestion.answers.length} Answer{mockQuestion.answers.length !== 1 ? 's' : ''}
        </h2>

        {mockQuestion.answers.map((answer) => (
          <Card key={answer.id} className={answer.isAccepted ? "border-success" : ""}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Vote Section */}
                <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                  <Button
                    variant="vote"
                    size="icon"
                    onClick={() => handleVote('answer', answer.id, 'up')}
                  >
                    <ArrowUp className="w-5 h-5" />
                  </Button>
                  <span className="text-lg font-semibold">{answerVotes[answer.id]}</span>
                  <Button
                    variant="vote"
                    size="icon"
                    onClick={() => handleVote('answer', answer.id, 'down')}
                  >
                    <ArrowDown className="w-5 h-5" />
                  </Button>
                  {answer.isAccepted && (
                    <div className="text-success" title="Accepted Answer">
                      <Check className="w-6 h-6 fill-current" />
                    </div>
                  )}
                </div>

                {/* Answer Content */}
                <div className="flex-1 space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-foreground">
                      {answer.content}
                    </div>
                  </div>

                  {/* Answer Meta */}
                  <div className="flex justify-end">
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Answer Form */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Answer</h3>
          <form onSubmit={handleSubmitAnswer} className="space-y-4">
            <Textarea
              placeholder="Share your knowledge and help the community by providing a detailed answer..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              rows={8}
              className="resize-none"
            />
            <div className="flex gap-3">
              <Button type="submit" disabled={!newAnswer.trim()}>
                Post Answer
              </Button>
              <Button type="button" variant="outline">
                Preview
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionDetailPage;