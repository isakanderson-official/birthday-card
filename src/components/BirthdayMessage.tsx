"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BirthdayMessageProps {
  age: number;
}

export default function BirthdayMessage({ age }: BirthdayMessageProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const message = `Happy Birthday, Dad! 

Thank you for all the love you consitantly show me. You've been an incredible father, something I'm truley greatful for.

Here's to celebrating another year of your life and all the memories we've created together.

Love You,
Isak ❤️`;

  useEffect(() => {
    if (currentIndex < message.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + message[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, message]);

  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-handwriting text-gray-800 mb-6">
          A Special Message
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-white/60 backdrop-blur-sm rounded-lg p-8 md:p-12 shadow-lg"
      >
        <div className="text-lg md:text-xl leading-relaxed text-gray-700 font-medium">
          <span className="whitespace-pre-line">{displayedText}</span>
          {currentIndex < message.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-gray-400"
            >
              |
            </motion.span>
          )}
        </div>

        {currentIndex >= message.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <div className="flex space-x-4 text-4xl">
              {["🎉", "🎂", "🎈", "🎁", "❤️"].map((emoji, index) => (
                <motion.span
                  key={index}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
