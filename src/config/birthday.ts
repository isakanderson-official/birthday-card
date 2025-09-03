// Birthday Card Configuration
// Customize these values to personalize the card

export const BIRTHDAY_CONFIG = {
  // The age to celebrate (change this for different birthdays)
  age: 60,
  
  // Recipient name (used in the card front)
  recipientName: 'Dad',
  
  // Card colors (optional customization)
  theme: {
    // Paper colors (Tailwind color names)
    cardFront: 'from-paper-100 to-paper-200',
    cardInside: 'from-paper-50 to-paper-100',
    
    // Accent color for buttons and interactive elements
    accentColor: 'gray', // gray, blue, green, etc.
  },
  
  // Feature toggles
  features: {
    // Enable microphone for candle blowing
    microphoneEnabled: true,
    
    // Enable confetti animation
    confettiEnabled: true,
    
    // Enable sound effects (future feature)
    soundEffectsEnabled: false,
  },
  
  // Custom message (leave empty to use default)
  customMessage: '',
}