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

const renderInlineFormatting = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const renderMarkdownContent = (content: string) => {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Detect markdown table
    if (line.trim().startsWith("|") && i + 1 < lines.length && lines[i + 1].trim().match(/^\|[\s-:|]+\|$/)) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      // Parse header
      const headerCells = tableLines[0].split("|").filter(c => c.trim() !== "").map(c => c.trim());
      // Skip separator (index 1), parse body rows
      const bodyRows = tableLines.slice(2).map(row =>
        row.split("|").filter(c => c.trim() !== "").map(c => c.trim())
      );

      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-6">
          <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
            <thead>
              <tr className="bg-primary/10">
                {headerCells.map((cell, ci) => (
                  <th key={ci} className="text-left px-4 py-3 font-semibold text-foreground border-b border-border">
                    {renderInlineFormatting(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-muted/30" : "bg-background"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-foreground border-b border-border/50">
                      {renderInlineFormatting(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-serif text-2xl font-bold mt-8 mb-4 text-foreground">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="font-serif text-xl font-semibold mt-6 mb-3 text-foreground">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="text-foreground ml-4 mb-2">
          {renderInlineFormatting(line.replace("- ", ""))}
        </li>
      );
    } else if (line.match(/^\d+\./)) {
      elements.push(
        <li key={i} className="text-foreground ml-4 mb-2 list-decimal">
          {renderInlineFormatting(line.replace(/^\d+\.\s/, ""))}
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<br key={i} />);
    } else {
      elements.push(
        <p key={i} className="text-foreground mb-4 leading-relaxed">
          {renderInlineFormatting(line)}
        </p>
      );
    }
    i++;
  }

  return elements;
};

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
              {renderMarkdownContent(blog.content)}
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
