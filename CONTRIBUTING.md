# Contributing to Box Game

Thank you for considering contributing to Box Game! This document explains how to get involved — from reporting bugs to submitting pull requests.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Style Guide](#style-guide)
- [Commit Messages](#commit-messages)

---

## Code of Conduct

This project follows a simple rule: **be kind and constructive**. Harassment, discrimination, or hostile behaviour of any kind won't be tolerated. If you experience or witness unacceptable behaviour, open an issue or reach out to a maintainer.

---

## How Can I Contribute?

### Reporting Bugs

1. **Search existing issues** first — the bug may already be tracked.
2. If not found, open a **new issue** and include:
   - A clear, descriptive title
   - Steps to reproduce (be as specific as possible)
   - Expected vs. actual behaviour
   - Browser / OS / Node.js / Bun version
   - Screenshots or console output if relevant

### Suggesting Enhancements

Open an issue with the label `enhancement`. Describe:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you considered

### Your First Code Contribution

Look for issues tagged **`good first issue`** — these are small, well-scoped tasks with clear acceptance criteria, ideal for getting familiar with the codebase.

### Pull Requests

1. **Fork** the repository and create your branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes (see [Style Guide](#style-guide)).
3. **Test** your changes locally before submitting.
4. Open a PR against the `main` branch of the original repo.
5. Fill in the PR template:
   - What does this PR do?
   - How was it tested?
   - Screenshots (for UI changes)
6. A maintainer will review and may request changes. Please respond promptly.

> **One concern per PR.** Large, unrelated changes are harder to review and slower to merge.

---

## Development Setup

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| npm | ≥ 9 |
| Bun *(gateway only)* | ≥ 1.1 |
| Redis *(gateway only)* | ≥ 7 |

### Steps

```bash
# 1. Fork and clone
git clone https://github.com/your-username/BoxGame.git
cd BoxGame

# 2. Start the game server
cd server
npm install
node server.js       # or: PORT=3000 TICK=120 node server.js

# 3. Serve the client (in a separate terminal)
npx serve ../client  # open http://localhost:3000

# 4. (Optional) start the gateway
cd ../gateway
bun install
REDIS_URL=redis://localhost:6379 bun run index.ts
```

### Making changes

| Component | Entry point | Hot-reload? |
|-----------|------------|-------------|
| Client | `client/index.html` | Refresh browser |
| Server | `server/server.js` | `npx nodemon server.js` |
| Gateway | `gateway/index.ts` | `bun --hot index.ts` |

---

## Project Structure

```
BoxGame/
├── client/         # Frontend — plain HTML5 Canvas, no build step
│   ├── game.js     # Rendering, particles, input
│   ├── index.js    # Socket events, lobby UI
│   └── styles.css
│
├── server/         # Game server — Node.js + Socket.IO
│   └── server.js   # Physics, room management
│
└── gateway/        # Optional gateway — Bun + TypeScript + Redis
    └── routes/
```

---

## Style Guide

This project does **not** use a linter or formatter yet — just match the conventions already in the file you're editing.

### JavaScript (client & server)

- Use `let`/`const`, never `var`
- Prefer early returns to deeply nested `if` blocks
- Comment non-obvious logic (physics tricks, performance hacks, etc.)
- Keep functions small and focused
- Performance-sensitive paths (game loop, particle pool) should avoid heap allocations — re-use arrays and objects where possible

### TypeScript (gateway)

- Strict mode is enabled — no `any` without a comment explaining why
- Prefer explicit return types on exported functions
- Use Bun-native APIs (`Bun.serve`, `bun:sqlite`, etc.) over npm equivalents where available

### HTML/CSS

- Semantic elements where appropriate (`<button>`, `<label>`, `<canvas>`)
- CSS custom properties for colours and spacing values

---

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body]
[optional footer]
```

**Types:**

| Type | When to use |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `perf` | Performance improvement |
| `refactor` | Code change that's neither a fix nor feature |
| `docs` | Documentation only |
| `chore` | Build/tooling/config changes |
| `style` | Formatting, no logic change |

**Examples:**

```
feat(server): add spectator mode for full rooms
fix(client): prevent score popup from rendering off-screen
perf(server): replace linear platform scan with spatial grid
docs: add CONTRIBUTING guide
```

---

Thank you for helping make Box Game better! 🟥
