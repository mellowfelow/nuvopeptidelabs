import React from "react";
import { ChevronRight, Calendar, User, Clock, ArrowLeft, Beaker } from "lucide-react";
import { siteConfig } from "../site.config";
import { BlogPost } from "../types";

interface BlogViewProps {
  selectedPostId?: string;
}

export default function BlogView({ selectedPostId }: BlogViewProps) {
  // Derive the selected post from the selectedPostId prop
  const selectedPost = selectedPostId
    ? (siteConfig.blog.find(
        (post) => post.id === selectedPostId || post.slug === selectedPostId
      ) || null)
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Dynamic Header */}
      {!selectedPost ? (
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden lab-grid">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-900/60 z-0"></div>
          <div className="absolute inset-0 lab-grid opacity-10 z-0"></div>
          
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-teal-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 uppercase tracking-widest">
              Scientific Journal
            </span>
            <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Peptide Purity & Clinical Research Blog
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Peer-reviewed perspectives, storage protocols, and chemical synthesis documentation to assist UK laboratory assays.
            </p>
          </div>
        </div>
      ) : (
        <a
          href="#/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Journal Catalog
        </a>
      )}

      {/* Main Layout */}
      {selectedPost ? (
        /* Detailed Article Reader View */
        <article className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-10 max-w-3xl mx-auto space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {selectedPost.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" /> {selectedPost.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {selectedPost.readTime}
              </span>
            </div>

            <h1 className="font-sans text-xl sm:text-3xl font-bold text-slate-950 leading-tight">
              {selectedPost.title}
            </h1>
          </div>

          <div className="aspect-[2/1] w-full overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
            <img
               src={selectedPost.image}
               alt={selectedPost.title}
               referrerPolicy="no-referrer"
               className="w-full h-full object-cover"
            />
          </div>

          {/* Render Content gracefully inside standard styled block */}
          <div className="prose prose-sm prose-slate max-w-none text-slate-700 leading-relaxed text-xs sm:text-sm space-y-4">
            {selectedPost.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("###")) {
                return (
                  <h3 key={index} className="text-md sm:text-lg font-bold text-slate-950 pt-3 border-b border-slate-100 pb-1">
                    {paragraph.replace("###", "").trim()}
                  </h3>
                );
              }
              if (paragraph.startsWith("####")) {
                return (
                  <h4 key={index} className="text-xs sm:text-sm font-bold text-slate-950 pt-2 font-mono">
                    {paragraph.replace("####", "").trim()}
                  </h4>
                );
              }
              if (paragraph.startsWith("-")) {
                return (
                  <ul key={index} className="list-disc pl-5 space-y-1 my-2">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i}>{item.replace("-", "").trim()}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d\./)) {
                return (
                  <ol key={index} className="list-decimal pl-5 space-y-1.5 my-2">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i}>{item.replace(/^\d\./, "").trim()}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Research Use Box inside blog */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-150 text-[11px] leading-relaxed text-slate-500 space-y-2 mt-8">
            <div className="flex items-center gap-1.5 text-teal-600 font-bold font-mono uppercase tracking-wide">
              <Beaker className="h-4 w-4" />
              Nuvo Peptide Research Advisory
            </div>
            <p>
              This publication is distributed purely for academic purposes to assist researchers exploring molecular mechanisms. Nuvo Peptide Labs supplies highly refined synthetic chemicals but does not validate or support therapeutic protocols.
            </p>
          </div>
        </article>
      ) : (
        /* Blog Archives Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.blog.map((post) => (
            <a
              key={post.id}
              href={`#/blog/${post.slug || post.id}`}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:border-teal-500 hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              {/* Cover Photo */}
              <div className="aspect-[1.8/1] overflow-hidden border-b border-slate-100 bg-slate-50">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-sm font-bold text-slate-950 font-sans line-clamp-2 leading-snug group-hover:text-teal-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
                  <span>Read Scientific Analysis</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
