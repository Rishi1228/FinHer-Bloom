import { motion } from "framer-motion";
import { Clock, Heart, MessageCircle, ArrowLeft, Share2, Bookmark, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useBlogBySlug, useBlogComments } from "@/hooks/useBlogs";
import { format } from "date-fns";

const BlogDetail = () => {
  const { blogId } = useParams();
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const { data: blog, isLoading } = useBlogBySlug(blogId);
  const { data: dbComments = [] } = useBlogComments(blog?.id);

  const [localComments, setLocalComments] = useState<Array<{
    id: string; author: string; avatar: string; content: string; time: string; likes: number;
  }>>([]);

  const allComments = [
    ...localComments,
    ...dbComments.map(c => ({
      id: c.id,
      author: c.author_name,
      avatar: c.author_avatar || c.author_name.charAt(0),
      content: c.content,
      time: c.created_at ? format(new Date(c.created_at), "MMM d, yyyy") : "",
      likes: c.likes || 0,
    })),
  ];

  if (isLoading) {
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

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16 container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blogs">
            <Button>Back to Stories</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      setLocalComments(prev => [{
        id: `local-${Date.now()}`,
        author: "You",
        avatar: "Y",
        content: newComment,
        time: "Just now",
        likes: 0,
      }, ...prev]);
      setNewComment("");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Personal Finance": "badge-lavender",
      Schemes: "badge-gold",
      Entrepreneurship: "badge-peach",
      Investing: "badge-teal",
      "Family Finance": "bg-primary/10 text-primary",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  const formattedDate = blog.created_at ? format(new Date(blog.created_at), "MMM d, yyyy") : "";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/blogs">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Stories
            </Button>
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className={`${getCategoryColor(blog.category)} px-3 py-1 rounded-full text-xs font-medium`}>
                {blog.category}
              </span>
              <span className="text-sm text-muted-foreground">{formattedDate}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{blog.excerpt}</p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center text-white font-serif font-bold">
                  {blog.author_avatar || blog.author_name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{blog.author_name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {blog.read_time || "5 min read"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-2 ${liked ? "text-red-500" : ""}`}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-2 ${bookmarked ? "text-primary" : ""}`}
                  onClick={() => setBookmarked(!bookmarked)}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 md:p-8 mb-8"
          >
            <div className="prose prose-lg max-w-none">
              {blog.content.split("\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="font-serif text-2xl font-bold mt-8 mb-4 text-foreground">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="font-serif text-xl font-semibold mt-6 mb-3 text-foreground">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <li key={index} className="text-foreground ml-4 mb-2">
                      {paragraph.replace("- ", "")}
                    </li>
                  );
                }
                if (paragraph.match(/^\d+\./)) {
                  return (
                    <li key={index} className="text-foreground ml-4 mb-2 list-decimal">
                      {paragraph.replace(/^\d+\.\s/, "")}
                    </li>
                  );
                }
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return (
                    <p key={index} className="font-semibold text-foreground mb-4">
                      {paragraph.replace(/\*\*/g, "")}
                    </p>
                  );
                }
                if (paragraph.trim() === "") {
                  return <br key={index} />;
                }
                return (
                  <p key={index} className="text-foreground mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center text-white font-serif font-bold text-xl">
                {blog.author_avatar || blog.author_name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-lg">{blog.author_name}</p>
                <p className="text-sm text-muted-foreground">{blog.author_role || "Community Writer"}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Sharing experiences and insights to help other women on their financial journey.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-serif text-xl font-semibold mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {allComments.length} Comments
            </h3>

            <div className="glass-card p-6 mb-6">
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-4 min-h-[100px]"
              />
              <Button className="btn-primary-glow gap-2" onClick={handleSubmitComment}>
                Post Comment
              </Button>
            </div>

            <div className="space-y-4">
              {allComments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="glass-card p-5"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-white font-bold flex-shrink-0">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{comment.content}</p>
                      <Button variant="ghost" size="sm" className="gap-1 h-7 px-2 text-xs">
                        <Heart className="w-3 h-3" />
                        {comment.likes}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogDetail;
