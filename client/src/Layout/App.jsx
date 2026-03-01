import React, { useRef, useState, useEffect } from 'react'
import api from '../api/axios'
import PlantOnboarding from '../Components/PlantOnboarding'
import './App.css'
const DROPS = [  { w: 5, h: 8, dur: '0.52s', delay: '0s' },
  { w: 7, h: 10, dur: '0.48s', delay: '0.12s' },
  { w: 4, h: 7, dur: '0.56s', delay: '0.24s' },
  { w: 6, h: 9, dur: '0.50s', delay: '0.36s' },
  { w: 4, h: 6, dur: '0.54s', delay: '0.08s' },
]

const SPLASHES = [
  { sx: '-16px', sdelay: '0s' },
  { sx: '-8px', sdelay: '0.1s' },
  { sx: '0px', sdelay: '0.05s' },
  { sx: '8px', sdelay: '0.12s' },
  { sx: '16px', sdelay: '0s' },
]

const NOTES = [
  { nd: '0s', nx: '12px', emoji: '🎵' },
  { nd: '0.5s', nx: '-10px', emoji: '🎶' },
  { nd: '1.0s', nx: '16px', emoji: '🎵' },
  { nd: '1.5s', nx: '-6px', emoji: '♪' },
]

const GRASS_BLADES = Array.from({ length: 60 }, (_, i) => {
  const seed1 = Math.sin(i * 127.1) * 43758.5453
  const seed2 = Math.sin(i * 311.7) * 43758.5453
  const pseudo1 = seed1 - Math.floor(seed1)
  const pseudo2 = seed2 - Math.floor(seed2)
  return {
    left: `${(i / 60) * 100 + (pseudo1 * 2 - 1)}%`,
    height: `${16 + Math.sin(i * 1.7) * 6 + (i % 3) * 4}px`,
    width: `${3 + (i % 3)}px`,
    delay: `${(i * 0.17) % 2.5}s`,
    duration: `${1.6 + (i % 7) * 0.25}s`,
    lean: `${-10 + (i % 9) * 2.5}deg`,
    color: ['#2d6b30', '#3d8b40', '#4a9e55', '#5cb85c', '#6bcb77', '#3a7d43'][i % 6],
  }
})

// Welcome messages the plant cycles through
const WELCOME_MESSAGES = [
  "I'm so happy to see you! 🌟",
  "Water me and I'll sing for you! 🎵",
  "I love making music with you! 🎶",
  "Ready for our daily song? 💧",
  "I missed you! Let's sing! 🌿",
]

