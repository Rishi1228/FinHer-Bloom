import { motion } from "framer-motion";
import { MessageCircle, Heart, ArrowLeft, Send, Share2, Bookmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useDiscussionById, useDiscussionReplies } from "@/hooks/useCommunity";
import { format } from "date-fns";

const DiscussionDetail = () => {
  const { discussionId } = useParams();
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const { data: discussion, isLoading } = useDiscussionById(discussionId);
  const { data: dbReplies = [] } = useDiscussionReplies(discussionId);

  const [localComments, setLocalComments] = useState<Array<{
    id: string; author: string; avatar: string; content: string; time: string; likes: number;
  }>>([]);

  const allComments = [
    ...localComments,
    ...dbReplies.map(r => ({
      id: r.id,
      author: r.author_name,
      avatar: r.author_avatar || r.author_name.charAt(0),
      content: r.content,
      time: r.created_at ? format(new Date(r.created_at), "MMM d, yyyy") : "",
      likes: r.likes || 0,
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

  if (!discussion) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16 container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Discussion Not Found</h1>
          <p className="text-muted-foreground mb-8">The discussion you're looking for doesn't exist.</p>
          <Link to="/community">
            <Button>Back to Community</Button>
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

  const formattedTime = discussion.created_at ? format(new Date(discussion.created_at), "MMM d, yyyy") : "";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/community">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Community
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 md:p-8 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="badge-lavender text-xs">{discussion.category}</span>
              <span className="text-xs text-muted-foreground">{formattedTime}</span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold mb-4">{discussion.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center text-white font-serif font-bold">
                {discussion.author_avatar || discussion.author_name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{discussion.author_name}</p>
                <p className="text-sm text-muted-foreground">Community Member</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {discussion.content.split("\n").map((paragraph, index) => (
                <p key={index} className="text-foreground mb-4 whitespace-pre-wrap">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-2 ${liked ? "text-red-500" : ""}`}
                onClick={() => setLiked(!liked)}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                {(discussion.likes || 0) + (liked ? 1 : 0)}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                {allComments.length} replies
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-2 ${bookmarked ? "text-primary" : ""}`}
                onClick={() => setBookmarked(!bookmarked)}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
                {bookmarked ? "Saved" : "Save"}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 mb-6"
          >
            <h3 className="font-semibold mb-4">Add a Reply</h3>
            <Textarea
              placeholder="Share your thoughts or experience..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-4 min-h-[100px]"
            />
            <Button className="btn-primary-glow gap-2" onClick={handleSubmitComment}>
              <Send className="w-4 h-4" />
              Post Reply
            </Button>
          </motion.div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-semibold">{allComments.length} Replies</h3>
            {allComments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DiscussionDetail;
