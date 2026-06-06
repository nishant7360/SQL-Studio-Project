import { Link } from "react-router-dom";
import { useGetAllQuestions } from "@/features/Questions/useGetAllQuestions";
import { useGetMe } from "@/features/auth/useGetMe";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Database,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Circle,
} from "lucide-react";
import { useEffect } from "react";

const difficultyConfig = {
  Easy: "text-green-500",
  Medium: "text-yellow-500",
  Hard: "text-red-500",
};

const difficultyBadge = {
  Easy: "text-green-500 bg-green-950 border-green-800",
  Medium: "text-yellow-500 bg-yellow-950 border-yellow-800",
  Hard: "text-red-500 bg-red-950 border-red-800",
};

function Home() {
  const { questions } = useGetAllQuestions();
  const { user, isAuthenticated } = useGetMe();

  useEffect(() => {
    document.title = "Home | SQL Studio";
  }, []);

  const previewQuestions = questions?.slice(0, 4) ?? [];

  return (
    <div className="min-h-full" style={{ backgroundColor: "#18181b" }}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-zinc-500 border border-zinc-800 rounded-full px-3 py-1 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          Practice SQL with AI-powered hints
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4 leading-tight">
          Master SQL by doing
        </h1>
        <p className="text-base text-zinc-500 max-w-xl mx-auto mb-8 leading-relaxed">
          Practice real SQL challenges, get progressive AI hints, and track your
          progress — all in one place.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/questionset">
            <Button className="h-9 px-5 text-sm gap-2">
              Start Practicing <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          {!isAuthenticated && (
            <Link to="/signup">
              <Button
                variant="outline"
                className="h-9 px-5 text-sm border-zinc-700 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800"
              >
                Sign up free
              </Button>
            </Link>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-lg font-semibold text-zinc-100 mb-6">
          Everything you need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Brain className="w-5 h-5 text-purple-400" />,
              title: "AI Hints",
              desc: "Stuck? Get progressive hints without spoiling the answer. Powered by Groq AI.",
            },
            {
              icon: <Database className="w-5 h-5 text-blue-400" />,
              title: "Real Queries",
              desc: "Write and execute real SQL against live PostgreSQL databases instantly.",
            },
            {
              icon: <BarChart3 className="w-5 h-5 text-green-400" />,
              title: "Track Progress",
              desc: "See which questions you've solved and attempted with visual indicators.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-zinc-800 p-5"
              style={{ backgroundColor: "#27272a" }}
            >
              <div className="mb-3">{f.icon}</div>
              <h3 className="text-sm font-medium text-zinc-100 mb-1.5">
                {f.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-lg font-semibold text-zinc-100 mb-6">
          How it works
        </h2>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {[
            {
              step: "1",
              title: "Pick a question",
              desc: "Browse questions by difficulty — Easy, Medium, or Hard.",
            },
            {
              step: "2",
              title: "Write SQL",
              desc: "Use the Monaco editor to write your SQL query.",
            },
            {
              step: "3",
              title: "Get feedback",
              desc: "Run your query and instantly see if it's correct.",
            },
          ].map((s, i) => (
            <div key={s.step} className="flex items-start gap-3 flex-1">
              <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-zinc-300">
                  {s.step}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-zinc-100 mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              {i < 2 && (
                <ArrowRight className="w-4 h-4 text-zinc-700 shrink-0 mt-1.5 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-zinc-100">Questions</h2>
          <Link
            to="/questionset"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
          >
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div
          className="rounded-lg border border-zinc-800 overflow-hidden"
          style={{ backgroundColor: "#27272a" }}
        >
          {previewQuestions.map((q, i) => {
            const attempt = user?.totalQuestionAttempted?.find(
              (a) => a.questionId?.toString() === q._id?.toString(),
            );
            const status = !attempt
              ? "none"
              : attempt.isCorrect
                ? "solved"
                : "attempted";

            return (
              <Link
                to={`/questionset/${q._id}`}
                key={q._id}
                className={`flex items-center justify-between px-5 py-3 hover:bg-zinc-800/60 transition-colors ${i !== previewQuestions.length - 1 ? "border-b border-zinc-800" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 text-xs w-4">{i + 1}.</span>
                  {status === "solved" && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  )}
                  {status === "attempted" && (
                    <CircleDot className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                  )}
                  {status === "none" && (
                    <Circle className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                  )}
                  <span className="text-sm text-zinc-100">{q.title}</span>
                </div>
                <span
                  className={`text-xs font-medium ${difficultyConfig[q.description] ?? "text-zinc-400"}`}
                >
                  {q.description}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
