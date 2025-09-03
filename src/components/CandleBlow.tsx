'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CandleBlowProps {
  age: number
}

interface Candle {
  id: number
  isLit: boolean
  x: number
  y: number
}

export default function CandleBlow({ age }: CandleBlowProps) {
  const [candles, setCandles] = useState<Candle[]>([])
  const [allBlownOut, setAllBlownOut] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [breathDetected, setBreathDetected] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Initialize candles
  useEffect(() => {
    const newCandles: Candle[] = []
    const maxCandlesPerRow = Math.min(age, 8) // Reduce max candles per row
    const rows = Math.ceil(age / maxCandlesPerRow)
    
    for (let i = 0; i < age; i++) {
      const row = Math.floor(i / maxCandlesPerRow)
      const col = i % maxCandlesPerRow
      const candlesInThisRow = Math.min(maxCandlesPerRow, age - row * maxCandlesPerRow)
      
      // Better spacing calculation to keep candles on cake
      const spacing = Math.min(20, 140 / candlesInThisRow) // Adaptive spacing
      const offsetX = (col - (candlesInThisRow - 1) / 2) * spacing
      const offsetY = row * 20 - (rows - 1) * 10 // Closer rows
      
      newCandles.push({
        id: i,
        isLit: true,
        x: offsetX,
        y: offsetY
      })
    }
    setCandles(newCandles)
  }, [age])

  // Microphone setup
  useEffect(() => {
    const setupMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        streamRef.current = stream
        
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        audioContextRef.current = audioContext
        
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 256
        analyserRef.current = analyser
        
        const microphone = audioContext.createMediaStreamSource(stream)
        microphoneRef.current = microphone
        microphone.connect(analyser)
        
        startBreathDetection()
      } catch (error) {
        console.log('Microphone access denied or not available')
      }
    }

    setupMicrophone()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const startBreathDetection = () => {
    if (!analyserRef.current) return

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const detectBreath = () => {
      if (!analyserRef.current) return

      analyserRef.current.getByteFrequencyData(dataArray)
      
      // Calculate average volume
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength
      
      // Detect breath (adjust threshold as needed)
      if (average > 30) {
        setBreathDetected(true)
        blowOutCandles()
        setTimeout(() => setBreathDetected(false), 1000)
      }

      requestAnimationFrame(detectBreath)
    }

    detectBreath()
  }

  const blowOutCandles = () => {
    setCandles(prevCandles => {
      const litCandles = prevCandles.filter(candle => candle.isLit)
      if (litCandles.length === 0) return prevCandles

      // Blow out 1-3 random candles
      const candlesToBlowOut = Math.min(
        Math.floor(Math.random() * 3) + 1,
        litCandles.length
      )
      
      const indicesToBlowOut: number[] = []
      for (let i = 0; i < candlesToBlowOut; i++) {
        let randomIndex: number
        do {
          randomIndex = Math.floor(Math.random() * litCandles.length)
        } while (indicesToBlowOut.includes(randomIndex))
        indicesToBlowOut.push(randomIndex)
      }

      const newCandles = prevCandles.map(candle => {
        const litIndex = litCandles.findIndex(lit => lit.id === candle.id)
        if (litIndex !== -1 && indicesToBlowOut.includes(litIndex)) {
          return { ...candle, isLit: false }
        }
        return candle
      })

      // Check if all candles are blown out
      if (newCandles.every(candle => !candle.isLit)) {
        setAllBlownOut(true)
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 4000)
      }

      return newCandles
    })
  }

  const resetCandles = () => {
    setCandles(prev => prev.map(candle => ({ ...candle, isLit: true })))
    setAllBlownOut(false)
    setShowCelebration(false)
  }

  const handleTapToBlow = () => {
    if (!allBlownOut) {
      blowOutCandles()
    }
  }

  const litCandlesCount = candles.filter(candle => candle.isLit).length

  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-handwriting text-gray-800 mb-4">
          Birthday Cake
        </h2>
        <p className="text-gray-600 text-lg">
          {allBlownOut ? '🎉 All candles blown out!' : `${litCandlesCount} candles still burning`}
        </p>
      </motion.div>

      {/* Birthday Cake */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl p-8 md:p-12 shadow-xl mb-8"
      >
        {/* Cake Base */}
        <div className="relative mx-auto flex justify-center" style={{ width: '320px', height: '240px' }}>
          {/* Cake Layers - Better proportions */}
          <div className="relative">
            {/* Bottom Layer */}
            <div className="absolute bottom-0 w-60 h-20 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 rounded-lg shadow-lg border-2 border-yellow-400"
                 style={{ left: '50%', transform: 'translateX(-50%)' }}>
              {/* Frosting details */}
              <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-t-lg"></div>
            </div>
            
            {/* Middle Layer */}
            <div className="absolute bottom-16 w-48 h-18 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 rounded-lg shadow-lg border-2 border-pink-400"
                 style={{ left: '50%', transform: 'translateX(-50%)' }}>
              <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-pink-400 to-pink-300 rounded-t-lg"></div>
            </div>
            
            {/* Top Layer */}
            <div className="absolute bottom-28 w-36 h-16 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 rounded-lg shadow-lg border-2 border-blue-400"
                 style={{ left: '50%', transform: 'translateX(-50%)' }}>
              <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-300 rounded-t-lg"></div>
            </div>
          </div>
          
          {/* Candles - positioned on top of cake */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
            {candles.map((candle) => (
              <motion.div
                key={candle.id}
                className="absolute"
                style={{
                  left: `${candle.x}px`,
                  top: `${candle.y + 20}px`, // Offset to sit on cake top
                  transform: 'translate(-50%, -50%)'
                }}
                whileHover={{ scale: 1.1 }}
              >
                {/* Candle */}
                <div className="w-3 h-10 bg-gradient-to-b from-red-200 via-red-300 to-red-400 rounded-sm relative shadow-sm border border-red-400">
                  {/* Candle wax drip */}
                  <div className="absolute top-2 w-full h-1 bg-red-100 rounded-sm opacity-60"></div>
                  
                  {/* Flame */}
                  <AnimatePresence>
                    {candle.isLit && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [-3, 3, -3],
                            y: [0, -1, 0]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="relative"
                        >
                          {/* Flame core */}
                          <div className="w-4 h-5 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full opacity-90"></div>
                          {/* Flame glow */}
                          <div className="absolute inset-0 w-6 h-6 bg-gradient-to-t from-orange-300 via-yellow-300 to-yellow-100 rounded-full opacity-30 -translate-x-1 -translate-y-1"></div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Smoke after blown out */}
                  <AnimatePresence>
                    {!candle.isLit && (
                      <motion.div
                        initial={{ opacity: 1, scale: 0.5 }}
                        animate={{ opacity: 0, scale: 1.5, y: -30 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3 }}
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-gray-400 text-lg"
                      >
                        💨
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="space-y-4">
        <motion.button
          onClick={handleTapToBlow}
          disabled={allBlownOut}
          whileHover={{ scale: allBlownOut ? 1 : 1.05 }}
          whileTap={{ scale: allBlownOut ? 1 : 0.95 }}
          className={`px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 shadow-lg ${
            allBlownOut
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {breathDetected ? '💨 Blowing...' : allBlownOut ? '🎉 All Done!' : '💨 Tap to Blow Candles'}
        </motion.button>

        {allBlownOut && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={resetCandles}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-base font-medium transition-colors duration-200 shadow-lg"
          >
            🔄 Light Again
          </motion.button>
        )}
      </div>

      {/* Breath detection indicator */}
      <p className="text-sm text-gray-500 mt-4">
        {analyserRef.current ? '🎤 Microphone enabled - try blowing!' : '👆 Tap the button to blow out candles'}
      </p>

      {/* Celebration */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-8xl mb-4"
              >
                🎉
              </motion.div>
              <motion.p
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-4xl font-handwriting text-gray-800"
              >
                Make a wish!
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}