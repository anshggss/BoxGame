# 🟥 Box Game

A real-time multiplayer platformer game built with HTML5 Canvas, Socket.IO, and Node.js. Players jump across platforms to collect a pulsing target — whoever collects the most wins the room.

![Box Game Banner](./client/icon.png)

---

## ✨ Features

- **Real-time multiplayer** — rooms support up to 20 players simultaneously
- **Private rooms** — create a room and share the code with friends
- **Live leaderboard** — score rankings update in real time
- **Delta-state networking** — only changed state is broadcast each tick, keeping bandwidth minimal
- **Spatial grid collision** — O(1) platform lookup for server-side physics
- **Particle system** — pooled, zero-allocation particle effects on the client
- **Configurable tick rate** — server tick rate is tunable via environment variable

---

## 🗂️ Architecture

```
BoxGame/
├── client/         # Static frontend (HTML + Canvas + Socket.IO client)
│   ├── index.html
│   ├── index.js    # Lobby, socket connection, HUD logic
│   ├── game.js     # Canvas rendering, particles, input handling
│   └── styles.css
│
├── server/         # Game server (Node.js + Express + Socket.IO)
│   ├── server.js   # Physics loop, room management, socket events
│   └── Dockerfile
│
└── gateway/        # Optional auth/routing gateway (Bun + TypeScript + Redis)
    ├── index.ts
    └── routes/
        ├── addToRoom.ts
        └── removeFromRoom.ts
```

### How it works

1. A player opens the client, enters a name, and **creates or joins** a room via the gateway/server.
2. The game server runs a fixed-interval **physics loop** at the configured tick rate (default 120 Hz).
3. Each tick the server broadcasts a **delta-state** diff to clients; a full sync is sent every ~2 seconds.
4. The client renders at `requestAnimationFrame` speed, interpolating the received state.

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| npm | ≥ 9 |
| Bun *(gateway only)* | ≥ 1.1 |
| Redis *(gateway only)* | ≥ 7 |
| Docker *(optional)* | ≥ 24 |

### 1. Clone the repository

```bash
git clone https://github.com/your-username/BoxGame.git
cd BoxGame
```

### 2. Start the game server

```bash
cd server
npm install
node server.js
```

The server listens on `http://localhost:3000` by default.

**Environment variables (`server/.env`):**

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`   | `3000`  | HTTP port   |
| `TICK`   | `120`   | Game tick rate (Hz) |

### 3. Serve the client

The `client/` directory is plain static HTML — serve it with any static file server:

```bash
# Using npx serve
npx serve client/

# Using Python
python3 -m http.server 8080 --directory client/
```

Then open `http://localhost:8080` in your browser.

> **Important:** Update the Socket.IO server URL in `client/index.js` to point to your running game server.

### 4. (Optional) Start the gateway

The gateway provides a Redis-backed routing layer for assigning players to rooms.

```bash
cd gateway
bun install

# Set environment variables
export REDIS_URL=redis://localhost:6379
export PORT=4000

bun run index.ts
```

### 5. Docker (server only)

```bash
cd server
docker build -t boxgame-server .
docker run -p 6000:6000 boxgame-server
```

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| `←` / `A` | Move left |
| `→` / `D` | Move right |
| `↑` / `W` / `Space` | Jump |

---

## 🔧 Configuration

### Game constants (`server/server.js`)

| Constant | Default | Description |
|----------|---------|-------------|
| `gravity` | `0.5` | Downward acceleration per tick |
| `jumpPower` | `-15` | Vertical velocity applied on jump |
| `PLAYER_SPEED` | `3` | Horizontal movement speed |
| `MAX_PLAYERS_PER_ROOM` | `20` | Hard cap per room |

---

## 🤝 Contributing

Contributions are very welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.
