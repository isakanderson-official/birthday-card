'use client'

import { motion } from 'framer-motion'

export default function ConfettiAnimation() {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'][i % 7],
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            top: '-20px'
          }}
          initial={{ 
            y: -100, 
            rotate: 0, 
            opacity: 1,
            scale: 1 
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: 720,
            opacity: 0,
            scale: 0.5
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Emoji confetti */}
      {['🎉', '🎊', '🎈', '🎂', '🎁', '⭐', '✨'].map((emoji, index) => (
        <motion.div
          key={`emoji-${index}`}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-50px'
          }}
          initial={{ 
            y: -50, 
            rotate: 0, 
            opacity: 1 
          }}
          animate={{
            y: window.innerHeight + 50,
            rotate: 360,
            opacity: 0,
            scale: [1, 1.5, 0.5]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            delay: Math.random() * 1.5,
            ease: "easeOut"
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  )
}