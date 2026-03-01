import React, { useRef, useState, useEffect } from 'react'
import api from '../api/axios'
import './App.css'

const DROPS = [
  { w: 5, h: 8, dur: '0.52s', delay: '0s' },
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

function App() {
  const [song, setSong] = useState(null)
  const [isSinging, setIsSinging] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const audioRef = useRef(null)

  const waterPlant = async () => {
    if (isAnimating) return
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
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 40%, #90EE90 80%, #7CCD7C 100%)' }}>
      <h1 className="bg-linear-to-r from-green-500 via-green-400 to-emerald-500 text-white font-bold text-4xl py-4 text-center shadow-lg tracking-wide shrink-0">
        🌿 The Singing Plant 🎵
      </h1>

      <div className="flex flex-col items-center flex-1 py-4 gap-4 px-4">
        <div className="scene w-full flex-1">
          <div className="scene-sun" />
          <div className="cloud cloud-1">☁️</div>
          <div className="cloud cloud-2">☁️</div>
          <div className="cloud cloud-3">☁️</div>
          <div className="scene-ground" />
          <div className="scene-soil" />
          <div className={`plant-wrapper ${isSinging ? 'dancing' : ''}`}>
            <img src="/images/plant.png" alt="Plant" />
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
          <div
            className="water-pour"
            style={{ left: 'calc(100% - 200px)', bottom: 68 }}
          >
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

        {song && isSinging && (
          <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-green-200">
            <p className="text-green-700 font-bold text-lg animate-pulse flex items-center gap-2">
              <span className="text-2xl">🎵</span>
              {song.title}
              <span className="text-2xl">🎵</span>
            </p>
          </div>
        )}

        <audio ref={audioRef} onEnded={stopSinging}>
          {song && (
            <source src={`http://localhost:8000${song.file}`} type="audio/mpeg" />
          )}
        </audio>
      </div>
    </div>
)
}

export default App