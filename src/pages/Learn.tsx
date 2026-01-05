import { motion } from "framer-motion";
import { BookOpen, PlayCircle, Clock, Award, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const courses = [
  {
    id: "budgeting-basics",
    title: "Budgeting Basics",
    description: "Learn how to create and stick to a monthly budget that works for your lifestyle.",
    duration: "45 mins",
    lessons: 6,
    level: "Beginner",
    progress: 0,
    image: "💰",
  },
  {
    id: "savings-schemes",
    title: "Understanding Government Schemes",
    description: "Deep dive into government savings schemes and how to maximize your benefits.",
    duration: "1.5 hours",
    lessons: 10,
    level: "Beginner",
    progress: 60,
    image: "🏛️",
  },
  {
    id: "investing-101",
    title: "Investing 101",
    description: "Start your investment journey with mutual funds, SIPs, and stock basics.",
    duration: "2 hours",
    lessons: 12,
    level: "Intermediate",
    progress: 25,
    image: "📈",
  },
  {
    id: "tax-planning",
    title: "Tax Planning for Women",
    description: "Understand tax-saving instruments and plan your taxes efficiently.",
    duration: "1 hour",
    lessons: 8,
    level: "Intermediate",
    progress: 0,
    image: "📋",
  },
  {
    id: "business-finance",
    title: "Business Finance Essentials",
    description: "Financial management skills for women entrepreneurs and small business owners.",
    duration: "2.5 hours",
    lessons: 15,
    level: "Advanced",
    progress: 0,
    image: "🏪",
  },
  {
    id: "retirement-planning",
    title: "Retirement Planning",
    description: "Plan for a secure retirement with pension schemes and long-term investments.",
    duration: "1.5 hours",
    lessons: 9,
    level: "Intermediate",
    progress: 0,
    image: "🌅",
  },
];

const getLevelColor = (level: string) => {
  const colors: Record<string, string> = {
    Beginner: "badge-teal",
    Intermediate: "badge-lavender",
    Advanced: "badge-peach",
  };
  return colors[level] || "bg-muted text-muted-foreground";
};

const Learn = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-warm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="badge-lavender inline-block mb-4">Financial Education</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Learn Smart <span className="text-gradient">Money Skills</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Bite-sized courses designed for women. From budgeting to investing, 
              master your finances at your own pace.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold">50+</p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold">200+</p>
                <p className="text-sm text-muted-foreground">Video Lessons</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Award className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold">10K+</p>
                <p className="text-sm text-muted-foreground">Certificates Earned</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Featured Courses</h2>
            <Button variant="ghost" className="gap-2">
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{course.image}</div>
                  <span className={`${getLevelColor(course.level)} px-3 py-1 rounded-full text-xs font-medium`}>
                    {course.level}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{course.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <PlayCircle className="w-4 h-4" />
                    {course.lessons} lessons
                  </div>
                </div>

                {course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}

                <Button
                  className={course.progress > 0 ? "btn-primary-glow" : ""}
                  variant={course.progress > 0 ? "default" : "outline"}
                >
                  {course.progress > 0 ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Continue Learning
                    </>
                  ) : (
                    "Start Course"
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Learn;