function WelcomeBubble({ userName, onDismiss }) {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    // Pick a random welcome message
    const msg = WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)]
    setMessage(msg)

    // Delay before showing bubble
    const showTimer = setTimeout(() => {
      setVisible(true)
    }, 800)

    return () => clearTimeout(showTimer)
  }, [])

  // Typewriter effect once visible
  useEffect(() => {
    if (!visible || !message) return
    setTypedText('')
    let charIndex = 0
    const typeTimer = setInterval(() => {
      if (charIndex <= message.length) {
        setTypedText(message.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeTimer)
        // Auto-dismiss after 4 seconds
        setTimeout(() => {
          setVisible(false)
          setTimeout(onDismiss, 400)
        }, 4000)
      }
    }, 38)
    return () => clearInterval(typeTimer)
  }, [visible, message])

  if (!visible && typedText === '') return null

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 'calc(100% + 16px)',
        right: '50%',
        transform: 'translateX(50%)',
        zIndex: 30,
        opacity: visible ? 1 : 0,
        transform: `translateX(50%) scale(${visible ? 1 : 0.8})`,
        transition: 'opacity 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 18,
          padding: '12px 18px',
          minWidth: 200,
          maxWidth: 260,
          boxShadow: '0 6px 24px rgba(0,0,0,0.14)',
          fontSize: '0.9rem',
          fontWeight: 700,
          color: '#1a3a1e',
          textAlign: 'center',
          fontFamily: "'Baloo 2', cursive",
          border: '2px solid rgba(76, 175, 80, 0.25)',
          lineHeight: 1.4,
          whiteSpace: 'pre-wrap',
          position: 'relative',
        }}
      >
        {typedText}
        <span style={{ opacity: 0.4, animation: 'blink 0.7s infinite' }}>|</span>
        {/* Speech bubble tail pointing down */}
        <div style={{
          position: 'absolute',
          bottom: -13,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '14px solid white',
          filter: 'drop-shadow(0 3px 2px rgba(0,0,0,0.06))',
        }} />
      </div>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function App() {
  const [song, setSong] = useState(null)
  const [isSinging, setIsSinging] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [userName, setUserName] = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const audioRef = useRef(null)
  const plant = localStorage.getItem('plantType')

  useEffect(() => {
    const storedName = localStorage.getItem('plantUserName')
    if (storedName) {
      setUserName(storedName)
      setShowOnboarding(false)
      setShowWelcome(true)
    } else {
      setShowOnboarding(true)
    }
  }, [])

  const handleOnboardingComplete = (name) => {
    setUserName(name)
    setShowOnboarding(false)
    setTimeout(() => setShowWelcome(true), 500)
  }

  const waterPlant = async () => {
    if (isAnimating) return
    setShowWelcome(false)
    try {
      const res = await api.get('/random-song')
      setSong(res.data)
      setIsAnimating(true)
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load()
          audioRef.current.play()
          setIsSinging(true)
        }
      }, 3200)
      setTimeout(() => {
        setIsAnimating(false)
      }, 10300)
    } catch (error) {
      console.error('Error fetching song:', error)
    }
  }

  const stopSinging = () => setIsSinging(false)

  return (
    <>
      {showOnboarding && (
        <PlantOnboarding onComplete={handleOnboardingComplete} />
      )}

      <div
        className="min-h-screen flex flex-col"
        style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 40%, #90EE90 80%, #7CCD7C 100%)' }}
      >
        <h1 className="bg-linear-to-r from-green-500 via-green-400 to-emerald-500 text-white font-bold text-4xl py-4 text-center shadow-lg tracking-wide shrink-0">
          🌿 The Singing Plant 🎵
          {userName && (
            <span style={{ fontSize: '1.4rem', marginLeft: 12, opacity: 0.9 }}>
              — Hey, {userName}! 👋
            </span>
          )}
        </h1>

        <div className="flex flex-col items-center flex-1 py-4 gap-4 px-4">
          <div className="scene w-full flex-1">
            <div className="scene-sun" />
            <div className="cloud cloud-1">☁️</div>
            <div className="cloud cloud-2">☁️</div>
            <div className="cloud cloud-3">☁️</div>

            <div className="scene-ground">
              {GRASS_BLADES.map((b, i) => (
                <div
                  key={i}
                  className="grass-blade"
                  style={{
                    left: b.left,
                    height: b.height,
                    width: b.width,
                    '--delay': b.delay,
                    '--duration': b.duration,
                    '--lean': b.lean,
                    background: `linear-gradient(to top, ${b.color} 0%, #7CCD7C 100%)`,
                  }}
                />
              ))}
            </div>

            <div className="scene-soil" />

            {/* Plant wrapper with welcome bubble */}
            <div className={`plant-wrapper ${isSinging ? 'dancing' : ''}`} style={{ position: 'absolute' }}>
              {/* Welcome bubble rendered above the plant */}
              {showWelcome && !isSinging && !isAnimating && (
                <WelcomeBubble
                  userName={userName}
                  onDismiss={() => setShowWelcome(false)}
                />
              )}

              <img src={`/images/${plant}.png`} alt="Plant" />
              {isSinging && NOTES.map((n, i) => (
                <span
                  key={i}
                  className="music-note"
                  style={{
                    '--nd': n.nd,
                    '--nx': n.nx,
                    top: i % 2 === 0 ? '-10px' : '-20px',
                    left: i % 2 === 0 ? '-20px' : '60px',
                  }}
                >
                  {n.emoji}
                </span>
              ))}
            </div>

            <div className={`boy ${isAnimating ? 'animating' : ''}`}>
              <div className="boy-shadow" />
              <div className="boy-head">
                <div className="boy-hair" />
                <div className="boy-ear boy-ear-l" />
                <div className="boy-ear boy-ear-r" />
                <div className="boy-face">
                  <div className="boy-eye boy-eye-l" />
                  <div className="boy-eye boy-eye-r" />
                  <div className="boy-eyebrow boy-eyebrow-l" />
                  <div className="boy-eyebrow boy-eyebrow-r" />
                  <div className="boy-nose" />
                  <div className="boy-cheek boy-cheek-l" />
                  <div className="boy-cheek boy-cheek-r" />
                  <div className="boy-smile" />
                </div>
              </div>
              <div className="boy-neck" />
              <div className="boy-body">
                <div className="boy-collar" />
              </div>
              <div className="boy-arm-l">
                <div className="boy-hand boy-hand-l" />
              </div>
              <div className="boy-arm-r">
                <div className="boy-hand boy-hand-r" />
                <div className="watering-can">
                  <div className="can-handle" />
                  <div className="can-tank">
                    <div className="can-water" />
                  </div>
                  <div className="can-spout">
                    <div className="can-rose" />
                  </div>
                </div>
              </div>
              <div className="boy-pants" />
              <div className="boy-leg-l">
                <div className="boy-shoe boy-shoe-l" />
              </div>
              <div className="boy-leg-r">
                <div className="boy-shoe boy-shoe-r" />
              </div>
            </div>

            <div className="water-pour" style={{ left: 'calc(100% - 200px)', bottom: 68 }}>
              <div className="pour-stream" />
              {DROPS.map((d, i) => (
                <div
                  key={i}
                  className="pour-drop"
                  style={{
                    width: d.w,
                    height: d.h,
                    '--dur': d.dur,
                    '--delay': d.delay,
                    marginLeft: (i - 2) * 4,
                  }}
                />
              ))}
              {SPLASHES.map((s, i) => (
                <div
                  key={i}
                  className="pour-splash"
                  style={{ '--sx': s.sx, '--sdelay': s.sdelay }}
                />
              ))}
              <div className="pour-ripple" style={{ '--rdelay': '0s' }} />
              <div className="pour-ripple" style={{ '--rdelay': '0.25s' }} />
              <div className="pour-ripple" style={{ '--rdelay': '0.5s' }} />
            </div>
          </div>

          <button
            onClick={waterPlant}
            disabled={isAnimating}
            className="
              bg-linear-to-r from-green-500 via-emerald-500 to-green-600
              hover:from-green-600 hover:via-emerald-600 hover:to-green-700
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-500
              text-white font-bold px-10 py-4 rounded-full text-xl shadow-xl
              active:scale-95 transition-all duration-200
              border-2 border-green-400
              hover:shadow-2xl hover:scale-105
            "
          >
            💧 Water Plant
          </button>

          <audio ref={audioRef} onEnded={stopSinging}>
            {song && (
              <source src={`http://localhost:8000${song.file}`} type="audio/mpeg" />
            )}
          </audio>
        </div>
      </div>
    </>
  )
}

export default App