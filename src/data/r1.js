// src/data/round1Questions.js

/**
 * Flexible answer checker
 * Handles: uppercase, lowercase, mixed case, extra spaces
 */
export const checkAnswer = (userAnswer, correctAnswer) => {
  const userTrim = userAnswer.trim().toLowerCase();
  const correctTrim = correctAnswer.trim().toLowerCase();
  return userTrim === correctTrim;
};

const round1Questions = [
  // MEDIUM - Grammar & Vocabulary
  {
    id: 1,
    question: "The plural of 'child' is ___",
    correctAnswer: "children",
    placeholder: "Type the plural form"
  },
  {
    id: 2,
    question: "Which is correct: 'She go' or 'She goes'? ___",
    correctAnswer: "she goes",
    placeholder: "Type the correct form"
  },
  {
    id: 3,
    question: "The past tense of 'eat' is ___",
    correctAnswer: "ate",
    placeholder: "Type the past tense"
  },
  {
    id: 4,
    question: "A synonym for 'happy' is ___",
    correctAnswer: "joyful",
    placeholder: "Type a synonym"
  },
  {
    id: 5,
    question: "The opposite of 'dark' is ___",
    correctAnswer: "light",
    placeholder: "Type the opposite"
  },
  {
    id: 6,
    question: "Complete: 'I ___ to the store yesterday.' (go/went)",
    correctAnswer: "went",
    placeholder: "Type the correct verb"
  },
  {
    id: 7,
    question: "The noun form of 'create' is ___",
    correctAnswer: "creation",
    placeholder: "Type the noun"
  },
  {
    id: 8,
    question: "Which is an adjective: 'run' or 'beautiful'? ___",
    correctAnswer: "beautiful",
    placeholder: "Type the adjective"
  },
  {
    id: 9,
    question: "The correct spelling of the sound a cat makes: ___",
    correctAnswer: "meow",
    placeholder: "Type the onomatopoeia"
  },
  {
    id: 10,
    question: "An antonym for 'generous' is ___",
    correctAnswer: "selfish",
    placeholder: "Type the antonym"
  },
  {
    id: 11,
    question: "The adverb form of 'quick' is ___",
    correctAnswer: "quickly",
    placeholder: "Type the adverb"
  },
  {
    id: 12,
    question: "Complete: 'She ___ been studying all day.' (has/have)",
    correctAnswer: "has",
    placeholder: "Type the auxiliary verb"
  },
  {
    id: 13,
    question: "The comparative form of 'good' is ___",
    correctAnswer: "better",
    placeholder: "Type the comparative"
  },
  {
    id: 14,
    question: "A homophone of 'write' is ___",
    correctAnswer: "right",
    placeholder: "Type the homophone"
  },
  {
    id: 15,
    question: "The plural of 'person' is ___",
    correctAnswer: "people",
    placeholder: "Type the plural"
  },

  // HARD - Advanced Grammar & Language
  {
    id: 16,
    question: "What is the subjunctive mood form of 'I am'? ___",
    correctAnswer: "i were",
    placeholder: "Type the subjunctive form"
  },
  {
    id: 17,
    question: "The present perfect continuous tense uses: have/has + ___ + verb",
    correctAnswer: "been",
    placeholder: "Type the auxiliary verb"
  },
  {
    id: 18,
    question: "Which word is a portmanteau: brunch, happy, or blue? ___",
    correctAnswer: "brunch",
    placeholder: "Type the portmanteau"
  },
  {
    id: 19,
    question: "The gerund (noun form) of 'run' is ___",
    correctAnswer: "running",
    placeholder: "Type the gerund"
  },
  {
    id: 20,
    question: "Complete: 'I wish I ___ more time.' (have/had)",
    correctAnswer: "had",
    placeholder: "Type the verb"
  },
  {
    id: 21,
    question: "What is the past participle of 'become'? ___",
    correctAnswer: "become",
    placeholder: "Type the past participle"
  },
  {
    id: 22,
    question: "The word 'ubiquitous' means ___",
    correctAnswer: "everywhere",
    placeholder: "Type the meaning"
  },
  {
    id: 23,
    question: "Which is a collective noun for a group of whales? ___",
    correctAnswer: "pod",
    placeholder: "Type the collective noun"
  },
  {
    id: 24,
    question: "The word 'onomatopoeia' refers to words that ___",
    correctAnswer: "imitate sounds",
    placeholder: "Type what it refers to"
  },
  {
    id: 25,
    question: "A metaphor for 'time is money' is an example of ___",
    correctAnswer: "figurative language",
    placeholder: "Type the literary device"
  },
  {
    id: 26,
    question: "The superlative form of 'bad' is ___",
    correctAnswer: "worst",
    placeholder: "Type the superlative"
  },
  {
    id: 27,
    question: "What does 'sesquipedalian' mean? ___",
    correctAnswer: "long winded",
    placeholder: "Type the meaning"
  },
  {
    id: 28,
    question: "Complete: 'Neither the teacher nor the students ___ ready.' (is/are)",
    correctAnswer: "are",
    placeholder: "Type the correct verb"
  },
  {
    id: 29,
    question: "The word 'serendipity' refers to finding something by ___",
    correctAnswer: "chance",
    placeholder: "Type the method"
  },
  {
    id: 30,
    question: "What is the correct use of semicolon: to join ___ that are closely related",
    correctAnswer: "independent clauses",
    placeholder: "Type what semicolon joins"
  }
];

export default round1Questions;
