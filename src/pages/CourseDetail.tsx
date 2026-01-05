import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  PlayCircle,
  Clock,
  Award,
  ChevronLeft,
  CheckCircle,
  Lock,
  Play,
  Pause,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

// Course data
const coursesData: Record<string, Course> = {
  "budgeting-basics": {
    id: "budgeting-basics",
    title: "Budgeting Basics",
    description: "Learn how to create and stick to a monthly budget that works for your lifestyle. This comprehensive course covers everything from tracking expenses to setting financial goals.",
    duration: "45 mins",
    lessons: 6,
    level: "Beginner",
    image: "💰",
    instructor: "Priya Sharma",
    rating: 4.8,
    students: 2340,
    modules: [
      {
        id: "m1",
        title: "Introduction to Budgeting",
        lessons: [
          { id: "l1", title: "Why Budgeting Matters", duration: "5 min", completed: false },
          { id: "l2", title: "Understanding Your Income", duration: "7 min", completed: false },
        ],
      },
      {
        id: "m2",
        title: "Tracking Expenses",
        lessons: [
          { id: "l3", title: "Categorizing Your Spending", duration: "8 min", completed: false },
          { id: "l4", title: "Tools for Expense Tracking", duration: "6 min", completed: false },
        ],
      },
      {
        id: "m3",
        title: "Creating Your Budget",
        lessons: [
          { id: "l5", title: "The 50/30/20 Rule", duration: "10 min", completed: false },
          { id: "l6", title: "Sticking to Your Budget", duration: "9 min", completed: false },
        ],
      },
    ],
  },
  "savings-schemes": {
    id: "savings-schemes",
    title: "Understanding Government Schemes",
    description: "Deep dive into government savings schemes and how to maximize your benefits. Learn about PPF, SSY, PMJDY, and more schemes designed for women.",
    duration: "1.5 hours",
    lessons: 10,
    level: "Beginner",
    image: "🏛️",
    instructor: "Anjali Gupta",
    rating: 4.9,
    students: 3560,
    modules: [
      {
        id: "m1",
        title: "Overview of Government Schemes",
        lessons: [
          { id: "l1", title: "Why Government Schemes Matter", duration: "8 min", completed: true },
          { id: "l2", title: "Types of Schemes Available", duration: "10 min", completed: true },
        ],
      },
      {
        id: "m2",
        title: "Savings Schemes for Women",
        lessons: [
          { id: "l3", title: "Sukanya Samriddhi Yojana", duration: "12 min", completed: true },
          { id: "l4", title: "Mahila Samman Savings Certificate", duration: "10 min", completed: false },
          { id: "l5", title: "PM Jan Dhan Yojana", duration: "8 min", completed: false },
        ],
      },
      {
        id: "m3",
        title: "Investment Schemes",
        lessons: [
          { id: "l6", title: "Public Provident Fund (PPF)", duration: "10 min", completed: false },
          { id: "l7", title: "National Savings Certificate", duration: "8 min", completed: false },
          { id: "l8", title: "Senior Citizens Savings Scheme", duration: "9 min", completed: false },
        ],
      },
      {
        id: "m4",
        title: "Application & Documentation",
        lessons: [
          { id: "l9", title: "Required Documents", duration: "7 min", completed: false },
          { id: "l10", title: "Step-by-Step Application Guide", duration: "10 min", completed: false },
        ],
      },
    ],
  },
  "investing-101": {
    id: "investing-101",
    title: "Investing 101",
    description: "Start your investment journey with mutual funds, SIPs, and stock basics. Learn risk management and portfolio diversification.",
    duration: "2 hours",
    lessons: 12,
    level: "Intermediate",
    image: "📈",
    instructor: "Neha Verma",
    rating: 4.7,
    students: 1890,
    modules: [
      {
        id: "m1",
        title: "Investment Fundamentals",
        lessons: [
          { id: "l1", title: "What is Investing?", duration: "8 min", completed: true },
          { id: "l2", title: "Risk vs Return", duration: "10 min", completed: true },
          { id: "l3", title: "Power of Compounding", duration: "8 min", completed: true },
        ],
      },
      {
        id: "m2",
        title: "Mutual Funds",
        lessons: [
          { id: "l4", title: "Types of Mutual Funds", duration: "12 min", completed: false },
          { id: "l5", title: "How to Choose a Fund", duration: "10 min", completed: false },
          { id: "l6", title: "SIP vs Lumpsum", duration: "9 min", completed: false },
        ],
      },
      {
        id: "m3",
        title: "Stock Market Basics",
        lessons: [
          { id: "l7", title: "Understanding Stocks", duration: "10 min", completed: false },
          { id: "l8", title: "How to Read Stock Charts", duration: "12 min", completed: false },
          { id: "l9", title: "Building a Portfolio", duration: "11 min", completed: false },
        ],
      },
      {
        id: "m4",
        title: "Getting Started",
        lessons: [
          { id: "l10", title: "Opening a Demat Account", duration: "8 min", completed: false },
          { id: "l11", title: "Your First Investment", duration: "10 min", completed: false },
          { id: "l12", title: "Common Mistakes to Avoid", duration: "9 min", completed: false },
        ],
      },
    ],
  },
  "tax-planning": {
    id: "tax-planning",
    title: "Tax Planning for Women",
    description: "Understand tax-saving instruments and plan your taxes efficiently. Learn about deductions, exemptions, and smart tax strategies.",
    duration: "1 hour",
    lessons: 8,
    level: "Intermediate",
    image: "📋",
    instructor: "Kavita Mehta",
    rating: 4.6,
    students: 1450,
    modules: [
      {
        id: "m1",
        title: "Tax Basics",
        lessons: [
          { id: "l1", title: "Understanding Income Tax", duration: "8 min", completed: false },
          { id: "l2", title: "Tax Slabs & Rates", duration: "7 min", completed: false },
        ],
      },
      {
        id: "m2",
        title: "Tax Saving Instruments",
        lessons: [
          { id: "l3", title: "Section 80C Deductions", duration: "10 min", completed: false },
          { id: "l4", title: "Health Insurance (80D)", duration: "8 min", completed: false },
          { id: "l5", title: "Home Loan Benefits", duration: "9 min", completed: false },
        ],
      },
      {
        id: "m3",
        title: "Filing Returns",
        lessons: [
          { id: "l6", title: "Documents Required", duration: "6 min", completed: false },
          { id: "l7", title: "Filing ITR Online", duration: "10 min", completed: false },
          { id: "l8", title: "Common Filing Mistakes", duration: "7 min", completed: false },
        ],
      },
    ],
  },
  "business-finance": {
    id: "business-finance",
    title: "Business Finance Essentials",
    description: "Financial management skills for women entrepreneurs and small business owners. Learn accounting, cash flow management, and funding options.",
    duration: "2.5 hours",
    lessons: 15,
    level: "Advanced",
    image: "🏪",
    instructor: "Sunita Reddy",
    rating: 4.8,
    students: 980,
    modules: [
      {
        id: "m1",
        title: "Business Accounting",
        lessons: [
          { id: "l1", title: "Bookkeeping Basics", duration: "10 min", completed: false },
          { id: "l2", title: "Understanding Financial Statements", duration: "12 min", completed: false },
          { id: "l3", title: "Managing Cash Flow", duration: "10 min", completed: false },
        ],
      },
      {
        id: "m2",
        title: "Funding Your Business",
        lessons: [
          { id: "l4", title: "Government Loans for Women", duration: "10 min", completed: false },
          { id: "l5", title: "Bank Loans & Credit", duration: "9 min", completed: false },
          { id: "l6", title: "Angel Investors & VCs", duration: "11 min", completed: false },
          { id: "l7", title: "Crowdfunding Options", duration: "8 min", completed: false },
        ],
      },
      {
        id: "m3",
        title: "Pricing & Profitability",
        lessons: [
          { id: "l8", title: "Cost Analysis", duration: "10 min", completed: false },
          { id: "l9", title: "Pricing Strategies", duration: "9 min", completed: false },
          { id: "l10", title: "Profit Margins", duration: "8 min", completed: false },
        ],
      },
      {
        id: "m4",
        title: "Growth & Scaling",
        lessons: [
          { id: "l11", title: "Financial Planning for Growth", duration: "11 min", completed: false },
          { id: "l12", title: "Managing Business Taxes", duration: "10 min", completed: false },
          { id: "l13", title: "GST for Small Businesses", duration: "12 min", completed: false },
          { id: "l14", title: "Hiring & Payroll", duration: "9 min", completed: false },
          { id: "l15", title: "Exit Strategies", duration: "10 min", completed: false },
        ],
      },
    ],
  },
  "retirement-planning": {
    id: "retirement-planning",
    title: "Retirement Planning",
    description: "Plan for a secure retirement with pension schemes and long-term investments. Learn about NPS, EPF, and building a retirement corpus.",
    duration: "1.5 hours",
    lessons: 9,
    level: "Intermediate",
    image: "🌅",
    instructor: "Rekha Iyer",
    rating: 4.7,
    students: 1230,
    modules: [
      {
        id: "m1",
        title: "Retirement Basics",
        lessons: [
          { id: "l1", title: "Why Start Early", duration: "8 min", completed: false },
          { id: "l2", title: "Calculating Your Retirement Corpus", duration: "10 min", completed: false },
        ],
      },
      {
        id: "m2",
        title: "Pension Schemes",
        lessons: [
          { id: "l3", title: "National Pension System (NPS)", duration: "12 min", completed: false },
          { id: "l4", title: "Employee Provident Fund", duration: "10 min", completed: false },
          { id: "l5", title: "Atal Pension Yojana", duration: "8 min", completed: false },
        ],
      },
      {
        id: "m3",
        title: "Investment Strategies",
        lessons: [
          { id: "l6", title: "Asset Allocation by Age", duration: "10 min", completed: false },
          { id: "l7", title: "Annuity Plans", duration: "9 min", completed: false },
          { id: "l8", title: "Health Insurance in Retirement", duration: "8 min", completed: false },
          { id: "l9", title: "Creating Passive Income", duration: "10 min", completed: false },
        ],
      },
    ],
  },
};

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  level: string;
  image: string;
  instructor: string;
  rating: number;
  students: number;
  modules: Module[];
}

