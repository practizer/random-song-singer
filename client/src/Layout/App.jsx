import React, { useRef, useState } from 'react'
import api from '../api/axios'
import './App.css'

const NOTES = [
  { nd: '0s',   nx:  '12px', emoji: '🎵' },
  { nd: '0.5s', nx: '-10px', emoji: '🎶' },
  { nd: '1.0s', nx:  '16px', emoji: '🎵' },
  { nd: '1.5s', nx:  '-6px', emoji: '♪'  },
]

function App() {
  const [song, setSong]           = useState(null)
  const [isSinging, setIsSinging] = useState(false)
  const audioRef = useRef(null)

  const stopSinging = () => setIsSinging(false)

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 40%, #90EE90 80%, #7CCD7C 100%)' }}>
      <h1 className="bg-linear-to-r from-green-500 via-green-400 to-emerald-500 text-white font-bold text-4xl py-6 text-center shadow-lg tracking-wide">
        🌿 The Singing Plant 🎵
      </h1>

      <div className="flex flex-col items-center mt-6 gap-5">
        <div className="scene">

          {/* Background elements */}
          <div className="scene-sun" />
          <div className="cloud cloud-1">☁️</div>
          <div className="cloud cloud-2">☁️</div>
          <div className="cloud cloud-3">☁️</div>
          <div className="scene-ground" />
          <div className="scene-soil" />

          {/* Plant with music notes */}
          <div className={`plant-wrapper ${isSinging ? 'dancing' : ''}`}>
            <img src="/images/plant.png" alt="Plant" />
            {isSinging && NOTES.map((n, i) => (
              <span
                key={i}
                className="music-note"
                style={{
                  '--nd': n.nd,
                  '--nx': n.nx,
                  top:  i % 2 === 0 ? '-10px' : '-20px',
                  left: i % 2 === 0 ? '-20px' : '60px',
                }}
              >
                {n.emoji}
              </span>
            ))}
          </div>

        </div>

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