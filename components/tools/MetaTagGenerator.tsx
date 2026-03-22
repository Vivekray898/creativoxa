"use client";

import { useState } from "react";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [copied, setCopied] = useState(false);

  const generatedMeta = `<!-- Primary Meta Tags -->
<title>${title || "Title Here"}</title>
<meta name="title" content="${title || "Title Here"}" />
<meta name="description" content="${description || "Description Here"}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url || "https://example.com"}" />
<meta property="og:title" content="${title || "Title Here"}" />
<meta property="og:description" content="${description || "Description Here"}" />
<meta property="og:image" content="${image || "image-url.jpg"}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url || "https://example.com"}" />
<meta property="twitter:title" content="${title || "Title Here"}" />
<meta property="twitter:description" content="${description || "Description Here"}" />
<meta property="twitter:image" content="${image || "image-url.jpg"}" />`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMeta);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- LEFT COLUMN: INPUTS --- */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <i className="fas fa-pen-nib text-xs"></i>
          </div>
          <h3 className="font-black uppercase tracking-widest text-[10px]">Configure Metadata</h3>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label className="text-[10px] font-bold uppercase text-muted mb-2 block">Page Title</label>
            <input
              type="text"
              placeholder="e.g. Best Digital Agency in Siliguri"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 border border-default rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
            <span className={`absolute right-4 bottom-4 text-[10px] font-mono ${title.length > 60 ? 'text-red-500' : 'text-muted'}`}>
              {title.length}/60
            </span>
          </div>

          <div className="relative">
            <label className="text-[10px] font-bold uppercase text-muted mb-2 block">Meta Description</label>
            <textarea
              placeholder="A brief summary of your page content..."
              value={description}
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 border border-default rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
            />
            <span className={`absolute right-4 bottom-4 text-[10px] font-mono ${description.length > 160 ? 'text-red-500' : 'text-muted'}`}>
              {description.length}/160
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase text-muted mb-2 block">Canonical URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-4 border border-default rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-muted mb-2 block">OG Image URL</label>
              <input
                type="text"
                placeholder="https://.../image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-4 border border-default rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* CODE OUTPUT BOX */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-3">
             <h3 className="font-black uppercase tracking-widest text-[10px]">Generated Snippet</h3>
             <button onClick={handleCopy} className="text-primary text-[10px] font-bold hover:underline uppercase tracking-widest">
               {copied ? "Copied!" : "Copy Code"}
             </button>
          </div>
          <div className="relative group">
            <pre className="w-full h-48 p-5 border border-default rounded-2xl bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-blue-300 text-[11px] font-mono overflow-auto custom-scrollbar">
              <code>{generatedMeta}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: PREVIEWS --- */}
      <div className="space-y-8">
        
        {/* 1. Google Preview */}
        <div className="space-y-4">
          <h3 className="font-black uppercase tracking-widest text-[10px] text-muted">Google Search Result</h3>
          <div className="bg-white dark:bg-slate-900 border border-default p-6 rounded-2xl shadow-sm">
            <p className="text-[#1a0dab] dark:text-blue-400 text-xl font-medium hover:underline cursor-pointer truncate mb-1">
              {title || "Your Page Title Goes Here"}
            </p>
            <p className="text-[#006621] dark:text-green-500 text-sm mb-2 truncate">
              {url || "https://yourwebsite.com/page-url"}
            </p>
            <p className="text-[#4d5156] dark:text-slate-400 text-sm line-clamp-2">
              {description || "Enter a meta description to see how your page will appear in Google search results. Make sure to keep it under 160 characters for best visibility."}
            </p>
          </div>
        </div>

        {/* 2. Social Media Card Preview */}
        <div className="space-y-4">
          <h3 className="font-black uppercase tracking-widest text-[10px] text-muted">Social Share Preview</h3>
          <div className="bg-white dark:bg-slate-900 border border-default rounded-2xl overflow-hidden shadow-sm">
            <div className="aspect-[1.91/1] bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center">
              {image ? (
                <img src={image} alt="OG Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8">
                  <i className="far fa-image text-4xl text-muted/30 mb-2"></i>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Image Preview Area</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-default bg-slate-50/50 dark:bg-slate-800/30">
              <p className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-300 tracking-widest mb-1 truncate">
                {new URL(url || "https://domain.com").hostname}
              </p>
              <p className="font-bold text-slate-900 dark:text-white truncate mb-1">
                {title || "Your Engaging Social Title"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-300 line-clamp-1">
                {description || "Your meta description summary for social feeds..."}
              </p>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => { setTitle(""); setDescription(""); setUrl(""); setImage(""); }}
          className="w-full py-4 rounded-xl border border-default text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500/5 hover:text-red-500 hover:border-red-500/50 transition-all duration-300"
        >
          Reset Environment
        </button>

      </div>

    </div>
  );
}