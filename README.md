# 🎮 Math Fast - Multiplayer Math Game

A fast-paced, interactive multiplayer math game where players compete against each other in real-time using WebSockets. Test your math skills and speed!

## 📋 Features

- **Real-time Multiplayer**: Connect multiple players via WebSocket
- **Dynamic Game Matchmaking**: Automatically starts 10-second countdown when 2+ players join
- **10 Rounds of Questions**: Each game consists of 10 configurable rounds
- **Speed Bonuses**: Earn additional points based on answer speed
- **Basic Math Operations**: Addition, subtraction, multiplication, and division
- **Real-time Scoring**: Live leaderboard showing individual player scores
- **Beautiful UI**: Modern interface built with Next.js, Tailwind CSS, and shadcn components

## 🏗️ Architecture

The project consists of two separate services:

### **1. WebSocket Server** (Express.js) - Port 8080

- Manages game logic and state
- Handles WebSocket connections
- Distributes questions to all players
- Calculates scores and leaderboards
- Endpoint: `ws://localhost:8080`

### **2. Frontend Client** (Next.js) - Port 3000

- Interactive game UI built with React
- Real-time updates from WebSocket server
- Styled with Tailwind CSS and shadcn components
- Endpoint: `http://localhost:3000`

The client connects to the WebSocket server from port 3000 to port 8080.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Server Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:

```env
PORT=8080              # Server port
MAX_ANSWER=100         # Maximum answer value for questions
ROUNDS_PER_GAME=10     # Number of rounds per game
COUNTDOWN_SECONDS=10   # Countdown duration before game starts
```

5. Start the server:

```bash
npm run dev
```

The server will be running on `http://localhost:8080`

6. Open your browser and navigate to `http://localhost:8080`

## 🎮 How to Play

1. **Create/Join a Game**:
   - Generate a unique Game ID or use an existing one
   - Share the Game ID with friends

2. **Wait for Players**:
   - Once 2 or more players join, a 10-second countdown begins

3. **Answer Questions**:
   - A math question appears on your screen
   - Type your answer and press Enter or click Submit
   - Speed matters! Faster correct answers earn bonus points

4. **Score Calculation**:
   - **Correct Answer**: +10 points
   - **Speed Bonus**: Up to +10 bonus points (max 2 seconds)

5. **Continue**:
   - After each round, players can choose to play again
   - Game continues for 10 rounds (configurable)

6. **Final Results**:
   - View final leaderboard with rankings
   - Play again or exit

## 📊 Scoring System

- **Base Points**: 10 points for a correct answer
- **Speed Bonus**: Up to 10 bonus points for answering quickly
  - Answered in < 2 seconds: Full 10 bonus points
  - 2+ seconds: Decreases by 1 point per 200ms

Example:

- Correct answer in 0.5 seconds: 10 + 10 = 20 points
- Correct answer in 2 seconds: 10 + 0 = 10 points
- Incorrect answer: 0 points (no speed bonus)

## 🔧 Configuration

### Environment Variables

**Server (.env)**:

- `PORT`: Server port (default: 8080)
- `MAX_ANSWER`: Maximum value for math answers (default: 100)
- `ROUNDS_PER_GAME`: Number of questions per game (default: 10)
- `COUNTDOWN_SECONDS`: Countdown duration (default: 10)

## 📝 WebSocket Message Protocol

### Client-to-Server Messages

```typescript
// Join a game
{ type: 'join-game', gameId: string }

// Submit an answer
{ type: 'submit-answer', gameId: string, answer: number }

// Ready for next round
{ type: 'play-again', gameId: string }
```

### Server-to-Client Messages

```typescript
// Game state updates
{ type: 'countdown-update', value: number }
{ type: 'round-start', round: number, totalRounds: number, question: string }
{ type: 'round-end', correctAnswer: number, results: PlayerResult[] }
{ type: 'game-finished', finalScores: FinalScore[] }

// Player updates
{ type: 'player-joined', playerId: string, totalPlayers: number }
{ type: 'player-left', playerId: string, remainingPlayers: string[] }
```

## 🛠️ Tech Stack

### Server

- **Express.js**: Web framework
- **ws**: WebSocket library
- **dotenv**: Environment variable management

### Client

- **Next.js 14**: React framework
- **React 18**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library
- **TypeScript**: Type safety

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚨 Troubleshooting

### WebSocket Connection Fails

- Ensure the server is running on the correct port (8081)
- Check firewall settings
- Verify `NEXT_PUBLIC_WS_URL` is correct in client

### Questions are Too Easy/Hard

- Adjust `MAX_ANSWER` environment variable on the server
- Restart the server after making changes

### Game Doesn't Start

- Ensure at least 2 players have joined
- Check browser console for errors
- Verify network connectivity

## 📄 License

This project is provided as-is for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 💡 Future Features

- [ ] Difficulty levels (easy, medium, hard)
- [ ] Different game modes (time attack, survival)
- [ ] User authentication and profiles
- [ ] Game history and statistics
- [ ] Sound effects and animations
- [ ] Mobile app version
- [ ] Leaderboard rankings
- [ ] Custom questions
- [ ] Tournament mode
