import { useState, useEffect, useRef } from "react";

const PLANTS = [
  {
    id: "normal",
    src: "/images/normal.png",
    label: "Leafy",
    emoji: "🌿",
    tagline: "Classic & cheerful",
    color: "#4a9e55",
    light: "#e8fff0",
  },
  {
    id: "bonsai",
    src: "/images/bonsai.png",
    label: "Bonsai",
    emoji: "🎋",
    tagline: "Wise & graceful",
    color: "#6b7c3a",
    light: "#f4f7e8",
  },
  {
    id: "cactus",
    src: "/images/cactus.png",
    label: "Cactus",
    emoji: "🌵",
    tagline: "Bold & resilient",
    color: "#5a8a4a",
    light: "#edfaed",
  },
  {
    id: "rose",
    src: "/images/rose.png",
    label: "Rose",
    emoji: "🌹",
    tagline: "Elegant & romantic",
    color: "#b04a6a",
    light: "#ffeef4",
  },
];

const SPEECH_BUBBLES = [
  { text: "Well hello there! 👋", delay: 400 },
  { text: "I'm so happy you picked me!", delay: 1800 },
  { text: "Before we begin our adventure together...", delay: 3600 },
  { text: "What should I call you? 🌸", delay: 5400 },
];

export default function PlantOnboarding({ onComplete }) {
  const [step, setStep] = useState("select");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [hoveredPlant, setHoveredPlant] = useState(null);
  const [phase, setPhase] = useState("idle");
  const [bubbleIndex, setBubbleIndex] = useState(-1);
  const [currentBubble, setCurrentBubble] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [farewell, setFarewell] = useState(false);
  const [selectVisible, setSelectVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setSelectVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handlePlantConfirm = () => {
    if (!selectedPlant) return;
    setStep("name");
    setTimeout(() => setPhase("growing"), 200);
    setTimeout(() => setPhase("talking"), 1400);
  };

  useEffect(() => {
    if (phase !== "talking") return;

    SPEECH_BUBBLES.forEach((bubble, i) => {
      const t = setTimeout(() => {
        setBubbleIndex(i);
        setCurrentBubble("");
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
        }, 36);
      }, bubble.delay);
    });
  }, [phase]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    setSubmitted(true);
    setFarewell(true);
    localStorage.setItem("plantUserName", name.trim());
    localStorage.setItem("plantType", selectedPlant.id);
    setTimeout(() => onComplete(name.trim(), selectedPlant.id), 2600);
  };

  const plant = selectedPlant || PLANTS[0];
  const accentColor = selectedPlant?.color || "#4a9e55";

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      background: "linear-gradient(160deg, #e8f5e9 0%, #f0fdf4 40%, #dff0ff 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Baloo 2', cursive",
      overflow: "hidden",
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.88); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes plantRise {
          from { transform: translateY(120px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes plantBounce {
          0% { transform: rotate(-3deg) translateY(0); }
          50% { transform: rotate(0deg) translateY(-7px); }
          100% { transform: rotate(3deg) translateY(0); }
        }
        @keyframes bubblePop {
          0% { opacity: 0; transform: translateX(-50%) scale(0.75); }
          65% { transform: translateX(-50%) scale(1.04); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        @keyframes bubblePopCenter {
          0% { opacity: 0; transform: scale(0.75); }
          65% { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes cardHover {
          from { transform: translateY(0) scale(1); }
          to { transform: translateY(-6px) scale(1.03); }
        }
        @keyframes sparkFloat {
          0% { opacity: 0; transform: translateY(0) scale(0); }
          30% { opacity: 1; transform: translateY(-12px) scale(1); }
          100% { opacity: 0; transform: translateY(-28px) scale(0.5); }
        }
        .plant-card {
          cursor: pointer;
          border-radius: 20px;
          padding: 20px 16px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease, border-color 0.2s ease;
          border: 2.5px solid transparent;
          background: white;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          position: relative;
          overflow: hidden;
        }
        .plant-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 12px 32px rgba(0,0,0,0.12);
        }
        .plant-card.selected {
          box-shadow: 0 8px 28px rgba(0,0,0,0.14);
        }
        .confirm-btn {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, opacity 0.2s;
        }
        .confirm-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        }
        .confirm-btn:active:not(:disabled) {
          transform: scale(0.97);
        }
        .name-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-light);
        }
      `}</style>

      {step === "select" && (
        <div style={{
          width: "100%",
          maxWidth: 620,
          padding: "0 24px",
          opacity: selectVisible ? 1 : 0,
          transform: selectVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              fontSize: "2.6rem",
              fontWeight: 800,
              color: "#1a3a1e",
              lineHeight: 1.15,
              animation: "fadeUp 0.6s ease 0.1s both",
            }}>
              Choose Your Plant
            </div>
            <div style={{
              fontSize: "1rem",
              color: "#6b8f6e",
              marginTop: 8,
              fontWeight: 500,
              animation: "fadeUp 0.6s ease 0.25s both",
            }}>
              Pick a companion for your musical journey 🎵
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
            animation: "fadeUp 0.6s ease 0.35s both",
          }}>
            {PLANTS.map((p) => {
              const isSelected = selectedPlant?.id === p.id;
              return (
                <div
                  key={p.id}
                  className={`plant-card${isSelected ? " selected" : ""}`}
                  style={{
                    borderColor: isSelected ? p.color : "transparent",
                    background: isSelected ? p.light : "white",
                  }}
                  onClick={() => setSelectedPlant(p)}
                  onMouseEnter={() => setHoveredPlant(p.id)}
                  onMouseLeave={() => setHoveredPlant(null)}
                >
                  {isSelected && (
                    <div style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: p.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      color: "white",
                      fontWeight: 700,
                      animation: "scaleIn 0.2s ease",
                    }}>✓</div>
                  )}

                  <div style={{
                    width: 80,
                    height: 90,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}>
                    <img
                      src={p.src}
                      alt={p.label}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.15))",
                        transform: isSelected ? "scale(1.08)" : "scale(1)",
                        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: isSelected ? p.color : "#2d4a30",
                      transition: "color 0.2s",
                    }}>
                      {p.emoji} {p.label}
                    </div>
                    <div style={{
                      fontSize: "0.72rem",
                      color: "#8aaa8d",
                      marginTop: 2,
                      fontWeight: 500,
                    }}>
                      {p.tagline}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            marginTop: 28,
            display: "flex",
            justifyContent: "center",
            animation: "fadeUp 0.6s ease 0.5s both",
          }}>
            <button
              className="confirm-btn"
              onClick={handlePlantConfirm}
              disabled={!selectedPlant}
              style={{
                background: selectedPlant
                  ? `linear-gradient(135deg, ${selectedPlant.color}, ${selectedPlant.color}cc)`
                  : "#d1d5db",
                color: "white",
                border: "none",
                borderRadius: 50,
                padding: "14px 40px",
                fontSize: "1.05rem",
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 700,
                cursor: selectedPlant ? "pointer" : "not-allowed",
                opacity: selectedPlant ? 1 : 0.6,
                letterSpacing: "0.3px",
              }}
            >
              {selectedPlant ? `Start with ${selectedPlant.emoji} ${selectedPlant.label}  →` : "Select a plant to continue"}
            </button>
          </div>
        </div>
      )}

      {step === "name" && (
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          height: "100%",
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #87CEEB 0%, #B0E0E6 40%, #90EE90 80%, #7CCD7C 100%)",
        }}>
          <div style={{
            position: "absolute",
            top: 18,
            right: 36,
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "radial-gradient(circle, #FFE87C 30%, #FFD700 70%, transparent 100%)",
            boxShadow: "0 0 40px rgba(255,215,0,0.5), 0 0 80px rgba(255,215,0,0.25)",
          }} />

          {["☁️","☁️","☁️"].map((c, i) => (
            <div key={i} style={{
              position: "absolute",
              fontSize: ["4rem","2.8rem","2rem"][i],
              top: [24, 50, 14][i],
              left: ["-5%","-8%","-3%"][i],
              opacity: [0.55, 0.35, 0.45][i],
              animation: `cloudDrift ${[18, 26, 22][i]}s linear infinite`,
              animationDelay: [`0s`, `-9s`, `-15s`][i],
            }}>{c}</div>
          ))}

          <style>{`
            @keyframes cloudDrift {
              from { transform: translateX(-150px); }
              to { transform: translateX(110vw); }
            }
          `}</style>

          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 76,
            background: "linear-gradient(to bottom, #4a9e55 0%, #3d8b40 30%, #2d6b30 70%, #1e4a20 100%)",
            zIndex: 1,
          }} />

          <div style={{
            position: "absolute",
            bottom: 68,
            left: "50%",
            transform: "translateX(-50%)",
            width: 88,
            height: 20,
            background: "radial-gradient(ellipse, #8b5e3c 35%, #6b4226 70%, #5a3820 100%)",
            borderRadius: "50%",
            zIndex: 2,
            boxShadow: "inset 0 4px 8px rgba(0,0,0,0.3)",
          }} />

          <div style={{
            position: "absolute",
            bottom: 74,
            left: "50%",
            transform: phase === "idle"
              ? "translateX(-50%) translateY(180px)"
              : "translateX(-50%) translateY(0)",
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
                  bottom: "calc(100% + 14px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "white",
                  borderRadius: 18,
                  padding: "12px 20px",
                  minWidth: 210,
                  maxWidth: 290,
                  boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#1a3a1e",
                  textAlign: "center",
                  animation: "bubblePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  zIndex: 20,
                  whiteSpace: "pre-wrap",
                }}
              >
                {currentBubble}
                <div style={{
                  position: "absolute",
                  bottom: -11,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "9px solid transparent",
                  borderRight: "9px solid transparent",
                  borderTop: "13px solid white",
                }} />
              </div>
            )}

            {phase === "asking" && !submitted && (
              <div style={{
                position: "absolute",
                bottom: "calc(100% + 14px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "white",
                borderRadius: 20,
                padding: "18px 20px",
                minWidth: 268,
                boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
                animation: "bubblePop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s both",
                zIndex: 21,
              }}>
                <p style={{
                  margin: "0 0 12px",
                  color: "#1a3a1e",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textAlign: "center",
                }}>
                  What's your name? 🌸
                </p>
                <input
                  ref={inputRef}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  placeholder="Your name..."
                  className="name-input"
                  style={{
                    "--accent": accentColor,
                    "--accent-light": `${accentColor}22`,
                    width: "100%",
                    border: `2px solid #d1d5db`,
                    borderRadius: 12,
                    padding: "10px 14px",
                    fontSize: "1rem",
                    fontFamily: "'Baloo 2', cursive",
                    fontWeight: 600,
                    color: "#1a3a1e",
                    background: "#f9fafb",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!name.trim()}
                  className="confirm-btn"
                  style={{
                    marginTop: 10,
                    width: "100%",
                    background: name.trim()
                      ? `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`
                      : "#e5e7eb",
                    color: name.trim() ? "white" : "#9ca3af",
                    border: "none",
                    borderRadius: 12,
                    padding: "11px",
                    fontSize: "0.95rem",
                    fontFamily: "'Baloo 2', cursive",
                    fontWeight: 700,
                    cursor: name.trim() ? "pointer" : "not-allowed",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  Let's go! 🌿
                </button>
                <div style={{
                  position: "absolute",
                  bottom: -11,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "9px solid transparent",
                  borderRight: "9px solid transparent",
                  borderTop: "13px solid white",
                }} />
              </div>
            )}

            {farewell && (
              <div style={{
                position: "absolute",
                bottom: "calc(100% + 14px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "white",
                borderRadius: 20,
                padding: "16px 22px",
                minWidth: 260,
                maxWidth: 310,
                boxShadow: `0 8px 32px ${accentColor}33`,
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#1a3a1e",
                textAlign: "center",
                animation: "bubblePop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                zIndex: 22,
                border: `2px solid ${accentColor}44`,
              }}>
                {`Wonderful! Nice to meet you, ${name}! 🌺`}
                <br />
                <span style={{ fontWeight: 500, fontSize: "0.88rem", color: "#6b8f6e" }}>
                  Let's make some music together!
                </span>
                <div style={{
                  position: "absolute",
                  bottom: -11,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "9px solid transparent",
                  borderRight: "9px solid transparent",
                  borderTop: "13px solid white",
                }} />
              </div>
            )}

            <div style={{
              animation: (phase === "talking" || phase === "asking")
                ? "plantBounce 1.3s ease-in-out infinite alternate"
                : "none",
            }}>
              <img
                src={selectedPlant?.src || "/images/normal.png"}
                alt="Your plant"
                style={{
                  height: 148,
                  display: "block",
                  transformOrigin: "bottom center",
                  filter: "drop-shadow(3px 6px 12px rgba(0,0,0,0.18))",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}