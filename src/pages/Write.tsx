import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import RichTextEditor from "@/components/editor/RichTextEditor";
import TagSelector from "@/components/TagSelector";
import { Save, Eye, Share, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { savePostDraft, publishPost, CreatePostData } from "@/lib/posts";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  
  // Loading and error states
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to write a story");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }
    
    if (!content.trim() || content.trim() === '<p></p>') {
      newErrors.content = "Content is required";
    } else if (content.replace(/<[^>]*>/g, '').trim().length < 50) {
      newErrors.content = "Content must be at least 50 characters long";
    }
    
    if (tags.length === 0) {
      newErrors.tags = "At least one tag is required";
    } else if (tags.length > 10) {
      newErrors.tags = "Maximum 10 tags allowed";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
    // Clear tag error when tags are added
    if (newTags.length > 0 && errors.tags) {
      setErrors(prev => ({ ...prev, tags: "" }));
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("Please sign in to save your story");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }

    setIsSaving(true);
    
    try {
      console.log('Attempting to save draft...', {
        title: title.trim(),
        contentLength: content.length,
        tagsCount: tags.length,
        userId: user.id,
        userEmail: user.email,
        postId: currentPostId
      });

      const postData: CreatePostData = {
        title: title.trim(),
        content,
        tags
      };

      const postId = await savePostDraft(postData, user.id, currentPostId);
      setCurrentPostId(postId);
      toast.success("Draft saved successfully!");
    } catch (error: any) {
      console.error("Save error:", error);
      toast.error(error.message || "Failed to save draft");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!user) {
      toast.error("Please sign in to publish your story");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fix the errors before publishing");
      return;
    }

    setIsPublishing(true);
    
    try {
      console.log('Attempting to publish post...', {
        title: title.trim(),
        contentLength: content.length,
        tagsCount: tags.length,
        tags: tags,
        userId: user.id,
        userEmail: user.email,
        postId: currentPostId,
        isAuthenticated: !!user
      });

      const postData: CreatePostData = {
        title: title.trim(),
        content,
        tags
      };

      const postId = await publishPost(postData, user.id, currentPostId);
      setCurrentPostId(postId);
      setIsPublished(true);
      toast.success("Story published successfully!");
      
      // Optionally redirect to the published post
      // navigate(`/article/${postId}`);
    } catch (error: any) {
      console.error("Publish error details:", {
        error: error,
        message: error.message,
        code: error.code,
        stack: error.stack,
        user: user ? { id: user.id, email: user.email } : null
      });
      
      // Show more specific error message
      const errorMessage = error.message || "Failed to publish story";
      toast.error(errorMessage);
    } finally {
      setIsPublishing(false);
    }
  };

  const handlePreview = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please add title and content to preview");
      return;
    }
    // TODO: Implement preview functionality
    toast.info("Preview functionality coming soon!");
  };

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePreview}
              disabled={isSaving || isPublishing}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSave}
              disabled={isSaving || isPublishing}
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            {isPublished && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Published
              </Badge>
            )}
            <Button 
              onClick={handlePublish}
              disabled={isSaving || isPublishing || isPublished}
            >
              {isPublishing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Share className="w-4 h-4 mr-2" />
              )}
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {Object.keys(errors).length > 0 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Please fix the following errors:
              <ul className="mt-2 list-disc list-inside">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Title Input */}
        <div className="mb-6">
          <Input
            placeholder="Your story title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors(prev => ({ ...prev, title: "" }));
            }}
            className={`text-3xl font-bold border-none px-0 py-4 placeholder:text-muted-foreground/50 focus-visible:ring-0 ${
              errors.title ? "border-red-300 focus:border-red-500" : ""
            }`}
            disabled={isSaving || isPublishing}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Content Editor */}
        <div className="mb-8">
          <RichTextEditor
            content={content}
            onChange={(newContent) => {
              setContent(newContent);
              if (errors.content) setErrors(prev => ({ ...prev, content: "" }));
            }}
            placeholder="Tell your story..."
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-2">{errors.content}</p>
          )}
        </div>

        {/* Tags Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <TagSelector
            selectedTags={tags}
            onTagsChange={handleTagsChange}
            maxTags={10}
            disabled={isSaving || isPublishing}
            error={errors.tags}
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