"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function DebateTopicsPage() {
  const [topic, setTopic] = useState("");

  // Array of debate topics
  const topics = [
    "Guns",
    "Government",
    "Medicine",
    "Money",
    "Television",
    "Games",
    "People",
    "Topic",
    "Topic",
  ];

  // Auto scroll effect
  useEffect(() => {
    const container = document.getElementById("scroll-container");
    let scrollAmount = 0;

    const interval = setInterval(() => {
      if (container) {
        scrollAmount += 1; // Increase speed by adjusting this value
        container.scrollLeft = scrollAmount; // Scroll to the right
        if (scrollAmount >= container.scrollWidth / 2) {
          // Reset scroll to the start when halfway through
          scrollAmount = 0;
        }
      }
    }, 15); // Adjust interval speed here

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `
        linear-gradient(to bottom right, #2E227E, #815D81),
        url("/images/Background.png")
      `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        {/* Purple Circle with Star Icon */}
            <Image
            src="/images/Star.png.png"
            alt="Star Icon"
            width={96}  // equivalent to w-12 (48px)
            height={96} // equivalent to h-12 (48px)
            className="object-contain"
            />

        {/* Title and Search */}
        <h1 className="text-3xl font-bold text-white mb-6">
          What would you like to debate?
        </h1>
        <div className="w-full max-w-md mb-12">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Add a topic"
            className="w-full px-4 py-3 rounded-full bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* Scrolling Topics */}
        <div
          id="scroll-container"
          className="w-full max-w-4xl overflow-hidden flex whitespace-nowrap"
          style={{ position: "relative" }}
        >
          <div
            className="flex gap-4"
            style={{ display: "inline-flex", flexWrap: "nowrap" }}
          >
            {/* Original Topics */}
            {topics.map((topic, index) => (
              <button
                key={`${topic}-${index}`}
                className="px-6 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                style={{
                  minWidth: "150px",
                }}
              >
                {topic}
              </button>
            ))}
            {/* Duplicate Topics for Seamless Scrolling */}
            {topics.map((topic, index) => (
              <button
                key={`duplicate-${topic}-${index}`}
                className="px-6 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                style={{
                  minWidth: "150px",
                }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