const getLevelColor = (level: string) => {
  const colors: Record<string, string> = {
    Beginner: "bg-teal-100 text-teal-800",
    Intermediate: "bg-secondary text-secondary-foreground",
    Advanced: "bg-accent text-accent-foreground",
  };
  return colors[level] || "bg-muted text-muted-foreground";
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (courseId && coursesData[courseId]) {
      const courseData = coursesData[courseId];
      setCourse(courseData);
      
      // Set initial completed lessons
      const completed = new Set<string>();
      courseData.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          if (lesson.completed) {
            completed.add(lesson.id);
          }
        });
      });
      setCompletedLessons(completed);
      
      // Find first incomplete lesson
      for (const module of courseData.modules) {
        for (const lesson of module.lessons) {
          if (!lesson.completed) {
            setCurrentLesson(lesson);
            return;
          }
        }
      }
      // All completed, set last lesson
      const lastModule = courseData.modules[courseData.modules.length - 1];
      setCurrentLesson(lastModule.lessons[lastModule.lessons.length - 1]);
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Course not found</div>
      </div>
    );
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPercent = Math.round((completedLessons.size / totalLessons) * 100);

  const handleLessonClick = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setIsPlaying(false);
  };

  const markComplete = () => {
    if (currentLesson) {
      setCompletedLessons(prev => new Set([...prev, currentLesson.id]));
      toast({
        title: "Lesson completed! 🎉",
        description: `You've completed "${currentLesson.title}"`,
      });
      
      // Find and set next lesson
      let foundCurrent = false;
      for (const module of course.modules) {
        for (const lesson of module.lessons) {
          if (foundCurrent && !completedLessons.has(lesson.id)) {
            setCurrentLesson(lesson);
            return;
          }
          if (lesson.id === currentLesson.id) {
            foundCurrent = true;
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main className="pt-20 sm:pt-28 pb-12 sm:pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link to="/learn">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Courses
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <Card className="glass-card overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{course.image}</div>
                    {currentLesson && (
                      <p className="text-lg font-medium">{currentLesson.title}</p>
                    )}
                  </div>
                  
                  {/* Play Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {currentLesson?.duration}
                      </span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="font-serif text-xl font-semibold">
                        {currentLesson?.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Duration: {currentLesson?.duration}
                      </p>
                    </div>
                    <Button
                      onClick={markComplete}
                      disabled={currentLesson ? completedLessons.has(currentLesson.id) : true}
                      className="btn-primary-glow"
                    >
                      {currentLesson && completedLessons.has(currentLesson.id) ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        "Mark as Complete"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Course Description */}
              <Card className="glass-card p-4 sm:p-6">
                <h3 className="font-serif text-lg font-semibold mb-3">About This Course</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{course.description}</p>
                
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-primary" />
                    <span>Instructor: {course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span>{course.rating} rating</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar - Course Content */}
            <div className="space-y-4">
              {/* Progress Card */}
              <Card className="glass-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Your Progress</span>
                  <span className="text-sm font-bold text-primary">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  {completedLessons.size} of {totalLessons} lessons completed
                </p>
              </Card>

              {/* Course Info */}
              <Card className="glass-card p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{course.image}</div>
                  <div>
                    <h3 className="font-serif font-semibold line-clamp-1">{course.title}</h3>
                    <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <PlayCircle className="w-4 h-4" />
                    {course.lessons} lessons
                  </div>
                </div>
              </Card>

              {/* Modules List */}
              <Card className="glass-card overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-serif font-semibold">Course Content</h3>
                </div>
                <Accordion type="multiple" defaultValue={[course.modules[0]?.id]} className="w-full">
                  {course.modules.map((module, moduleIndex) => {
                    const moduleCompleted = module.lessons.every(l => completedLessons.has(l.id));
                    const moduleLessonsCompleted = module.lessons.filter(l => completedLessons.has(l.id)).length;
                    
                    return (
                      <AccordionItem key={module.id} value={module.id} className="border-b border-border last:border-0">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                          <div className="flex items-center gap-2 text-left">
                            {moduleCompleted ? (
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                            )}
                            <div>
                              <p className="font-medium text-sm">{module.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {moduleLessonsCompleted}/{module.lessons.length} lessons
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                          {module.lessons.map((lesson) => {
                            const isCompleted = completedLessons.has(lesson.id);
                            const isActive = currentLesson?.id === lesson.id;
                            
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => handleLessonClick(lesson)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors ${
                                  isActive ? "bg-primary/10" : ""
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                ) : isActive ? (
                                  <PlayCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-muted-foreground flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm truncate ${isActive ? "font-medium text-primary" : ""}`}>
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                                </div>
                              </button>
                            );
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
