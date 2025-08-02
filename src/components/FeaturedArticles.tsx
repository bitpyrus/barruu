import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, Heart, MessageCircle } from "lucide-react";

const FeaturedArticles = () => {
  const articles = [
    {
      id: 1,
      title: "The Future of Digital Storytelling",
      excerpt: "How technology is reshaping the way we share and consume stories in the modern world...",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=50&h=50&fit=crop&crop=face",
        username: "sarahchen"
      },
      readTime: "5 min read",
      likes: 342,
      comments: 23,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Building Communities Through Words",
      excerpt: "The power of authentic writing to bring people together and create lasting connections...",
      author: {
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        username: "marcusj"
      },
      readTime: "8 min read",
      likes: 289,
      comments: 45,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop"
    },
    {
      id: 3,
      title: "The Art of Minimalist Writing",
      excerpt: "Sometimes the most powerful stories are told with the fewest words. Here's how to master the craft...",
      author: {
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        username: "elena_writes"
      },
      readTime: "6 min read",
      likes: 156,
      comments: 18,
      image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=600&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Featured Stories</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Discover compelling narratives from our community of writers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="group cursor-pointer overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-card-gradient">
              {/* Article Image */}
              <div className="aspect-video overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="heading-xs mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="body-sm text-muted-foreground mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Author info */}
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-8 h-8">
                    <img src={article.author.avatar} alt={article.author.name} />
                  </Avatar>
                  <div>
                    <div className="body-xs font-medium">{article.author.name}</div>
                    <div className="body-xs text-muted-foreground">@{article.author.username}</div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="body-xs">{article.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span className="body-xs">{article.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span className="body-xs">{article.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Stories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;