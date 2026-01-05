import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  MessageSquare,
  FileCheck,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface SchemeApplication {
  id: string;
  scheme_id: string;
  scheme_name: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface ChatConversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

const statusColors: Record<string, string> = {
  interested: "bg-secondary text-secondary-foreground",
  documents_ready: "bg-accent text-accent-foreground",
  applied: "bg-primary/20 text-primary",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-destructive/20 text-destructive",
};

const statusIcons: Record<string, React.ReactNode> = {
  interested: <Clock className="h-4 w-4" />,
  documents_ready: <FileCheck className="h-4 w-4" />,
  applied: <Clock className="h-4 w-4" />,
  approved: <CheckCircle className="h-4 w-4" />,
  rejected: <XCircle className="h-4 w-4" />,
};

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applications, setApplications] = useState<SchemeApplication[]>([]);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [applicationsRes, conversationsRes] = await Promise.all([
        supabase
          .from("scheme_applications")
          .select("*")
          .order("updated_at", { ascending: false }),
        supabase
          .from("chat_conversations")
          .select("*")
          .order("updated_at", { ascending: false })
          .limit(5),
      ]);

      if (applicationsRes.data) setApplications(applicationsRes.data);
      if (conversationsRes.data) setConversations(conversationsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const deleteApplication = async (id: string) => {
    const { error } = await supabase
      .from("scheme_applications")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete application.",
      });
    } else {
      setApplications((prev) => prev.filter((app) => app.id !== id));
      toast({
        title: "Deleted",
        description: "Application removed from your tracking list.",
      });
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="pt-20 sm:pt-28 pb-12 sm:pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-8"
          >
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">
              Welcome back, {user.user_metadata?.full_name || "there"}! 👋
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Track your scheme applications and access your saved conversations.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 md:mb-8">
            <Card className="glass-card">
              <CardContent className="p-3 sm:pt-6 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:gap-4 text-center sm:text-left">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 sm:mb-0">
                    <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">{applications.length}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Tracked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-3 sm:pt-6 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:gap-4 text-center sm:text-left">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary flex items-center justify-center mb-2 sm:mb-0">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">{conversations.length}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Chats</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-3 sm:pt-6 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:gap-4 text-center sm:text-left">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent flex items-center justify-center mb-2 sm:mb-0">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">
                      {applications.filter((a) => a.status === "approved").length}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Approved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="applications" className="space-y-4 sm:space-y-6">
            <TabsList className="bg-muted/50 w-full sm:w-auto grid grid-cols-2 sm:inline-flex">
              <TabsTrigger value="applications" className="text-xs sm:text-sm">My Applications</TabsTrigger>
              <TabsTrigger value="conversations" className="text-xs sm:text-sm">Chat History</TabsTrigger>
            </TabsList>

            <TabsContent value="applications">
              <Card className="glass-card overflow-hidden">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">Scheme Applications</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Track your progress on different government schemes
                    </CardDescription>
                  </div>
                  <Button asChild size="sm" className="w-full sm:w-auto">
                    <Link to="/schemes">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Scheme
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {loadingData ? (
                    <div className="text-center py-6 sm:py-8 text-muted-foreground text-sm">
                      Loading...
                    </div>
                  ) : applications.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                      <FileCheck className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground/50 mb-3 sm:mb-4" />
                      <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                        You haven't tracked any schemes yet
                      </p>
                      <Button asChild size="sm">
                        <Link to="/schemes">Explore Schemes</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {applications.map((app) => (
                        <div
                          key={app.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors gap-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <div className="flex items-center gap-2">
                              {statusIcons[app.status]}
                              <Badge className={`${statusColors[app.status]} text-xs sm:text-sm`}>
                                {app.status.replace("_", " ")}
                              </Badge>
                            </div>
                            <div>
                              <Link
                                to={`/schemes/${app.scheme_id}`}
                                className="font-medium text-sm sm:text-base hover:text-primary transition-colors line-clamp-1"
                              >
                                {app.scheme_name}
                              </Link>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                Updated{" "}
                                {new Date(app.updated_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 self-end sm:self-auto">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => deleteApplication(app.id)}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <Link to={`/schemes/${app.scheme_id}`}>
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversations">
              <Card className="glass-card overflow-hidden">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">Recent Conversations</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Your chat history with Saheli, your scheme assistant
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {loadingData ? (
                    <div className="text-center py-6 sm:py-8 text-muted-foreground text-sm">
                      Loading...
                    </div>
                  ) : conversations.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                      <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground/50 mb-3 sm:mb-4" />
                      <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                        No conversations yet. Start chatting with Saheli!
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Click the chat button in the bottom right corner
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {conversations.map((conv) => (
                        <div
                          key={conv.id}
                          className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-sm sm:text-base truncate">{conv.title}</p>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                {new Date(conv.updated_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
