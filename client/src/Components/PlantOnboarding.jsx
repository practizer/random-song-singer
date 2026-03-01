import { useState, useEffect, useRef } from "react";

const SPEECH_BUBBLES = [
  { text: "Psst... over here! 🌿", delay: 500 },
  { text: "Hi there! I'm your very own singing plant! 🎵", delay: 2000 },
  { text: "Before we start our musical journey together...", delay: 4200 },
  { text: "What's your name, friend? 🌸", delay: 6000 },
];

export default function PlantOnboarding({ onComplete }) {
  const [phase, setPhase] = useState("idle");
  const [bubbleIndex, setBubbleIndex] = useState(-1);
  const [currentBubble, setCurrentBubble] = useState("");
  const [typedText, setTypedText] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [farewell, setFarewell] = useState(false);
  const inputRef = useRef(null);
  
  useEffect(() => {
    const timer = setTimeout(() => setPhase("growing"), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "growing") {
      const t = setTimeout(() => setPhase("talking"), 1200);
      return () => clearTimeout(t);
    }
  }, [phase]);
  
  useEffect(() => {
    if (phase !== "talking") return;

    SPEECH_BUBBLES.forEach((bubble, i) => {
      const t = setTimeout(() => {
        setBubbleIndex(i);
        setCurrentBubble("");
        setTypedText("");
        
        let charIndex = 0;
        const typeTimer = setInterval(() => {
          if (charIndex <= bubble.text.length) {
            setCurrentBubble(bubble.text.slice(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeTimer);
            if (i === SPEECH_BUBBLES.length - 1) {
              setTimeout(() => {
                setPhase("asking");
                setTimeout(() => inputRef.current?.focus(), 100);
              }, 400);
            }
          }
        }, 35);
      }, bubble.delay);
    });
  }, [phase]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    setSubmitted(true);
    setFarewell(true);

    localStorage.setItem("plantUserName", name.trim());

    setTimeout(() => {
      onComplete(name.trim());
    }, 2800);
  };

  const farewellText = `Wonderful! Nice to meet you, ${name}! 🌺 Let's make some music together!`;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "linear-gradient(180deg, #87CEEB 0%, #B0E0E6 40%, #90EE90 80%, #7CCD7C 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        fontFamily: "'Baloo 2', cursive",
        overflow: "hidden",
      }}
    >
      {phase !== "idle" && (
        <>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: ["#FFE87C","#FF9ECD","#A8F0A0","#87CEEB","#FFD700"][i % 5],
                left: `${10 + (i * 7.3) % 82}%`,
                top: `${5 + (i * 11.7) % 60}%`,
                animation: `sparkle ${1.2 + (i % 4) * 0.4}s ease-in-out ${i * 0.2}s infinite alternate`,
                opacity: 0,
              }}
            />
          ))}
        </>
      )}
      <div style={{
        position: "absolute",
        top: 20,
        right: 40,
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: "radial-gradient(circle, #FFE87C 30%, #FFD700 70%, transparent 100%)",
        boxShadow: "0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.3)",
        animation: "sunGlow 3s ease-in-out infinite alternate",
      }} />
      <div style={{
        position: "absolute",
        top: 30,
        left: "5%",
        fontSize: "5rem",
        opacity: 0.6,
        animation: "cloudDrift 18s linear infinite",
      }}>☁️</div>
      <div style={{
        position: "absolute",
        top: 60,
        left: "30%",
        fontSize: "3.5rem",
        opacity: 0.4,
        animation: "cloudDrift 25s linear infinite",
        animationDelay: "-10s",
      }}>☁️</div>
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        background: "linear-gradient(to bottom, #4a9e55 0%, #3d8b40 30%, #2d6b30 70%, #1e4a20 100%)",
        borderRadius: "20px 20px 0 0",
        zIndex: 1,
      }} />
      <div style={{
        position: "absolute",
        bottom: 72,
        left: "50%",
        transform: "translateX(-50%)",
        width: 90,
        height: 22,
        background: "radial-gradient(ellipse, #8b5e3c 35%, #6b4226 70%, #5a3820 100%)",
        borderRadius: "50%",
        zIndex: 2,
        boxShadow: "inset 0 4px 8px rgba(0,0,0,0.3)",
      }} />
      <div style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: `translateX(-50%) ${phase === "idle" ? "translateY(200px)" : "translateY(0)"}`,
        transition: "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        {(phase === "talking" || phase === "asking") && bubbleIndex >= 0 && !farewell && (
          <div
            key={bubbleIndex}
            style={{
              position: "absolute",
              bottom: "calc(100% + 16px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "white",
              borderRadius: 20,
              padding: "14px 20px",
              minWidth: 220,
              maxWidth: 300,
              boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#2d6b30",
              textAlign: "center",
              whiteSpace: "pre-wrap",
              animation: "bubblePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 20,
            }}
          >
            {currentBubble}
            <div style={{
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "14px solid white",
            }} />
          </div>
        )}
        {phase === "asking" && !submitted && (
          <div style={{
            position: "absolute",
            bottom: "calc(100% + 16px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            borderRadius: 20,
            padding: "16px 20px",
            minWidth: 260,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            animation: "bubblePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both",
            zIndex: 21,
          }}>
            <p style={{ margin: "0 0 12px", color: "#2d6b30", fontWeight: 700, fontSize: "0.95rem", textAlign: "center" }}>
              What's your name? 🌸
            </p>
            <input
              ref={inputRef}
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="Type your name..."
              style={{
                width: "100%",
                border: "2px solid #6bcb77",
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: "1rem",
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 600,
                color: "#2d6b30",
                outline: "none",
                background: "#f0fdf4",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "#2d6b30"}
              onBlur={e => e.target.style.borderColor = "#6bcb77"}
            />
            <button
              onClick={handleSubmit}
              disabled={!name.trim()}
              style={{
                marginTop: 10,
                width: "100%",
                background: name.trim()
                  ? "linear-gradient(135deg, #4a9e55, #6bcb77)"
                  : "#ccc",
                color: "white",
                border: "none",
                borderRadius: 12,
                padding: "10px",
                fontSize: "1rem",
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 700,
                cursor: name.trim() ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                transform: name.trim() ? "scale(1)" : "scale(0.98)",
              }}
              onMouseEnter={e => name.trim() && (e.target.style.transform = "scale(1.03)")}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              Nice to meet you! 🌿
            </button>
            <div style={{
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "14px solid white",
            }} />
          </div>
        )}
        {farewell && (
          <div style={{
            position: "absolute",
            bottom: "calc(100% + 16px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #e8fff0, white)",
            borderRadius: 20,
            padding: "16px 22px",
            minWidth: 260,
            maxWidth: 320,
            boxShadow: "0 8px 32px rgba(76,175,80,0.25)",
            fontSize: "1rem",
            fontWeight: 700,
            color: "#2d6b30",
            textAlign: "center",
            animation: "bubblePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 22,
            border: "2px solid #a8e6b0",
          }}>
            {farewellText}
            <div style={{
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "14px solid white",
            }} />
          </div>
        )}
        <div style={{
          animation: phase === "talking" || phase === "asking"
            ? "plantBounce 1.2s ease-in-out infinite alternate"
            : "none",
        }}>
          <img
            src="/images/plant.png"
            alt="Plant"
            style={{
              height: 150,
              display: "block",
              transformOrigin: "bottom center",
              filter: "drop-shadow(3px 6px 10px rgba(0,0,0,0.2))",
            }}
          />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&display=swap');

        @keyframes sunGlow {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes cloudDrift {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(110vw); }
        }
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0.5) rotate(0deg); }
          100% { opacity: 0.9; transform: scale(1.5) rotate(180deg); }
        }
        @keyframes bubblePop {
          0% { opacity: 0; transform: translateX(-50%) scale(0.7); }
          70% { transform: translateX(-50%) scale(1.05); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        @keyframes plantBounce {
          0% { transform: rotate(-4deg) translateY(0); }
          50% { transform: rotate(0deg) translateY(-8px); }
          100% { transform: rotate(4deg) translateY(0); }
        }
      `}</style>
    </div>
  );
}