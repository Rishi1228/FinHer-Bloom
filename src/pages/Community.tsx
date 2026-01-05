import { motion } from "framer-motion";
import { MessageCircle, Users, Heart, Star, Calendar, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const discussions = [
  {
    id: 1,
    title: "Best savings schemes for new mothers?",
    author: "Meera S.",
    avatar: "M",
    replies: 23,
    likes: 45,
    time: "2 hours ago",
    category: "Schemes",
  },
  {
    id: 2,
    title: "How I saved ₹5 lakh in 2 years - My Journey",
    author: "Priya K.",
    avatar: "P",
    replies: 89,
    likes: 234,
    time: "5 hours ago",
    category: "Success Stories",
  },
  {
    id: 3,
    title: "Mudra Yojana application tips for first-timers",
    author: "Anita D.",
    avatar: "A",
    replies: 34,
    likes: 78,
    time: "1 day ago",
    category: "Entrepreneurship",
  },
  {
    id: 4,
    title: "Investment advice for single mothers",
    author: "Fatima R.",
    avatar: "F",
    replies: 56,
    likes: 123,
    time: "2 days ago",
    category: "Investing",
  },
];

const upcomingEvents = [
  {
    title: "Live Q&A: Tax Planning",
    date: "Jan 10, 2025",
    time: "6:00 PM",
    host: "CA Sunita Sharma",
  },
  {
    title: "Webinar: Starting Your Business",
    date: "Jan 15, 2025",
    time: "7:00 PM",
    host: "Entrepreneur Neha Gupta",
  },
];

const Community = () => {
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
              />
              <Button className="btn-primary-glow px-6">
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
                <p className="font-serif text-2xl font-bold">10K+</p>
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

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Discussions */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold">Trending Discussions</h2>
                <Button variant="ghost" className="gap-2">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {discussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card-hover p-5"
                  >
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-white font-serif font-bold flex-shrink-0">
                        {discussion.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="badge-lavender text-xs">{discussion.category}</span>
                          <span className="text-xs text-muted-foreground">{discussion.time}</span>
                        </div>
                        <h3 className="font-semibold mb-1 hover:text-primary cursor-pointer transition-colors">
                          {discussion.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">by {discussion.author}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {discussion.replies} replies
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {discussion.likes} likes
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <p className="font-medium mb-1">{event.title}</p>
                      <p className="text-sm text-muted-foreground mb-1">
                        {event.date} at {event.time}
                      </p>
                      <p className="text-xs text-muted-foreground">Hosted by {event.host}</p>
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
                  {["Sunita M.", "Kavita R.", "Nisha P."].map((name, index) => (
                    <div key={name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-sm font-bold">
                        {name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">{234 - index * 50} helpful answers</p>
                      </div>
                      <div className="badge-gold text-xs">#{index + 1}</div>
                    </div>
                  ))}
                </div>
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
