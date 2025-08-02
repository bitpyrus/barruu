import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  Clock, 
  Calendar,
  Send,
  ThumbsUp
} from "lucide-react";
import { useState } from "react";

const ArticleView = () => {
  const { slug } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState("");

  // Mock article data - in real app this would be fetched from Firebase
  const article = {
    id: 1,
    title: "The Future of Digital Storytelling: How Technology is Reshaping Narrative",
    content: `
      <p>In the digital age, storytelling has evolved far beyond traditional mediums. We're witnessing a revolution in how stories are told, consumed, and shared across the globe.</p>
      
      <h2>The Evolution of Digital Narratives</h2>
      <p>Digital storytelling encompasses a wide range of formats, from interactive web experiences to immersive virtual reality narratives. The boundaries between reader and participant are blurring, creating new opportunities for engagement.</p>
      
      <blockquote>
        "The best stories are the ones that make you forget you're reading, watching, or listening to them. They transport you completely into their world."
      </blockquote>
      
      <h2>Interactive Elements</h2>
      <p>Modern digital stories often include interactive elements that allow readers to influence the narrative. This could be as simple as choosing different paths through a story or as complex as real-time collaboration with other readers.</p>
      
      <h3>Key Technologies Driving Change</h3>
      <ul>
        <li><strong>Artificial Intelligence:</strong> AI is being used to personalize stories and create adaptive narratives</li>
        <li><strong>Virtual Reality:</strong> VR offers immersive storytelling experiences that were previously impossible</li>
        <li><strong>Augmented Reality:</strong> AR layers digital stories onto the real world</li>
        <li><strong>Blockchain:</strong> Enabling new models for story ownership and collaboration</li>
      </ul>
      
      <h2>The Social Aspect</h2>
      <p>Digital platforms have also transformed storytelling into a social activity. Readers can now comment, share, and discuss stories in real-time, creating communities around shared narratives.</p>
      
      <p>As we look to the future, it's clear that technology will continue to push the boundaries of what's possible in storytelling. The question isn't whether technology will change storytelling, but how we can harness these tools to tell better, more meaningful stories.</p>
    `,
    author: {
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=50&h=50&fit=crop&crop=face",
      bio: "Digital storyteller and tech enthusiast. Writing about the intersection of technology and narrative for 8+ years.",
      followers: "12.5k",
      following: "234"
    },
    publishedAt: "March 15, 2024",
    readTime: "8 min read",
    likes: 342,
    comments: 23,
    views: 1520,
    tags: ["Technology", "Storytelling", "Digital Media", "Future"],
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
  };

  const comments = [
    {
      id: 1,
      author: {
        name: "Marcus Johnson",
        username: "marcusj",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
      },
      content: "This is a fascinating perspective on digital storytelling. I particularly appreciate the point about AI personalizing narratives - it opens up so many possibilities for creating truly engaging experiences.",
      createdAt: "2 hours ago",
      likes: 12
    },
    {
      id: 2,
      author: {
        name: "Elena Rodriguez",
        username: "elena_writes",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
      },
      content: "Great article! I've been experimenting with interactive storytelling in my own work. The challenge is maintaining narrative coherence while giving readers agency.",
      createdAt: "4 hours ago",
      likes: 8
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleComment = () => {
    if (comment.trim()) {
      // In real app, this would save to Firebase
      console.log("New comment:", comment);
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          {/* Cover Image */}
          <div className="aspect-video overflow-hidden rounded-lg mb-6">
            <img 
              src={article.coverImage} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="heading-lg mb-6">{article.title}</h1>

          {/* Author and metadata */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <img src={article.author.avatar} alt={article.author.name} />
              </Avatar>
              <div>
                <div className="font-semibold">{article.author.name}</div>
                <div className="flex items-center space-x-3 text-muted-foreground text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{article.publishedAt}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLike}
                className={isLiked ? "text-red-500" : ""}
              >
                <Heart className={`w-4 h-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                {article.likes + (isLiked ? 1 : 0)}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                {article.comments}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleBookmark}
                className={isBookmarked ? "text-amber-500" : ""}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div 
          className="prose-article mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <Separator className="my-8" />

        {/* Author Bio */}
        <Card className="p-6 mb-8">
          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16">
              <img src={article.author.avatar} alt={article.author.name} />
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">{article.author.name}</h3>
              <p className="text-muted-foreground mb-3">{article.author.bio}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                <span>{article.author.followers} followers</span>
                <span>{article.author.following} following</span>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
          </div>
        </Card>

        {/* Comments Section */}
        <div className="space-y-6">
          <h3 className="heading-sm">Comments ({comments.length})</h3>

          {/* Comment Form */}
          <Card className="p-4">
            <div className="space-y-4">
              <Textarea
                placeholder="Share your thoughts..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button onClick={handleComment} size="sm" disabled={!comment.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </div>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="p-4">
                <div className="flex space-x-3">
                  <Avatar className="w-8 h-8">
                    <img src={comment.author.avatar} alt={comment.author.name} />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-sm">{comment.author.name}</span>
                      <span className="text-muted-foreground text-xs">{comment.createdAt}</span>
                    </div>
                    <p className="text-sm mb-3">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ArticleView;