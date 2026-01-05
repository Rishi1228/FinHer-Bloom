import { motion } from "framer-motion";
import { MessageCircle, Heart, ArrowLeft, Send, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const discussions = [
  {
    id: "1",
    title: "Best savings schemes for new mothers?",
    author: "Meera S.",
    avatar: "M",
    replies: 23,
    likes: 45,
    time: "2 hours ago",
    category: "Schemes",
    content: "Hello everyone! I recently became a mother and want to start planning for my daughter's future. What are the best government savings schemes I should consider? I've heard about Sukanya Samriddhi Yojana but not sure how it compares to other options. Would love to hear from mothers who have already started saving for their children.",
  },
  {
    id: "2",
    title: "How I saved ₹5 lakh in 2 years - My Journey",
    author: "Priya K.",
    avatar: "P",
    replies: 89,
    likes: 234,
    time: "5 hours ago",
    category: "Success Stories",
    content: "Two years ago, I was living paycheck to paycheck with no savings. Today, I have ₹5 lakh in my savings account. Here's how I did it:\n\n1. I started with a small amount - just ₹2,000 per month\n2. I opened a recurring deposit account\n3. I cut unnecessary subscriptions\n4. I started a small side business selling homemade pickles\n5. I reinvested all my side income\n\nThe key was consistency. Even when times were tough, I never skipped a month. Now I'm aiming for ₹10 lakh by next year!",
  },
  {
    id: "3",
    title: "Mudra Yojana application tips for first-timers",
    author: "Anita D.",
    avatar: "A",
    replies: 34,
    likes: 78,
    time: "1 day ago",
    category: "Entrepreneurship",
    content: "I successfully got a Mudra loan last month and wanted to share some tips:\n\n- Prepare a solid business plan before applying\n- Keep all your documents ready (Aadhaar, PAN, address proof)\n- Start with Shishu category (up to ₹50,000) if you're new\n- Apply through a public sector bank for faster processing\n- Be honest about your business projections\n\nThe process took me about 3 weeks from application to disbursement. Happy to answer any questions!",
  },
  {
    id: "4",
    title: "Investment advice for single mothers",
    author: "Fatima R.",
    avatar: "F",
    replies: 56,
    likes: 123,
    time: "2 days ago",
    category: "Investing",
    content: "As a single mother, financial planning is extra important for me. I've been investing for 5 years now and here's what I've learned:\n\n- Always have 6 months of expenses in emergency fund first\n- Start SIP in mutual funds - even ₹500/month helps\n- Don't ignore insurance - term insurance is a must\n- Sukanya Samriddhi is great for daughters\n- Diversify between PPF, mutual funds, and FDs\n\nWhat strategies have worked for other single moms here?",
  },
];

const comments = [
  {
    id: 1,
    author: "Sunita M.",
    avatar: "S",
    content: "This is so helpful! I'm in a similar situation and was looking for exactly this kind of advice.",
    time: "1 hour ago",
    likes: 12,
  },
  {
    id: 2,
    author: "Kavita R.",
    avatar: "K",
    content: "I started with Sukanya Samriddhi for my daughter. The interest rate is really good and it's completely safe.",
    time: "2 hours ago",
    likes: 24,
  },
  {
    id: 3,
    author: "Nisha P.",
    avatar: "N",
    content: "Can you share more details about the documentation required? I'm planning to apply soon.",
    time: "3 hours ago",
    likes: 8,
  },
];

const DiscussionDetail = () => {
  const { discussionId } = useParams();
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [localComments, setLocalComments] = useState(comments);

  const discussion = discussions.find((d) => d.id === discussionId);

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
      const newCommentObj = {
        id: localComments.length + 1,
        author: "You",
        avatar: "Y",
        content: newComment,
        time: "Just now",
        likes: 0,
      };
      setLocalComments([newCommentObj, ...localComments]);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link to="/community">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Community
            </Button>
          </Link>

          {/* Discussion Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 md:p-8 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="badge-lavender text-xs">{discussion.category}</span>
              <span className="text-xs text-muted-foreground">{discussion.time}</span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold mb-4">{discussion.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center text-white font-serif font-bold">
                {discussion.avatar}
              </div>
              <div>
                <p className="font-semibold">{discussion.author}</p>
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

            {/* Actions */}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-2 ${liked ? "text-red-500" : ""}`}
                onClick={() => setLiked(!liked)}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                {discussion.likes + (liked ? 1 : 0)}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                {localComments.length} replies
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

          {/* Add Comment */}
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

          {/* Comments */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-semibold">{localComments.length} Replies</h3>
            {localComments.map((comment, index) => (
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