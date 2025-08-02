import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Link as LinkIcon, 
  Calendar,
  Heart,
  MessageCircle,
  Clock,
  Users,
  BookOpen,
  Settings
} from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock user data - in real app this would be fetched from Firebase
  const user = {
    id: "1",
    name: "Sarah Chen",
    username: "sarahchen",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face",
    bio: "Digital storyteller and tech enthusiast. Writing about the intersection of technology and narrative for 8+ years. Always exploring new ways to tell compelling stories.",
    website: "https://sarahchen.dev",
    location: "San Francisco, CA",
    joinedAt: "January 2020",
    followersCount: 12540,
    followingCount: 234,
    articlesCount: 89,
    likesReceived: 45672
  };

  const articles = [
    {
      id: 1,
      title: "The Future of Digital Storytelling",
      excerpt: "How technology is reshaping the way we share and consume stories in the modern world...",
      publishedAt: "2 days ago",
      readTime: "8 min read",
      likes: 342,
      comments: 23,
      tags: ["Technology", "Storytelling"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Building Communities Through Words",
      excerpt: "The power of authentic writing to bring people together and create lasting connections...",
      publishedAt: "1 week ago",
      readTime: "6 min read",
      likes: 289,
      comments: 45,
      tags: ["Community", "Writing"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "The Art of Minimalist Writing",
      excerpt: "Sometimes the most powerful stories are told with the fewest words...",
      publishedAt: "2 weeks ago",
      readTime: "5 min read",
      likes: 156,
      comments: 18,
      tags: ["Writing", "Minimalism"],
      image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=300&h=200&fit=crop"
    }
  ];

  const followers = [
    {
      name: "Marcus Johnson",
      username: "marcusj",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      isFollowing: true
    },
    {
      name: "Elena Rodriguez",
      username: "elena_writes",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      isFollowing: false
    },
    {
      name: "Alex Thompson",
      username: "alextech",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      isFollowing: true
    }
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <Avatar className="w-32 h-32">
                <img src={user.avatar} alt={user.name} />
              </Avatar>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="heading-md mb-2">{user.name}</h1>
                    <p className="text-muted-foreground">@{user.username}</p>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <Button 
                      variant={isFollowing ? "outline" : "hero"} 
                      onClick={handleFollow}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Bio */}
                <p className="body-md text-foreground mb-4 max-w-2xl">{user.bio}</p>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                  {user.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span className="body-sm">{user.location}</span>
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center space-x-1">
                      <LinkIcon className="w-4 h-4" />
                      <a href={user.website} className="body-sm hover:text-primary transition-colors">
                        {user.website.replace('https://', '')}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span className="body-sm">Joined {user.joinedAt}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{user.articlesCount}</div>
                    <div className="body-xs text-muted-foreground">Articles</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{user.followersCount.toLocaleString()}</div>
                    <div className="body-xs text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{user.followingCount}</div>
                    <div className="body-xs text-muted-foreground">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{user.likesReceived.toLocaleString()}</div>
                    <div className="body-xs text-muted-foreground">Likes</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="articles" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="group cursor-pointer overflow-hidden hover:shadow-medium transition-all duration-300">
                  {/* Article Image */}
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="heading-xs mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="body-sm text-muted-foreground mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span className="body-xs">{article.readTime}</span>
                        </div>
                        <span className="body-xs">{article.publishedAt}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span className="body-xs">{article.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span className="body-xs">{article.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Followers Tab */}
          <TabsContent value="followers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {followers.map((follower) => (
                <Card key={follower.username} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <img src={follower.avatar} alt={follower.name} />
                      </Avatar>
                      <div>
                        <div className="font-medium">{follower.name}</div>
                        <div className="body-sm text-muted-foreground">@{follower.username}</div>
                      </div>
                    </div>
                    <Button 
                      variant={follower.isFollowing ? "outline" : "default"} 
                      size="sm"
                    >
                      {follower.isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Following Tab */}
          <TabsContent value="following" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {followers.map((following) => (
                <Card key={following.username} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <img src={following.avatar} alt={following.name} />
                      </Avatar>
                      <div>
                        <div className="font-medium">{following.name}</div>
                        <div className="body-sm text-muted-foreground">@{following.username}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Unfollow
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;