# 🌿 The Singing Plant 🎵

> **Water your plant, and it sings for you.** A whimsical, animated full-stack web app where a musical companion plant greets you every visit, comes alive with animation when watered, and rewards you with a song.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=flat-square&logo=tailwindcss)
![Go](https://img.shields.io/badge/Go-Backend-00ADD8?style=flat-square&logo=go)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ✨ Features

### 🌱 Plant Onboarding
- **Plant Selection** — Choose from 4 unique companions: Leafy 🌿, Bonsai 🎋, Cactus 🌵, or Rose 🌹
- **Animated Introduction** — After picking your plant, it rises from the soil with a bounce animation
- **Typewriter Speech Bubbles** — The plant introduces itself with a multi-step typewriter-effect conversation
- **Name Entry** — Enter your name so your plant can greet you personally every visit
- **Persistent Storage** — Your plant type and name are saved to `localStorage` — no account needed

### 💬 Welcome Greeting (Every Visit)
- On every page load, your plant greets you with an animated speech bubble
- **5 rotating random messages** like:
  - *"I'm so happy to see you! 🌟"*
  - *"Water me and I'll sing for you! 🎵"*
  - *"I missed you! Let's sing! 🌿"*
- **Typewriter effect** types the message out character by character
- Bubble **auto-dismisses** after 4 seconds, or instantly when you click Water Plant

### 💧 Watering Animation
- Clicking **💧 Water Plant** triggers a full 10-second animated sequence:
  - A detailed CSS character (the boy) walks in from the left carrying a watering can
  - He walks up to your plant, tilts the can, and water streams and splashes out
  - Water drops, splashes, and ripple rings are all CSS-animated
  - The boy walks back off-screen when done
- The button is disabled during animation to prevent overlap

### 🎵 Singing & Music
- After watering, the plant **dances** (groove animation with rotation and bounce)
- **Floating music notes** (🎵 🎶 ♪) rise from the plant while it sings
- A **random song** is fetched from the backend API and played via the HTML5 audio element
- Music plays automatically and the dance stops when the song ends

### 🎨 Animated Scene
- **Scrolling clouds** drift across the sky continuously
- **Glowing sun** pulses with a soft radial glow animation in the top-right
- **60 individual grass blades**, each with randomized height, width, color, sway speed, and lean angle — all swaying in a breeze
- **Soil mound** beneath your plant with a radial gradient and inner shadow
- Fully responsive layout — adapts from desktop down to 360px mobile

### 🌍 Responsive Design
- Scene scales gracefully across all screen sizes using `clamp()` and media queries
- Character and plant scale down on mobile using `transform: scale()`
- Breakpoints at 768px, 480px, and 360px

---

## 🗂 Project Structure

```
singing-plant/
│
├── client/                           # React frontend (Vite)
│   ├── public/
│   │   └── images/
│   │       ├── normal.png            # Leafy plant
│   │       ├── bonsai.png            # Bonsai plant
│   │       ├── cactus.png            # Cactus plant
│   │       └── rose.png              # Rose plant
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js              # Axios instance pointed at Go backend
│   │   ├── components/
│   │   │   └── PlantOnboarding.jsx   # Multi-step plant + name selection flow
│   │   ├── layout/
│   │   │   ├── App.jsx               # Main app, scene, watering logic, welcome bubble
│   │   │   └── App.css               # All scene, character, and animation styles
│   │   ├── index.css                 # Global styles
│   │   └── main.jsx                  # React entry point
│   ├── .env                          # Environment variables
│   ├── .env.development              # Dev-specific env vars
│   ├── .env.production               # Production env vars
│   ├── index.html                    # HTML shell
│   ├── tailwind.config.js            # Tailwind configuration
│   ├── eslint.config.js              # ESLint rules
│   └── package.json                  # Frontend dependencies
│
└── server/                           # Go backend
    ├── handlers/
    │   └── song_handler.go           # HTTP handler — picks and serves a random song
    ├── middlewares/                   # CORS and other middleware
    ├── models/
    │   └── song.go                   # Song struct definition
    ├── routes/
    │   └── routes.go                 # Route registration
    ├── songs/                        # Audio files
    │   ├── song1.mp3
    │   ├── song2.mp3
    │   └── song10.mp3
    ├── main.go                       # Server entry point
    ├── go.mod                        # Go module definition
    └── go.sum                        # Dependency checksums
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **Go** 1.21+

---

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/singing-plant.git
cd singing-plant/client

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The frontend runs on **http://localhost:5173** by default (Vite).

> **Environment Variables** — create or update `client/.env.development`:
> ```env
> VITE_API_URL=http://localhost:8000
> ```

---

### Backend Setup

```bash
cd singing-plant/server

# Download Go dependencies
go mod tidy

# Run the server
go run main.go
```

The Go server runs on **http://localhost:8000**.

---

### Adding Songs

Drop `.mp3` files into `server/songs/`. The `/random-song` endpoint picks one at random and returns its path. The frontend streams it directly from the Go server.

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/random-song` | Returns a random song's filename and path |

**Example Response:**
```json
{
  "file": "/songs/forest-lullaby.mp3",
  "name": "forest-lullaby"
}
```

The frontend loads the audio as:
```
http://localhost:8000{song.file}
```

---

## 🧩 Component Overview

### `App.jsx`
The root component. Manages:
- Onboarding visibility state
- Welcome bubble display on every load
- Watering animation trigger + timing
- Song fetching and audio playback
- The full animated scene (sky, sun, clouds, grass, soil, plant, boy character, water pour)

### `WelcomeBubble` (inside `App.jsx`)
An inline component that:
- Shows on every page load after onboarding is complete
- Picks a random message from `WELCOME_MESSAGES[]`
- Types it out character by character
- Auto-dismisses after 4s or on water button click

### `PlantOnboarding.jsx`
A full-screen overlay with two steps:
1. **Select** — 4-plant card grid with hover, selection highlight, and confirm button
2. **Name** — Animated scene where the chosen plant rises, talks via speech bubbles, and asks for your name

---

## 🎨 Animation Highlights

| Animation | Implementation |
|-----------|---------------|
| Boy walking | `@keyframes boyTravel` — absolute `left` position transition |
| Legs & arms | Alternating `rotate()` keyframes synced across 10s |
| Watering can tilt | `@keyframes canTilt` — rotates -85° at peak |
| Water stream | `streamWobble` — skew + scaleX for fluid look |
| Water drops | `dropFall` — translateY + scaleY squash/stretch |
| Splashes | `splashOut` — radial scatter using `--sx` CSS vars |
| Ripples | `rippleGrow` — scale outward + fade |
| Plant dancing | `plantGroove` — rotate + translateY + scaleX rhythm |
| Music notes | `floatNote` — rise, rotate, fade out loop |
| Grass swaying | `bladeSway` — per-blade `--lean` + `--duration` CSS vars |
| Speech bubble | `bubblePop` — scale spring with cubic-bezier |
| Sun glow | `sunGlow` — scale + box-shadow pulse |
| Clouds | `cloudFloat` — translateX across full viewport |

---

## 💾 Local Storage Keys

| Key | Value | Description |
|-----|-------|-------------|
| `plantUserName` | `string` | The user's entered name |
| `plantType` | `"normal"` \| `"bonsai"` \| `"cactus"` \| `"rose"` | Selected plant ID |

Clearing these keys resets the app and triggers onboarding again on next visit.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 |
| Styling | Tailwind CSS + Custom CSS |
| Animations | Pure CSS Keyframes |
| HTTP Client | Axios |
| Build Tool | Vite |
| Font | Baloo 2 (Google Fonts) |
| Backend | Go (Golang) |
| Routing | Go standard `net/http` + custom router |
| Audio | HTML5 `<audio>` element |

---

## 🌱 Customization

### Add More Plants
In `PlantOnboarding.jsx`, add an entry to the `PLANTS` array:
```js
{
  id: "sunflower",
  src: "/images/sunflower.png",
  label: "Sunflower",
  emoji: "🌻",
  tagline: "Bright & cheerful",
  color: "#e8a020",
  light: "#fffde8",
}
```
Then add `sunflower.png` to `public/images/`.

### Change Welcome Messages
In `App.jsx`, edit the `WELCOME_MESSAGES` array:
```js
const WELCOME_MESSAGES = [
  "Your custom greeting here! 🌟",
  // ...
]
```

### Change Boy Character Colors
In `App.css`, update the CSS variables:
```css
:root {
  --boy-skin: #f5c5a3;
  --boy-shirt: #4a90d9;
  --boy-pants: #2c3e6b;
  --boy-hair: #3b2314;
}
```

---

## 📸 Screenshots

| Onboarding — Plant Select | Onboarding — Name Entry |
|:---:|:---:|
| *(Plant grid with 4 cards)* | *(Plant rises and talks)* |

| Main Scene | Watering Animation |
|:---:|:---:|
| *(Plant with welcome bubble)* | *(Boy walks in and waters)* |

---

## 📄 License

MIT License — feel free to fork, remix, and grow your own singing plant. 🌿

---

## 🙏 Acknowledgements

- [Baloo 2](https://fonts.google.com/specimen/Baloo+2) — the font that makes everything feel warm and playful
- [Go](https://go.dev/) — for the blazingly fast and simple backend
- [Tailwind CSS](https://tailwindcss.com/) — for utility-first styling
- [Vite](https://vitejs.dev/) — for the lightning-fast dev experience
- Every plant that has ever put up with someone forgetting to water them 🪴

---

<p align="center">Made with 💚 and a little bit of rain</p>
