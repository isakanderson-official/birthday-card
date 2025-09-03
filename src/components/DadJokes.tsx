'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getRandomJoke } from '@/data/jokes'

export default function DadJokes() {
  const [currentJoke, setCurrentJoke] = useState(getRandomJoke())
  const [groanLevel, setGroanLevel] = useState(0)

  const getNewJoke = () => {
    setCurrentJoke(getRandomJoke())
    setGroanLevel(Math.floor(Math.random() * 5) + 1)
  }

  return (
    <div className="text-center max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-handwriting text-gray-800 mb-4">
          Dad Jokes Corner
        </h2>
        <p className="text-gray-600 text-lg">
          Because everyone needs more dad humor! 😄
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-white/60 backdrop-blur-sm rounded-lg p-8 md:p-12 shadow-lg mb-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentJoke}
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-6"
          >
            "{currentJoke}"
          </motion.div>
        </AnimatePresence>

        {groanLevel > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <p className="text-gray-600 mb-2">Groan Level:</p>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, index) => (
                <motion.span
                  key={index}
                  animate={{ scale: index < groanLevel ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`text-2xl ${
                    index < groanLevel ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                >
                  😩
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        <motion.button
          onClick={getNewJoke}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg"
        >
          Get Another Joke! 🎭
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-gray-500 italic"
      >
        <p>Classic dad humor - guaranteed to make you groan! 😆</p>
      </motion.div>
    </div>
  )
}