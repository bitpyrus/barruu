import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { Save, Eye, Share, X } from "lucide-react";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    // TODO: Implement Firebase save
    console.log("Saving draft:", { title, content, tags });
  };

  const handlePublish = () => {
    // TODO: Implement Firebase publish
    console.log("Publishing:", { title, content, tags });
    setIsPublished(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            {isPublished && (
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            )}
            <Button 
              variant="hero" 
              size="sm" 
              onClick={handlePublish}
              disabled={!title.trim() || !content.trim()}
            >
              {isPublished ? "Update" : "Publish"}
            </Button>
          </div>
        </div>

        {/* Article Form */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <Input
              placeholder="Enter your story title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-3xl font-bold border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1">
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Add tags (press Enter)..."
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleAddTag}
              className="max-w-md"
            />
          </div>

          {/* Rich Text Editor */}
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Tell your story..."
          />
        </div>

        {/* Publishing Guidelines */}
        <div className="mt-12 p-6 bg-accent/30 rounded-lg">
          <h3 className="font-semibold mb-3">Publishing Guidelines</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Keep your content original and engaging</li>
            <li>• Add relevant tags to help readers discover your story</li>
            <li>• Use images and formatting to enhance readability</li>
            <li>• Be respectful and follow community guidelines</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Write;