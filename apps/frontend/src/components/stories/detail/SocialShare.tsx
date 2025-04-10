"use client";

import { useState } from "react";

interface SocialShareProps {
  title: string;
  url?: string; // Si no se proporciona, usará la URL actual
}

const SocialShare = ({ title, url }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);

  // Usar la URL actual si no se proporciona una
  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = (
    platform: "facebook" | "twitter" | "linkedin" | "copy"
  ) => {
    let shareLink = "";

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
        return;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 border-t border-gray-200">
      <div className="flex items-center">
        <span className="text-[#1a3a3a] font-medium mr-4">
          Compartir esta historia:
        </span>

        <div className="flex space-x-2">
          <button
            onClick={() => handleShare("facebook")}
            className="w-10 h-10 rounded-full bg-[#e8e4d9] flex items-center justify-center text-[#1a3a3a] hover:bg-[#d1c5a5] transition-colors"
            aria-label="Compartir en Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </button>

          <button
            onClick={() => handleShare("twitter")}
            className="w-10 h-10 rounded-full bg-[#e8e4d9] flex items-center justify-center text-[#1a3a3a] hover:bg-[#d1c5a5] transition-colors"
            aria-label="Compartir en Twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </button>

          <button
            onClick={() => handleShare("linkedin")}
            className="w-10 h-10 rounded-full bg-[#e8e4d9] flex items-center justify-center text-[#1a3a3a] hover:bg-[#d1c5a5] transition-colors"
            aria-label="Compartir en LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
          </button>

          <button
            onClick={() => handleShare("copy")}
            className="w-10 h-10 rounded-full bg-[#e8e4d9] flex items-center justify-center text-[#1a3a3a] hover:bg-[#d1c5a5] transition-colors relative"
            aria-label="Copiar enlace"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>

            {copied && (
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#1a3a3a] text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                ¡Enlace copiado!
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
