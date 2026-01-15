import { motion } from "framer-motion";
import { Clock, Heart, MessageCircle, BookOpen, ChevronRight, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlogs, useBlogCategories, Blog } from "@/hooks/useBlogs";
import { format } from "date-fns";

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Personal Finance": "badge-lavender",
    "Savings": "badge-lavender",
    Schemes: "badge-gold",
    Entrepreneurship: "badge-peach",
    Investment: "badge-teal",
    Investing: "badge-teal",
    "Family Finance": "bg-primary/10 text-primary",
    "Financial Literacy": "bg-secondary text-secondary-foreground",
    Insurance: "bg-teal/10 text-teal",
    Maternity: "badge-teal",
    Pension: "badge-gold",
  };
  return colors[category] || "bg-muted text-muted-foreground";
};

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'MMM d, yyyy');
  } catch {
    return dateString;
  }
};

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: blogs = [], isLoading } = useBlogs();
  const { data: categories = ['All'] } = useBlogCategories();

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlogs = filteredBlogs.filter((b) => b.featured);
  const regularBlogs = filteredBlogs.filter((b) => !b.featured);

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
            <span className="badge-teal inline-block mb-4">Stories & Insights</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Real Stories, <span className="text-gradient">Real Impact</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Read experiences from women like you. Learn from their journeys, tips, and success stories.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-2xl border-2 border-border focus:border-primary text-base"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
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
      </section>

      {/* Loading State */}
      {isLoading && (
        <section className="py-16">
          <div className="container mx-auto px-4 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading articles...</span>
          </div>
        </section>
      )}

      {/* Featured Articles */}
      {!isLoading && featuredBlogs.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold mb-8">Featured Stories</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/blogs/${blog.slug}`}>
                    <div className="glass-card-hover p-6 flex flex-col h-full">
                      {blog.image_url && (
                        <div className="mb-4 rounded-xl overflow-hidden aspect-video">
                          <img 
                            src={blog.image_url} 
                            alt={blog.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`${getCategoryColor(blog.category)} px-3 py-1 rounded-full text-xs font-medium`}>
                          {blog.category}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl font-semibold mb-3 hover:text-primary cursor-pointer transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{blog.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-white font-bold">
                            {blog.author_name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{blog.author_name}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(blog.created_at)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {blog.read_time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      {!isLoading && (
        <section className="py-8 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold">All Stories</h2>
              <Button variant="ghost" className="gap-2">
                Write a Story <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/blogs/${blog.slug}`}>
                    <div className="glass-card-hover p-5 h-full">
                      {blog.image_url && (
                        <div className="mb-3 rounded-lg overflow-hidden aspect-video">
                          <img 
                            src={blog.image_url} 
                            alt={blog.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`${getCategoryColor(blog.category)} px-2 py-0.5 rounded-full text-xs font-medium`}>
                          {blog.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{formatDate(blog.created_at)}</span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold mb-2 hover:text-primary cursor-pointer transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-sm font-bold">
                            {blog.author_name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium">{blog.author_name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {blog.read_time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No stories found. Try a different search.</p>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Blogs;
