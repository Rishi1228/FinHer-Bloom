import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, PlayCircle, Clock, Award, ChevronLeft, CheckCircle, Loader2, ExternalLink,
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
import { useCourseById, useCourseModules, useCourseLessons, CourseLesson } from "@/hooks/useCourses";

const getLevelColor = (level: string) => {
  const colors: Record<string, string> = {
    Beginner: "bg-teal-100 text-teal-800",
    Intermediate: "bg-secondary text-secondary-foreground",
    Advanced: "bg-accent text-accent-foreground",
  };
  return colors[level] || "bg-muted text-muted-foreground";
};

const getCourseEmoji = (category: string) => {
  const emojis: Record<string, string> = {
    Basics: "💰", Investment: "📈", Schemes: "🏛️",
    Taxation: "📋", Business: "🏪", Digital: "📱",
  };
  return emojis[category] || "📚";
};

const getYouTubeEmbedUrl = (url: string | null) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: course, isLoading: courseLoading } = useCourseById(courseId);
  const { data: modules = [] } = useCourseModules(course?.id);
  const moduleIds = useMemo(() => modules.map(m => m.id), [modules]);
  const { data: lessons = [] } = useCourseLessons(moduleIds);

  const [currentLesson, setCurrentLesson] = useState<CourseLesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // Set first lesson when data loads
  useEffect(() => {
    if (lessons.length > 0 && !currentLesson) {
      setCurrentLesson(lessons[0]);
    }
  }, [lessons, currentLesson]);

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold mb-2">Course not found</h2>
            <Link to="/learn"><Button>Back to Courses</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalLessons = lessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons.size / totalLessons) * 100) : 0;
  const embedUrl = getYouTubeEmbedUrl(currentLesson?.video_url || course.video_url);

  const handleLessonClick = (lesson: CourseLesson) => {
    setCurrentLesson(lesson);
  };

  const markComplete = () => {
    if (currentLesson) {
      setCompletedLessons(prev => new Set([...prev, currentLesson.id]));
      toast({
        title: "Lesson completed! 🎉",
        description: `You've completed "${currentLesson.title}"`,
      });

      // Find next lesson
      const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
      const nextLesson = lessons.find((l, i) => i > currentIndex && !completedLessons.has(l.id));
      if (nextLesson) setCurrentLesson(nextLesson);
    }
  };

  const getLessonsForModule = (moduleId: string) => lessons.filter(l => l.module_id === moduleId);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main className="pt-20 sm:pt-28 pb-12 sm:pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                {embedUrl ? (
                  <div className="aspect-video">
                    <iframe
                      src={embedUrl}
                      title={currentLesson?.title || course.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{getCourseEmoji(course.category)}</div>
                      <p className="text-lg font-medium">{currentLesson?.title || course.title}</p>
                      <p className="text-sm text-muted-foreground mt-2">Video coming soon</p>
                    </div>
                  </div>
                )}

                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="font-serif text-xl font-semibold">
                        {currentLesson?.title || course.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Duration: {currentLesson?.duration || course.duration}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {currentLesson?.video_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={currentLesson.video_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            YouTube
                          </a>
                        </Button>
                      )}
                      <Button
                        onClick={markComplete}
                        disabled={!currentLesson || completedLessons.has(currentLesson.id)}
                        className="btn-primary-glow"
                      >
                        {currentLesson && completedLessons.has(currentLesson.id) ? (
                          <><CheckCircle className="w-4 h-4 mr-2" />Completed</>
                        ) : "Mark as Complete"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Description */}
              <Card className="glass-card p-4 sm:p-6">
                <h3 className="font-serif text-lg font-semibold mb-3">About This Course</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{course.description}</p>
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>{course.lessons_count} lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
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

              <Card className="glass-card p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{getCourseEmoji(course.category)}</div>
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
                    {course.lessons_count} lessons
                  </div>
                </div>
              </Card>

              {/* Modules List */}
              <Card className="glass-card overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-serif font-semibold">Course Content</h3>
                </div>
                {modules.length === 0 ? (
                  <div className="p-4 text-sm text-muted-foreground text-center">
                    No modules yet
                  </div>
                ) : (
                  <Accordion type="multiple" defaultValue={[modules[0]?.id]} className="w-full">
                    {modules.map((module) => {
                      const moduleLessons = getLessonsForModule(module.id);
                      const moduleCompleted = moduleLessons.length > 0 && moduleLessons.every(l => completedLessons.has(l.id));
                      const moduleLessonsCompleted = moduleLessons.filter(l => completedLessons.has(l.id)).length;

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
                                  {moduleLessonsCompleted}/{moduleLessons.length} lessons
                                </p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-0">
                            {moduleLessons.map((lesson) => {
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
                )}
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
