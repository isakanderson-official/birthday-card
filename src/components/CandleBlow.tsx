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
    const candlesPerRow = Math.min(age, 10)
    const rows = Math.ceil(age / candlesPerRow)
    
    for (let i = 0; i < age; i++) {
      const row = Math.floor(i / candlesPerRow)
      const col = i % candlesPerRow
      const offsetX = (col - (candlesPerRow - 1) / 2) * 30
      const offsetY = row * 25 - (rows - 1) * 12.5
      
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
        className="relative bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg p-8 md:p-12 shadow-lg mb-8"
      >
        {/* Cake Base */}
        <div className="relative mx-auto" style={{ width: '300px', height: '200px' }}>
          {/* Cake Layers */}
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 rounded-lg shadow-inner"></div>
          <div className="absolute bottom-16 w-5/6 left-1/2 transform -translate-x-1/2 h-20 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 rounded-lg shadow-inner"></div>
          <div className="absolute bottom-28 w-2/3 left-1/2 transform -translate-x-1/2 h-16 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded-lg shadow-inner"></div>
          
          {/* Candles */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            {candles.map((candle) => (
              <motion.div
                key={candle.id}
                className="absolute"
                style={{
                  left: `${candle.x}px`,
                  top: `${candle.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
                whileHover={{ scale: 1.1 }}
              >
                {/* Candle */}
                <div className="w-2 h-8 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-sm relative">
                  {/* Flame */}
                  <AnimatePresence>
                    {candle.isLit && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [-2, 2, -2]
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-3 h-4 bg-gradient-to-t from-orange-400 via-yellow-400 to-yellow-200 rounded-full"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Smoke after blown out */}
                  <AnimatePresence>
                    {!candle.isLit && (
                      <motion.div
                        initial={{ opacity: 1, scale: 0.5 }}
                        animate={{ opacity: 0, scale: 1, y: -20 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs"
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