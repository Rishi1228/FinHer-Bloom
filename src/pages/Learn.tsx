import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, PlayCircle, Clock, Award, ChevronRight, CheckCircle, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    category: "basics",
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
    category: "schemes",
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
    category: "investing",
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
    category: "tax",
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
    category: "business",
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
    category: "investing",
  },
];

const getLevelColor = (level: string) => {
  const colors: Record<string, string> = {
    Beginner: "bg-teal-100 text-teal-800",
    Intermediate: "bg-secondary text-secondary-foreground",
    Advanced: "bg-accent text-accent-foreground",
  };
  return colors[level] || "bg-muted text-muted-foreground";
};

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 gradient-warm">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="badge-lavender inline-block mb-4">Financial Education</span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Learn Smart <span className="text-gradient">Money Skills</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Bite-sized courses designed for women. From budgeting to investing, 
              master your finances at your own pace.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 sm:py-8 border-b border-border">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold">50+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Courses</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary flex items-center justify-center">
                <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold">200+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Video Lessons</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent flex items-center justify-center">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold">10K+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Certificates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Learning Section */}
      {inProgressCourses.length > 0 && (
        <section className="py-8 sm:py-12 bg-muted/30">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Continue Learning</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inProgressCourses.map((course) => (
                <Link key={course.id} to={`/courses/${course.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-4 flex items-center gap-4"
                  >
                    <div className="text-3xl sm:text-4xl">{course.image}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{course.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={course.progress} className="h-2 flex-1" />
                        <span className="text-xs sm:text-sm font-medium text-primary">{course.progress}%</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search & Filters */}
      <section className="py-6 sm:py-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="basics">Basics</SelectItem>
                  <SelectItem value="schemes">Schemes</SelectItem>
                  <SelectItem value="investing">Investing</SelectItem>
                  <SelectItem value="tax">Tax</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-12 sm:pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold">
              {searchQuery || levelFilter !== "all" || categoryFilter !== "all" 
                ? `${filteredCourses.length} Courses Found` 
                : "Featured Courses"}
            </h2>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No courses found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery("");
                  setLevelFilter("all");
                  setCategoryFilter("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/courses/${course.id}`} className="block h-full">
                    <div className="glass-card-hover p-4 sm:p-6 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="text-3xl sm:text-4xl">{course.image}</div>
                        <Badge className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <PlayCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          {course.lessons} lessons
                        </div>
                      </div>

                      {course.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}

                      <Button
                        className={`w-full ${course.progress > 0 ? "btn-primary-glow" : ""}`}
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
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Learn;
