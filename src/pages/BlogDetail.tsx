import { motion } from "framer-motion";
import { Clock, Heart, MessageCircle, ArrowLeft, Share2, Bookmark, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const blogs = [
  {
    id: "1",
    title: "How I Built My Emergency Fund in 6 Months",
    excerpt: "Starting with just ₹1,000 per month, here's my journey to financial security and the lessons I learned along the way.",
    author: "Priya Sharma",
    avatar: "P",
    date: "Dec 28, 2024",
    readTime: "5 min read",
    likes: 234,
    comments: 45,
    category: "Personal Finance",
    content: `Building an emergency fund seemed impossible when I started. I was earning a modest salary, had bills to pay, and saving felt like a luxury I couldn't afford. But six months later, I had three months of expenses saved up. Here's how I did it.

## Starting Small

The biggest mistake I made initially was thinking I needed to save big amounts. I started with just ₹1,000 per month. It wasn't much, but it was consistent. The key was automating this transfer on my salary day.

## Cutting the Extras

I took a hard look at my spending. Here's what I cut:
- Unused subscriptions (₹800/month saved)
- Eating out twice a week (₹2,000/month saved)
- Impulse online shopping (₹1,500/month saved)

## The 50-30-20 Rule

I started following this simple budget:
- 50% for needs (rent, groceries, utilities)
- 30% for wants (entertainment, dining out)
- 20% for savings and debt repayment

## Finding Extra Income

I started freelancing on weekends, earning an extra ₹5,000-8,000 per month. This entire amount went straight into my emergency fund.

## The Result

In 6 months, I had ₹75,000 saved - enough to cover three months of expenses. The peace of mind this gives me is priceless. When my scooter needed unexpected repairs last month, I didn't panic. The money was there.

## My Tips for You

1. Start with whatever amount you can - even ₹500
2. Automate your savings
3. Find one subscription to cancel today
4. Look for ways to earn extra income
5. Don't touch this fund except for true emergencies

Remember, building financial security is a marathon, not a sprint. Start today, stay consistent, and you'll get there too.`,
  },
  {
    id: "2",
    title: "Sukanya Samriddhi Yojana: A Complete Guide",
    excerpt: "Everything you need to know about opening an SSY account for your daughter and maximizing returns.",
    author: "Anita Devi",
    avatar: "A",
    date: "Dec 25, 2024",
    readTime: "8 min read",
    likes: 567,
    comments: 89,
    category: "Schemes",
    content: `As a mother of two daughters, securing their future is my top priority. When I discovered the Sukanya Samriddhi Yojana (SSY), it felt like the perfect solution. Here's everything I've learned about this wonderful scheme.

## What is Sukanya Samriddhi Yojana?

SSY is a government-backed savings scheme designed specifically for the girl child. It offers one of the highest interest rates among all government schemes and comes with significant tax benefits.

## Key Features

- **Interest Rate**: Currently 8.2% per annum (reviewed quarterly)
- **Minimum Deposit**: ₹250 per year
- **Maximum Deposit**: ₹1.5 lakh per year
- **Tenure**: 21 years from account opening or until daughter's marriage after 18

## Who Can Open an Account?

- Parents or legal guardians of a girl child
- Girl child must be under 10 years of age
- Maximum 2 accounts per family (one per girl child)

## Documents Required

1. Birth certificate of the girl child
2. Identity proof of parent/guardian (Aadhaar, PAN)
3. Address proof
4. Passport-size photographs

## Tax Benefits

- Investment qualifies for Section 80C deduction (up to ₹1.5 lakh)
- Interest earned is tax-free
- Maturity amount is tax-free

## My Personal Experience

I opened accounts for both my daughters when they were 2 and 4 years old. I deposit ₹12,500 every month. By the time they turn 21, each account will have approximately ₹65 lakh!

## Tips for Maximizing Returns

1. Start as early as possible
2. Try to invest the maximum ₹1.5 lakh per year
3. Set up automatic monthly transfers
4. Don't withdraw prematurely unless absolutely necessary

This scheme has given me peace of mind about my daughters' education and marriage expenses. I highly recommend it to every parent of a girl child.`,
  },
  {
    id: "3",
    title: "My Mudra Loan Success Story",
    excerpt: "From a small kitchen to a thriving catering business - how government schemes helped me grow.",
    author: "Fatima Khan",
    avatar: "F",
    date: "Dec 20, 2024",
    readTime: "6 min read",
    likes: 432,
    comments: 67,
    category: "Entrepreneurship",
    content: `Three years ago, I was cooking meals for a few neighbors from my small kitchen. Today, I run a successful catering business that employs five women from my community. The turning point? A Mudra loan.

## The Beginning

I had always been passionate about cooking. Friends and family loved my food, and slowly, neighbors started ordering meals. But I was limited by my equipment and couldn't take larger orders.

## Discovering Mudra Yojana

A friend told me about the Pradhan Mantri Mudra Yojana (PMMY). I learned that it offers loans up to ₹10 lakh for small businesses without requiring collateral.

## The Application Process

I applied for a Shishu loan (up to ₹50,000) at my local State Bank branch. Here's what I needed:

- Business plan (I wrote a simple 2-page document)
- Identity and address proof
- Quotations for equipment I wanted to buy

## The Loan and Growth

I got approved for ₹45,000 within three weeks. I bought:
- A commercial-grade mixer
- Large cooking vessels
- Packaging materials

With better equipment, I could take larger orders. Within a year, I had paid back the loan and applied for a Kishor loan (₹50,000 to ₹5 lakh).

## Where I Am Today

My business now earns ₹80,000-1,00,000 per month. I've employed five women from my neighborhood, helping them become financially independent too.

## Advice for Aspiring Entrepreneurs

1. Start small but dream big
2. Don't be afraid of government schemes - they're designed to help you
3. Keep proper records from day one
4. Reinvest your early profits
5. Build a network of supportive women

The journey hasn't been easy, but every challenge has taught me something. If you have a business idea, don't let lack of capital stop you. Help is available.`,
  },
  {
    id: "4",
    title: "Teaching Kids About Money: A Mother's Guide",
    excerpt: "Simple ways to introduce financial literacy to children and build healthy money habits early.",
    author: "Kavita Reddy",
    avatar: "K",
    date: "Dec 18, 2024",
    readTime: "4 min read",
    likes: 189,
    comments: 34,
    category: "Family Finance",
    content: `As parents, we teach our children many things - but how often do we teach them about money? I started teaching my children about finances when they were just 5 years old, and it's been one of the best decisions I've made.

## Why Start Early?

Money habits form early. Studies show that by age 7, children have already developed basic concepts about money that can last a lifetime.

## Age-Appropriate Lessons

### Ages 3-5
- Identify coins and notes
- Understand that things cost money
- Wait for things they want (delayed gratification)

### Ages 6-9
- Give them a small allowance
- Teach them to save for goals
- Introduce the concept of earning through chores

### Ages 10-12
- Open a savings account in their name
- Teach budgeting with their allowance
- Discuss family budget decisions

## Practical Activities

1. **The Three Jars System**: Give your child three jars labeled Save, Spend, and Share. Every time they get money, they divide it among the three.

2. **Grocery Shopping**: Let them compare prices and calculate savings.

3. **Goal Setting**: Help them save for something they want. This teaches patience and planning.

## My Experience

My 10-year-old saved ₹2,000 over six months to buy a cricket bat. The pride on his face when he paid for it himself was priceless. He still takes extra care of that bat because he knows its value.

## Common Mistakes to Avoid

- Don't give in to every demand
- Don't hide financial discussions from children
- Don't make money a taboo topic
- Don't forget to lead by example

Start these conversations today. Your children's financial future depends on the habits they form now.`,
  },
  {
    id: "5",
    title: "Investment Mistakes I Made So You Don't Have To",
    excerpt: "Honest reflections on my early investment journey and the expensive lessons I learned.",
    author: "Meera Sinha",
    avatar: "M",
    date: "Dec 15, 2024",
    readTime: "7 min read",
    likes: 345,
    comments: 56,
    category: "Investing",
    content: `I started investing at 25. I'm now 35. In those 10 years, I've made nearly every mistake possible. Here are my expensive lessons so you can avoid them.

## Mistake 1: Starting Late

I had money in my savings account earning 3.5% interest while inflation ate away its value. I should have started investing at 21 when I got my first job.

**The lesson**: Start investing today, even if it's just ₹500.

## Mistake 2: Following Hot Tips

A colleague told me about a "sure thing" stock. I invested ₹50,000. The stock crashed 60%. I lost ₹30,000.

**The lesson**: Never invest based on tips. Do your own research.

## Mistake 3: Panic Selling

During a market correction, I sold my mutual funds at a loss because I was scared. The market recovered two months later.

**The lesson**: Markets go up and down. Stay invested for the long term.

## Mistake 4: No Emergency Fund

I had to break my fixed deposit to pay for a medical emergency. I lost 1% interest as penalty.

**The lesson**: Build an emergency fund before investing.

## Mistake 5: Ignoring Insurance

I didn't have health insurance. One hospitalization cost me ₹1.5 lakh.

**The lesson**: Get term insurance and health insurance before investing.

## Mistake 6: Chasing Returns

I kept switching between mutual funds chasing the highest returns. Exit loads and missed growth cost me dearly.

**The lesson**: Stick with good funds for the long term.

## What I Do Now

1. SIP of ₹15,000/month in diversified equity funds
2. ₹10,000/month in PPF
3. Adequate term and health insurance
4. 6 months expenses in emergency fund
5. No stock tips, only research

These mistakes cost me lakhs of rupees and years of potential growth. I share them hoping you'll learn from my experience and build wealth smarter than I did.`,
  },
];

const blogComments = [
  {
    id: 1,
    author: "Geeta M.",
    avatar: "G",
    content: "This was so helpful! I've been struggling with the same thing and your tips are very practical.",
    time: "2 hours ago",
    likes: 15,
  },
  {
    id: 2,
    author: "Lakshmi P.",
    avatar: "L",
    content: "Thank you for sharing your experience. It's inspiring to hear real stories from women like us.",
    time: "5 hours ago",
    likes: 22,
  },
  {
    id: 3,
    author: "Rani S.",
    avatar: "R",
    content: "I'm going to try the three jars system with my kids. Such a simple but effective idea!",
    time: "1 day ago",
    likes: 18,
  },
];

const BlogDetail = () => {
  const { blogId } = useParams();
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [localComments, setLocalComments] = useState(blogComments);

  const blog = blogs.find((b) => b.id === blogId);

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link to="/blogs">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Stories
            </Button>
          </Link>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className={`${getCategoryColor(blog.category)} px-3 py-1 rounded-full text-xs font-medium`}>
                {blog.category}
              </span>
              <span className="text-sm text-muted-foreground">{blog.date}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{blog.excerpt}</p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center text-white font-serif font-bold">
                  {blog.avatar}
                </div>
                <div>
                  <p className="font-semibold">{blog.author}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {blog.readTime}
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
                  {blog.likes + (liked ? 1 : 0)}
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

          {/* Article Content */}
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
                {blog.avatar}
              </div>
              <div>
                <p className="font-semibold text-lg">{blog.author}</p>
                <p className="text-sm text-muted-foreground">Community Writer</p>
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
              {localComments.length} Comments
            </h3>

            {/* Add Comment */}
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

            {/* Comments List */}
            <div className="space-y-4">
              {localComments.map((comment, index) => (
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