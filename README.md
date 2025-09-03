# 🎉 Interactive Birthday Card for Dad

A beautiful, interactive birthday card built with Next.js, featuring realistic paper card design, animations, and fun interactive elements.

## ✨ Features

- **Paper Card Experience**: Opens like a real birthday card with 3D animations
- **Configurable Age**: Easy to customize for any birthday (currently set to 60)
- **Interactive Elements**:
  - 💌 Typewriter birthday message
  - 😄 Dad joke generator with groan meter
  - 🎂 Virtual candle blowing (with microphone support)
  - 🎊 Confetti animation on card opening
- **Mobile-First**: Fully responsive and touch-friendly
- **Static Export**: Ready for Cloudflare Pages deployment

## 🚀 Quick Start

1. **Development**:
   ```bash
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Build for Production**:
   ```bash
   yarn build
   ```

3. **Deploy to Cloudflare Pages**:
   - Build the project: `yarn build`
   - Upload the `out/` folder to Cloudflare Pages

## 🎨 Customization

### Change the Age
Edit `src/app/page.tsx` and modify the `AGE` constant:
```typescript
const AGE = 60 // Change this to any age
```

### Customize the Birthday Message
Edit `src/components/BirthdayMessage.tsx` and modify the `message` variable.

### Add More Dad Jokes
Edit `src/data/jokes.ts` and add jokes to the `dadJokes` array.

## 🛠 Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion
- **Audio**: Web Audio API for breath detection
- **Deployment**: Static export optimized for Cloudflare Pages

## 🎮 How to Use

1. **Open the Card**: Tap the closed birthday card to open it
2. **Read the Message**: Enjoy the typewriter-animated birthday message
3. **Tell a Joke**: Tap the 😄 button for dad jokes with groan ratings
4. **Blow Candles**: Tap the 🎂 button and either:
   - Use your microphone to blow (if permissions granted)
   - Tap "Tap to Blow Candles" button
5. **Make a Wish**: When all candles are blown out!

## 📱 Mobile Optimization

- Touch-friendly button sizes (minimum 44px)
- Responsive design for all screen sizes
- Optimized animations for mobile performance
- Progressive enhancement for desktop features

## 🎊 Special Features

- **Realistic Paper Texture**: CSS-based paper texture for authentic look
- **3D Card Opening**: Smooth CSS transform animations
- **Microphone Integration**: Optional breath detection for candle blowing
- **Confetti System**: Celebratory animations on card opening and candle completion
- **Groan Meter**: Fun rating system for dad jokes

## 🔧 Configuration

The app is configured for static export with these settings:
- Output: Static files in `out/` directory
- Images: Unoptimized for static hosting compatibility
- Trailing slashes: Enabled for better hosting compatibility

## 💝 Perfect For

- Birthday celebrations
- Father's Day
- Special anniversaries
- Any occasion that needs a personal touch

Built with love for celebrating the special people in our lives! 🎂❤️