# 🚗 Kiwi Roadtrip Games - Debug Divas

A collection of interactive road trip-themed mini-games designed for entertainment during travel. Created by the Debug Divas team for the 2025 SESA x WDCC Hackathon.

## 🎮 Overview

This project is a web-based game collection featuring three distinct mini-games accessible through a central animated map interface. Players embark on a virtual road trip, stopping at different locations to play engaging games while a countdown timer tracks their journey time.

## 🎯 Games Included

### 1. 🍰 Cake Baking Adventure
A three-stage sequential cooking game that teaches the cake-making process:

- **Mixing Stage**: Drag and drop ingredients (milk, sugar, flour) into a bowl and stir with a whisk
- **Baking Stage**: Place the cake in the oven using drag-and-drop, wait for baking, then remove with oven mitts
- **Decorating Stage**: Freely decorate your cake with various toppings and decorations

**Skills**: Hand-eye coordination, following sequences, creativity

### 2. 🎯 Kiwi Roadtrip Bingo
An interactive travel bingo experience:

- **Gameplay**: Click squares on a 3x4 bingo card to mark items you've "spotted"
- **Persistence**: Progress is saved using localStorage - resume anytime
- **Goal**: Complete all 12 squares to win with a confetti celebration

**Skills**: Observation, completion goals, patience

### 3. 🐦 Flappy Bird (Kirby Edition)
A modified version of the classic Flappy Bird game:

- **Character**: Play as Kirby instead of a traditional bird
- **Controls**: Click or press spacebar to flap
- **Features**: Colourful randomised pipes, pause functionality, score tracking
- **Win Condition**: Reach a score of 3 (beginner-friendly difficulty)

**Skills**: Reflexes, timing, persistence

## 🗺️ Navigation System

### Central Map Hub
- **Animated Elements**: Car travels along a sine wave path across the screen
- **Interactive Buildings**: Click on three different buildings to access games
- **Timer System**: Countdown displays remaining journey time
- **Audio**: Background music and click sound effects
- **Visual Design**: Scenic map with forests, a castle, and roads

## 🛠️ Technical Specifications

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, and Vanilla JavaScript
- **Server**: Node.js with Express.js for static file serving
- **Audio**: Web Audio API for sound effects and background music
- **Graphics**: SVG and PNG assets with CSS animations
- **Storage**: localStorage for game state persistence

### Key Features
- **Responsive Design**: Adapts to different screen sizes using viewport units
- **Drag & Drop API**: Smooth interaction system for cake baking game
- **State Management**: Persistent progress tracking across sessions
- **Audio Integration**: Immersive sound design with mute controls
- **Animation System**: CSS transitions and JavaScript-powered animations

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- Modern web browser with JavaScript enabled

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/vten138/2025-Hackathon.git
   cd 2025-Hackathon
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Alternative Setup
For development or testing without Node.js:
- Open `index.html` directly in a web browser
- Note: Some features may require a local server for full functionality

## 🎨 Game Controls

### General Navigation
- **Map Interface**: Click on buildings to enter games
- **Audio Control**: Click the sound icon in the top-right to mute/unmute
- **Return to Map**: Use provided buttons in each game

### Game-Specific Controls

#### Cake Baking
- **Drag & Drop**: Click and drag ingredients, tools, and cake
- **Click Interactions**: Open/close oven, advance to next stage
- **Sequential Gameplay**: Complete each stage to unlock the next

#### Travel Bingo
- **Click to Mark**: Tap any square to toggle its completion state
- **Progress Tracking**: Green overlay indicates completed squares

#### Flappy Bird
- **Flap Controls**: Click anywhere or press spacebar
- **Pause**: Use the pause button to stop the game
- **Menu**: Return to map or restart

## 📁 Project Structure

```
2025-Hackathon/
├── audio/                    # Sound effects and background music
├── images/                   # Game assets and graphics
│   ├── Cake-images-png/     # Cake game sprites
│   ├── flappy/              # Flappy bird assets
│   └── building_images/     # Map building icons
├── bingo/                   # Travel bingo game files
├── flappy-game/            # Additional flappy bird assets
├── *.html                  # Game pages and main index
├── *.js                    # Game logic and interactions
├── *.css                   # Styling and animations
├── server.js               # Express server setup
└── package.json            # Project dependencies
```

## 🎵 Audio Assets

The game features comprehensive audio design:
- **Background Music**: Candy Crush-inspired soundtrack on main menu
- **Sound Effects**: Click sounds, scoring audio, victory music
- **Game-Specific Audio**: Flappy bird theme, coin collection sounds
- **Audio Controls**: Global mute/unmute functionality

## 🔧 Development Notes

### State Persistence
- **Timer System**: Journey countdown persists across page reloads
- **Bingo Progress**: Individual square states saved to localStorage
- **Game Completion**: Win states trigger appropriate celebrations

### Performance Optimisations
- **Efficient Animation**: RequestAnimationFrame for smooth car movement
- **Lightweight Assets**: Optimized images and audio files
- **Minimal Dependencies**: Pure vanilla JavaScript for fast loading

## 🐛 Known Issues & Limitations

- Audio autoplay may be blocked by browser policies (user interaction required)
- Drag and drop functionality optimised for desktop experience
- Timer system assumes a continuous gameplay session

## 🎯 Target Audience

- **Primary**: Families and children during car trips
- **Secondary**: Casual gamers looking for light entertainment
- **Age Range**: 6+ (with adult supervision for younger children)

## 🏆 Achievements System

While not explicitly implemented, the games provide natural achievement moments:
- **Cake Master**: Complete all three cake-making stages
- **Bingo Champion**: Fill entire bingo card
- **Flappy Expert**: Reach a score of 3 in Flappy Bird

## 🤝 Contributing

This project was created for the 2025 Hackathon. For contributions or issues:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request
4. Report issues via GitHub Issues

## 📄 License

This project is licensed under the ISC License - see the package.json file for details.

## 👥 Credits

**Team**: Debug Divas  
**Event**: 2025 Hackathon  
**Theme**: Interactive Road Trip Entertainment

---

*Enjoy your virtual road trip adventure! 🎮🚗*
