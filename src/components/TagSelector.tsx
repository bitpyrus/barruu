import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Predefined tag categories and options
const PREDEFINED_TAGS = {
  "Writing & Literature": [
    "fiction",
    "non-fiction",
    "poetry",
    "creative-writing",
    "storytelling",
    "narrative",
    "character-development",
    "plot",
    "dialogue",
    "world-building"
  ],
  "Technology": [
    "ai",
    "machine-learning",
    "web-development",
    "programming",
    "software",
    "tech-trends",
    "innovation",
    "coding",
    "data-science",
    "cybersecurity"
  ],
  "Lifestyle": [
    "health",
    "wellness",
    "fitness",
    "travel",
    "food",
    "relationships",
    "productivity",
    "mindfulness",
    "self-improvement",
    "hobbies"
  ],
  "Business & Career": [
    "entrepreneurship",
    "leadership",
    "marketing",
    "finance",
    "career-advice",
    "startup",
    "business-strategy",
    "networking",
    "professional-development",
    "remote-work"
  ],
  "Education & Learning": [
    "education",
    "learning",
    "teaching",
    "research",
    "academic",
    "study-tips",
    "online-learning",
    "skills",
    "knowledge",
    "tutorials"
  ],
  "Arts & Culture": [
    "art",
    "music",
    "film",
    "photography",
    "design",
    "culture",
    "history",
    "philosophy",
    "literature",
    "creativity"
  ]
};

// Flatten all tags for easy searching
const ALL_TAGS = Object.values(PREDEFINED_TAGS).flat();

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  maxTags?: number;
  disabled?: boolean;
  error?: string;
}

const TagSelector = ({
  selectedTags,
  onTagsChange,
  maxTags = 10,
  disabled = false,
  error
}: TagSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [customTag, setCustomTag] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      // Remove tag if already selected
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < maxTags) {
      // Add tag if under limit
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleCustomTagAdd = () => {
    const trimmedTag = customTag.trim().toLowerCase();
    if (trimmedTag && !selectedTags.includes(trimmedTag) && selectedTags.length < maxTags) {
      onTagsChange([...selectedTags, trimmedTag]);
      setCustomTag("");
      setShowCustomInput(false);
    }
  };

  const handleCustomTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomTagAdd();
    } else if (e.key === 'Escape') {
      setShowCustomInput(false);
      setCustomTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-3 py-1">
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-2 hover:text-red-500"
                disabled={disabled}
                type="button"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Tag Selector */}
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between min-w-[200px]"
              disabled={disabled || selectedTags.length >= maxTags}
            >
              Select tags...
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandList>
                <CommandEmpty>No tags found.</CommandEmpty>

                {Object.entries(PREDEFINED_TAGS).map(([category, tags]) => (
                  <CommandGroup key={category} heading={category}>
                    {tags.map((tag) => (
                      <CommandItem
                        key={tag}
                        value={tag}
                        onSelect={() => handleTagSelect(tag)}
                        className="flex items-center justify-between"
                      >
                        <span>{tag}</span>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedTags.includes(tag) ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Custom Tag Button */}
        {!showCustomInput && selectedTags.length < maxTags && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCustomInput(true)}
            disabled={disabled}
            type="button"
          >
            <Plus className="w-4 h-4 mr-1" />
            Custom
          </Button>
        )}
      </div>

      {/* Custom Tag Input */}
      {showCustomInput && (
        <div className="flex gap-2">
          <Input
            placeholder="Enter custom tag..."
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={handleCustomTagKeyDown}
            className="max-w-xs"
            disabled={disabled}
            autoFocus
          />
          <Button
            size="sm"
            onClick={handleCustomTagAdd}
            disabled={!customTag.trim() || disabled}
            type="button"
          >
            Add
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowCustomInput(false);
              setCustomTag("");
            }}
            disabled={disabled}
            type="button"
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Tag Counter */}
      <p className="text-sm text-muted-foreground">
        {selectedTags.length}/{maxTags} tags selected
        {selectedTags.length === 0 && " (at least 1 required)"}
      </p>
    </div>
  );
};

export default TagSelector;
