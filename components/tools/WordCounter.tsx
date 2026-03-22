"use client";

import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const wordCount = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const charCount = text.length;

  const readingTime = Math.ceil(wordCount / 200); // avg 200 wpm

  return (
    <div className="max-w-3xl mx-auto">
      
      {/* Text Area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full h-40 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        
        <div className="p-4 border rounded-xl">
          <p className="text-sm text-gray-500">Words</p>
          <h2 className="text-2xl font-bold">{wordCount}</h2>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-sm text-gray-500">Characters</p>
          <h2 className="text-2xl font-bold">{charCount}</h2>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-sm text-gray-500">Reading Time</p>
          <h2 className="text-2xl font-bold">
            {readingTime} min
          </h2>
        </div>

      </div>

    </div>
  );
}