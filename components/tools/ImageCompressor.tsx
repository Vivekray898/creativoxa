'use client';

import React, { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';

const FORMATS = [
  { label: 'Original', value: '' },
  { label: 'WebP', value: 'image/webp' },
  { label: 'JPEG', value: 'image/jpeg' },
  { label: 'PNG', value: 'image/png' },
];

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Settings
  const [maxSizeMB, setMaxSizeMB] = useState(1);
  const [maxWidthOrHeight, setMaxWidthOrHeight] = useState(1920);
  const [outputFormat, setOutputFormat] = useState('');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setCompressedFile(null);
      setCompressedUrl(null);
    }
  };

  const handleCompress = async () => {
    if (!originalFile) return;

    setIsLoading(true);
    try {
      const options = {
        maxSizeMB: maxSizeMB,
        maxWidthOrHeight: maxWidthOrHeight,
        useWebWorker: true,
        fileType: outputFormat || originalFile.type,
      };

      const compressed = await imageCompression(originalFile, options);
      setCompressedFile(compressed);
      setCompressedUrl(URL.createObjectURL(compressed));
    } catch (error) {
      console.error("Compression failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!compressedUrl || !compressedFile) return;
    const link = document.createElement('a');
    link.href = compressedUrl;
    link.download = `creativoxa-compressed-${compressedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* 1. UPLOAD ZONE */}
      {!originalFile ? (
        <label className="group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-default rounded-[2rem] bg-muted/20 hover:bg-primary/5 hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-bold text-foreground mb-1">Drop your image here</p>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">or click to browse</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
        </label>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="p-6 rounded-3xl bg-muted/30 border border-default space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Optimization Settings</h3>
            
            <div className="space-y-4">
              {/* Max Size Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Target Size (Max MB)</label>
                  <span className="text-xs font-black text-primary">{maxSizeMB} MB</span>
                </div>
                <input 
                  type="range" min="0.1" max="5" step="0.1" 
                  value={maxSizeMB} onChange={(e) => setMaxSizeMB(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Dimension Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Max Dimension (px)</label>
                  <span className="text-xs font-black text-primary">{maxWidthOrHeight}px</span>
                </div>
                <input 
                  type="range" min="500" max="4000" step="100" 
                  value={maxWidthOrHeight} onChange={(e) => setMaxWidthOrHeight(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Format Converter */}
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">Convert to Format</label>
                <div className="grid grid-cols-2 gap-2">
                  {FORMATS.map((f) => (
                    <button
                      key={f.label}
                      onClick={() => setOutputFormat(f.value)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                        outputFormat === f.value 
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                        : 'bg-background border-default text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleCompress}
              disabled={isLoading}
              className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 hover:text-white transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              {isLoading ? 'Processing...' : 'Apply Compression'}
            </button>
            
            <button 
              onClick={() => setOriginalFile(null)} 
              className="w-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-colors"
            >
              Remove Image
            </button>
          </div>

          {/* Preview Panel */}
          <div className="space-y-4">
             {/* Original Preview */}
             <div className="relative rounded-3xl overflow-hidden border border-default bg-black/5 aspect-video flex items-center justify-center">
                <img src={previewUrl!} alt="Original" className="max-h-full object-contain" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-tighter">
                  Original: {originalFile && formatSize(originalFile.size)}
                </div>
             </div>

             {/* Compressed Result */}
             {compressedUrl && (
               <div className="relative rounded-3xl overflow-hidden border-2 border-primary bg-black/5 aspect-video flex items-center justify-center animate-in fade-in zoom-in duration-500">
                  <img src={compressedUrl} alt="Compressed" className="max-h-full object-contain" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-tighter">
                    Compressed: {compressedFile && formatSize(compressedFile.size)}
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-green-500 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                    Saved {Math.round((1 - compressedFile!.size / originalFile.size) * 100)}%
                  </div>
               </div>
             )}
          </div>
        </div>
      )}

      {/* 2. ACTIONS */}
      {compressedUrl && (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8 border-t border-default">
          <div className="text-center sm:text-left">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Ready for production</p>
            <p className="text-sm font-bold text-foreground">Optimized by Creativoxa Engine</p>
          </div>
          <button
            onClick={downloadImage}
            className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:shadow-primary/40 transition-all active:scale-95"
          >
            Download Optimized Image
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}