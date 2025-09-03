'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BirthdayMessage from './BirthdayMessage'
import DadJokes from './DadJokes'
import CandleBlow from './CandleBlow'
import ConfettiAnimation from './ConfettiAnimation'

interface BirthdayCardProps {
  age?: number
}

export default function BirthdayCard({ age = 60 }: BirthdayCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [activeFeature, setActiveFeature] = useState<'message' | 'jokes' | 'candles'>('message')

  const handleOpenCard = () => {
    setIsOpen(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  if (!isOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="relative cursor-pointer tap-highlight-transparent"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenCard}
        >
          {/* Card Front */}
          <div className="w-80 h-96 md:w-96 md:h-[500px] bg-gradient-to-br from-paper-100 to-paper-200 rounded-lg card-shadow paper-texture">
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Happy Birthday
              </motion.h1>
              <motion.div 
                className="text-6xl md:text-7xl font-elegant text-gray-700 mb-8"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Dad
              </motion.div>
              <motion.p 
                className="text-lg text-gray-600 animate-pulse"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Tap to Open
              </motion.p>
              <motion.div
                className="mt-4 w-6 h-6 rounded-full bg-gray-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatePresence>
        {showConfetti && <ConfettiAnimation />}
      </AnimatePresence>

      <motion.div
        initial={{ rotateY: 180 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-4xl mx-auto"
      >
        {/* Card Inside */}
        <div className="bg-gradient-to-br from-paper-50 to-paper-100 rounded-lg card-shadow paper-texture min-h-96">
          <div className="p-8 md:p-12">
            
            {/* Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1 bg-white/50 rounded-lg p-1 backdrop-blur-sm">
                {[
                  { key: 'message', label: '💌', title: 'Message' },
                  { key: 'jokes', label: '😄', title: 'Jokes' },
                  { key: 'candles', label: '🎂', title: 'Candles' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveFeature(item.key as any)}
                    className={`px-6 py-3 rounded-md transition-all duration-200 text-lg font-medium min-w-[80px] ${
                      activeFeature === item.key
                        ? 'bg-white shadow-md text-gray-800'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/30'
                    }`}
                    title={item.title}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {activeFeature === 'message' && (
                <motion.div
                  key="message"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BirthdayMessage age={age} />
                </motion.div>
              )}
              
              {activeFeature === 'jokes' && (
                <motion.div
                  key="jokes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <DadJokes />
                </motion.div>
              )}
              
              {activeFeature === 'candles' && (
                <motion.div
                  key="candles"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CandleBlow age={age} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}