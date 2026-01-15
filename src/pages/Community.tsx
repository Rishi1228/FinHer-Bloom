import { motion } from "framer-motion";
import { MessageCircle, Users, Heart, Star, Calendar, ChevronRight, Send, Search, Loader2, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDiscussions, useDiscussionCategories, useDiscussionReplyCounts } from "@/hooks/useCommunity";
import { formatDistanceToNow } from "date-fns";

const upcomingEvents = [
  {
    id: 1,
    title: "Live Q&A: Tax Planning",
    date: "Jan 10, 2025",
    time: "6:00 PM",
    host: "CA Sunita Sharma",
    attendees: 234,
  },
  {
    id: 2,
    title: "Webinar: Starting Your Business",
    date: "Jan 15, 2025",
    time: "7:00 PM",
    host: "Entrepreneur Neha Gupta",
    attendees: 189,
  },
  {
    id: 3,
    title: "Workshop: Budgeting Basics",
    date: "Jan 20, 2025",
    time: "5:00 PM",
    host: "Finance Coach Priya",
    attendees: 156,
  },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Schemes: "badge-gold",
    "Success Stories": "badge-teal",
    Entrepreneurship: "badge-peach",
    Investing: "badge-lavender",
    Investment: "badge-lavender",
    Savings: "badge-lavender",
    Banking: "bg-secondary text-secondary-foreground",
    Maternity: "badge-teal",
    Taxation: "bg-muted text-muted-foreground",
    Pension: "badge-gold",
    "Digital Finance": "bg-primary/10 text-primary",
  };
  return colors[category] || "badge-lavender";
};

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newPost, setNewPost] = useState("");

  const { data: discussions = [], isLoading } = useDiscussions();
  const { data: categories = ['All'] } = useDiscussionCategories();
  const { data: replyCounts = {} } = useDiscussionReplyCounts();

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePost = () => {
    if (newPost.trim()) {
      // In a real app, this would submit to the database
      alert("Post submitted! In a real app, this would be saved to the database.");
      setNewPost("");
    }
  };

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return dateString;
    }
  };

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
            <span className="badge-peach inline-block mb-4">Women's Community</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Connect, Share, <span className="text-gradient">Grow</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of women sharing experiences, asking questions, and celebrating wins together.
            </p>

            {/* Quick Post */}
            <div className="flex gap-2 max-w-xl mx-auto">
              <Input
                placeholder="Ask a question or share your experience..."
                className="rounded-xl py-6"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <Button className="btn-primary-glow px-6" onClick={handlePost}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold">50K+</p>
                <p className="text-sm text-muted-foreground">Members</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold">{discussions.length}+</p>
                <p className="text-sm text-muted-foreground">Discussions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Heart className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold">100K+</p>
                <p className="text-sm text-muted-foreground">Helpful Answers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search discussions..."
                className="pl-10 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full ${selectedCategory === category ? "btn-primary-glow" : ""}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Discussions */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold">
                  {selectedCategory === "All" ? "Trending Discussions" : selectedCategory}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredDiscussions.length} discussions
                </span>
              </div>

              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Loading discussions...</span>
                </div>
              )}

              {!isLoading && filteredDiscussions.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No discussions found. Try a different search.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredDiscussions.map((discussion, index) => (
                    <motion.div
                      key={discussion.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link to={`/community/${discussion.id}`}>
                        <div className="glass-card-hover p-5 cursor-pointer">
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-white font-serif font-bold flex-shrink-0">
                              {discussion.author_name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                {discussion.is_pinned && (
                                  <Pin className="w-3 h-3 text-primary" />
                                )}
                                <span className={`${getCategoryColor(discussion.category)} text-xs px-2 py-0.5 rounded-full`}>
                                  {discussion.category}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(discussion.created_at)}
                                </span>
                              </div>
                              <h3 className="font-semibold mb-1 hover:text-primary transition-colors">
                                {discussion.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">by {discussion.author_name}</p>
                              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  {replyCounts[discussion.id] || 0} replies
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  {discussion.likes} likes
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-lg font-semibold">Upcoming Events</h3>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <p className="font-medium mb-1">{event.title}</p>
                      <p className="text-sm text-muted-foreground mb-1">
                        {event.date} at {event.time}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">Hosted by {event.host}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{event.attendees} attending</span>
                        <Button variant="outline" size="sm" className="h-7 text-xs rounded-full">
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 rounded-xl">
                  View All Events
                </Button>
              </div>

              {/* Top Contributors */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-gold" />
                  <h3 className="font-serif text-lg font-semibold">Top Contributors</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Sunita M.", answers: 234 },
                    { name: "Kavita R.", answers: 189 },
                    { name: "Nisha P.", answers: 156 },
                    { name: "Priya K.", answers: 134 },
                    { name: "Meera S.", answers: 112 },
                  ].map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-sm font-bold">
                        {contributor.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{contributor.name}</p>
                        <p className="text-xs text-muted-foreground">{contributor.answers} helpful answers</p>
                      </div>
                      <div className="badge-gold text-xs">#{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="glass-card p-6">
                <h3 className="font-serif text-lg font-semibold mb-3">Community Guidelines</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Be respectful and supportive
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Share genuine experiences
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    No spam or self-promotion
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Protect privacy - yours and others'
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;
