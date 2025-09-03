export const dadJokes = [
  "I'm reading a book about anti-gravity. It's impossible to put down!",
  "Why don't scientists trust atoms? Because they make up everything!",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Why don't eggs tell jokes? They'd crack each other up!",
  "I invented a new word: Plagiarism!",
  "What do you call a factory that makes good products? A satisfactory!",
  "I used to hate facial hair, but then it grew on me.",
  "Why do fathers take an extra pair of socks when they go golfing? In case they get a hole in one!",
  "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
  "I'm afraid for the calendar. Its days are numbered.",
  "My wife said I should do lunges to stay in shape. That would be a big step forward.",
  "Why don't skeletons fight each other? They don't have the guts.",
  "What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks!",
  "I thought about going on an all-almond diet. But that's just nuts!",
  "What do you call a bear with no teeth? A gummy bear!",
  "Why did the scarecrow win an award? He was outstanding in his field!",
  "How do you organize a space party? You planet!",
  "Want to hear a joke about construction? I'm still working on it.",
  "What do you call a sleeping bull? A bulldozer!",
  "Why don't some couples go to the gym? Because some relationships don't work out!",
  "I'd tell you a joke about time travel, but you didn't like it.",
  "What did the ocean say to the beach? Nothing, it just waved.",
  "Why did the coffee file a police report? It got mugged!",
  "How does a penguin build its house? Igloos it together!",
  "What do you call a fake noodle? An impasta!"
];

export const getRandomJoke = (): string => {
  return dadJokes[Math.floor(Math.random() * dadJokes.length)];
};