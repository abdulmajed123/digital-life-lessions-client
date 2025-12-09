import React, { useEffect, useState, useRef } from "react";

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      title: "Digital Life Lessons for Modern Growth",
      subtitle:
        "Learn practical life lessons that improve mindset, productivity, discipline, and long-term success.",
      cta: "Explore Lessons",
      note: "Daily Growth Insights",
    },
    {
      id: 2,
      title: "Free vs Premium — Unlock Your Potential",
      subtitle:
        "Premium users get unlimited lessons, priority listing, ad-free learning, and exclusive weekly deep-dive content.",
      cta: "Upgrade to Premium",
      note: "Premium Benefits",
    },
    {
      id: 3,
      title: "Build Better Habits, Achieve Big Goals",
      subtitle:
        "Our Digital Life Lesson project helps you track habits, set goals, and transform your mindset with science-backed methods.",
      cta: "Start Your Journey",
      note: "Habit & Mindset Tools",
    },
  ];

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const AUTO_PLAY_MS = 6000;

  // Auto-play
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_MS);
    return () => {
      resetTimeout();
    };
  }, [index]);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  function goTo(i) {
    setIndex(i % slides.length);
  }

  function prev() {
    setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }

  function next() {
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }

  // keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="relative w-full overflow-hidden rounded-2xl shadow-lg">
      {/* Slides container */}
      <div className="relative h-80 sm:h-96 lg:h-[520px]">
        {slides.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== index}
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-in-out transform
              ${
                i === index
                  ? "translate-x-0 z-20"
                  : i < index
                  ? "-translate-x-full z-10"
                  : "translate-x-full z-10"
              }`}
            style={{
              backgroundImage:
                i === 0
                  ? "linear-gradient(135deg, rgba(99,102,241,0.9), rgba(59,130,246,0.85))"
                  : i === 1
                  ? "linear-gradient(135deg, rgba(16,185,129,0.9), rgba(6,182,212,0.85))"
                  : "linear-gradient(135deg, rgba(236,72,153,0.9), rgba(249,115,22,0.85))",
              backgroundBlendMode: "overlay",
            }}
          >
            <div className="container mx-auto px-6 sm:px-10 lg:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Text column */}
                <div className="text-white max-w-2xl">
                  <p className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm mb-4">
                    {s.note}
                  </p>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                    {s.title}
                  </h2>
                  <p className="text-base sm:text-lg mb-6 opacity-90">
                    {s.subtitle}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 bg-white text-slate-900 font-medium px-4 py-2 rounded-2xl shadow hover:scale-[1.01] transition-transform"
                      role="button"
                    >
                      {s.cta}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>

                    <a
                      href="#"
                      className="inline-flex items-center gap-2 border border-white/30 text-white px-4 py-2 rounded-2xl hover:bg-white/10"
                    >
                      Learn more
                    </a>
                  </div>
                </div>

                {/* Decorative column - simple illustration */}
                <div className="hidden lg:flex justify-center">
                  <div className="w-full max-w-md p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="h-48 flex items-center justify-center text-white text-lg font-semibold">
                      {/* Placeholder graphic - replace with image if you like */}
                      {s.title}
                    </div>
                    <div className="mt-4 text-sm text-white/90">
                      Quick summary: {s.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next controls */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-10 h-2 rounded-full transition-all ${
              i === index ? "bg-white scale-100" : "bg-white/40 scale-90"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
