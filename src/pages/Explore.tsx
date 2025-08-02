import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, Heart, MessageCircle, Search, TrendingUp, User } from "lucide-react";
import { useState } from "react";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Mock data - in real app this would come from Firebase
  const articles = [
    {
      id: 1,
      title: "The Psychology of Creative Writing",
      excerpt: "Understanding the mental processes behind storytelling and how to harness them for better writing...",
      author: {
        name: "Dr. Maya Patel",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face",
        username: "mayapatel"
      },
      readTime: "7 min read",
      likes: 456,
      comments: 34,
      tags: ["Writing", "Psychology", "Creativity"],
      publishedAt: "2 days ago",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Building Sustainable Tech Communities",
      excerpt: "How to create and maintain inclusive technology communities that last...",
      author: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        username: "alextech"
      },
      readTime: "12 min read",
      likes: 289,
      comments: 67,
      tags: ["Technology", "Community", "Leadership"],
      publishedAt: "1 day ago",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=300&fit=crop"
    },
    {
      id: 3,
      title: "The Art of Mindful Living",
      excerpt: "Practical approaches to incorporating mindfulness into daily life for better mental health...",
      author: {
        name: "Zen Masters",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=50&h=50&fit=crop&crop=face",
        username: "zenmasters"
      },
      readTime: "9 min read",
      likes: 678,
      comments: 123,
      tags: ["Mindfulness", "Health", "Lifestyle"],
      publishedAt: "3 days ago",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Climate Change and Future Generations",
      excerpt: "What we owe to future generations and how individual actions can make a difference...",
      author: {
        name: "Emma Green",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        username: "emmagreen"
      },
      readTime: "15 min read",
      likes: 892,
      comments: 156,
      tags: ["Environment", "Future", "Sustainability"],
      publishedAt: "5 days ago",
      image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=600&h=300&fit=crop"
    }
  ];

  const trendingTags = [
    "Technology", "Writing", "Health", "Environment", "Psychology", 
    "Business", "Design", "Science", "Culture", "Art"
  ];

  const featuredAuthors = [
    {
      name: "Dr. Maya Patel",
      username: "mayapatel",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face",
      followers: "12.5k",
      articles: 42
    },
    {
      name: "Alex Thompson",
      username: "alextech", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      followers: "8.2k",
      articles: 28
    },
    {
      name: "Emma Green",
      username: "emmagreen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      followers: "15.3k",
      articles: 67
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || article.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                >
                  All
                </Button>
                {trendingTags.slice(0, 6).map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="group cursor-pointer overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    {/* Article Image */}
                    <div className="md:w-1/3 aspect-video md:aspect-square overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <h2 className="heading-sm mb-3 group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      
                      <p className="body-md text-muted-foreground mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>

                      {/* Author and metadata */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <img src={article.author.avatar} alt={article.author.name} />
                          </Avatar>
                          <div>
                            <div className="body-sm font-medium">{article.author.name}</div>
                            <div className="body-xs text-muted-foreground">{article.publishedAt}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-muted-foreground">
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
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Tags */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Trending Topics</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Featured Authors */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Featured Authors</h3>
              </div>
              <div className="space-y-4">
                {featuredAuthors.map((author) => (
                  <div key={author.username} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <img src={author.avatar} alt={author.name} />
                      </Avatar>
                      <div>
                        <div className="body-sm font-medium">{author.name}</div>
                        <div className="body-xs text-muted-foreground">
                          {author.followers} followers • {author.articles} articles
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;