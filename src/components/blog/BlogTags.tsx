interface BlogTagsProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export function BlogTags({ tags, selectedTags, onTagSelect }: BlogTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedTags.includes(tag)
              ? 'bg-[hsl(var(--gold))] text-[hsl(var(--navy))]'
              : 'bg-white/10 text-white/60 hover:bg-white/20'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}