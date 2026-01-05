export interface DiaryEntry {
  id: string
  type: "text" | "image" | "gif" | "video"
  content: string
  caption?: string
  timestamp: Date
  position?: { x: number; y: number }
  rotation?: number
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
}

export interface DayData {
  day: number
  date: string
  title: string
  questName: string
  sessions: { time: string; title: string; location: string }[]
  entries: DiaryEntry[]
  completed: boolean
  quizCompleted: boolean
  dayCompletedXPClaimed: boolean
  xp: number
  quiz: QuizQuestion[]
}

export const initialDays: DayData[] = [
  {
    day: 1,
    date: "8 December",
    title: "Monday",
    questName: "The Beginning",
    sessions: [
      { time: "10:30-11:45", title: "Fantazmat (UKW students)", location: "K001" },
      { time: "11:45-13:00", title: "No Player Left Behind: Inclusive Game Design", location: "K001" },
      { time: "13:00-14:00", title: "Lunch", location: "" },
      { time: "14:00", title: "Integration and board games", location: "C116/117" },
    ],
    entries: [],
    completed: false,
    quizCompleted: false,
    dayCompletedXPClaimed: false,
    xp: 0,
    quiz: [
      {
        id: "q1-1",
        question: "What is the main goal of inclusive game design?",
        options: [
          "Making games cheaper",
          "Ensuring everyone can play regardless of ability",
          "Reducing development time",
          "Increasing difficulty",
        ],
        correctIndex: 1,
      },
      {
        id: "q1-2",
        question: "What type of activity was planned for the afternoon?",
        options: ["VR session", "Integration and board games", "Project work", "Lecture"],
        correctIndex: 1,
      },
      {
        id: "q1-3",
        question: "What does accessibility in gaming primarily focus on?",
        options: [
          "Graphics quality",
          "Removing barriers for players with disabilities",
          "Online multiplayer",
          "Game pricing",
        ],
        correctIndex: 1,
      },
      {
        id: "q1-4",
        question: "Why are board games useful for team integration?",
        options: [
          "They are expensive",
          "They encourage communication and collaboration",
          "They require no interaction",
          "They are only for children",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    day: 2,
    date: "9 December",
    title: "Tuesday",
    questName: "Design Quest",
    sessions: [
      { time: "10:30-13:00", title: "Design Leverage - Alex Polin", location: "K001" },
      { time: "13:00", title: "Fantazmat - LARP", location: "K001" },
    ],
    entries: [],
    completed: false,
    quizCompleted: false,
    dayCompletedXPClaimed: false,
    xp: 0,
    quiz: [
      {
        id: "q2-1",
        question: "What does LARP stand for?",
        options: [
          "Live Action Role Playing",
          "Linear Action Response Program",
          "Level Adjusted Role Program",
          "Live Animation Rendering Process",
        ],
        correctIndex: 0,
      },
      {
        id: "q2-2",
        question: "Design Leverage focuses on using design to:",
        options: [
          "Cut costs only",
          "Create meaningful impact and engagement",
          "Speed up production",
          "Reduce team size",
        ],
        correctIndex: 1,
      },
      {
        id: "q2-3",
        question: "What is a key benefit of LARP in educational contexts?",
        options: ["Passive learning", "Immersive experiential learning", "Solo study", "Reading comprehension"],
        correctIndex: 1,
      },
      {
        id: "q2-4",
        question: "What element is essential for a successful LARP experience?",
        options: [
          "Expensive costumes",
          "Player engagement and narrative immersion",
          "Large venues only",
          "Computer graphics",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    day: 3,
    date: "10 December",
    title: "Wednesday",
    questName: "Asset Mastery",
    sessions: [
      { time: "10:30-12:30", title: "Assets Design for game development - Mikołaj Gembiak", location: "B101A" },
      { time: "12:30-15:00", title: "Vobacom", location: "C116/117" },
      { time: "15:00", title: "VR in games practical case study", location: "C116/117" },
      { time: "15:00", title: "Afternoon activity", location: "" },
    ],
    entries: [],
    completed: false,
    quizCompleted: false,
    dayCompletedXPClaimed: false,
    xp: 0,
    quiz: [
      {
        id: "q3-1",
        question: "What are game assets?",
        options: [
          "Only 3D models",
          "Visual, audio, and interactive elements in a game",
          "Marketing materials",
          "Source code files",
        ],
        correctIndex: 1,
      },
      {
        id: "q3-2",
        question: "VR stands for:",
        options: ["Variable Reality", "Virtual Reality", "Visual Rendering", "Verified Response"],
        correctIndex: 1,
      },
      {
        id: "q3-3",
        question: "What is important when designing game assets?",
        options: [
          "Making them as complex as possible",
          "Consistency, optimization, and style coherence",
          "Using only one color",
          "Avoiding any animation",
        ],
        correctIndex: 1,
      },
      {
        id: "q3-4",
        question: "What advantage does VR offer for learning?",
        options: [
          "It is always cheaper than traditional methods",
          "It provides immersive, hands-on experiences",
          "It requires no equipment",
          "It only works for gaming",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    day: 4,
    date: "11 December",
    title: "Thursday",
    questName: "Business & Bugs",
    sessions: [
      { time: "10:30-12:00", title: "Business models in games - Iosep Berikashvili", location: "C116/117" },
      { time: "12:00-14:00", title: "Project preparation", location: "C116/117" },
      { time: "14:00-16:00", title: 'Vivid Games - "What are bugs and how to find them"', location: "C116/117" },
      { time: "16:00", title: "Afternoon Activity", location: "" },
    ],
    entries: [],
    completed: false,
    quizCompleted: false,
    dayCompletedXPClaimed: false,
    xp: 0,
    quiz: [
      {
        id: "q4-1",
        question: "What is a common game business model?",
        options: ["Free-to-play with microtransactions", "Pay per hour", "Subscription to hardware", "None exist"],
        correctIndex: 0,
      },
      {
        id: "q4-2",
        question: "What is a 'bug' in game development?",
        options: [
          "A feature request",
          "An unintended error or flaw in the software",
          "A type of game character",
          "A marketing term",
        ],
        correctIndex: 1,
      },
      {
        id: "q4-3",
        question: "QA in game development stands for:",
        options: ["Quick Analysis", "Quality Assurance", "Question & Answer", "Quota Achievement"],
        correctIndex: 1,
      },
      {
        id: "q4-4",
        question: "Why is bug testing important before game release?",
        options: [
          "It is optional and rarely done",
          "It ensures a smooth player experience and prevents crashes",
          "It only matters for mobile games",
          "It increases the game price",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    day: 5,
    date: "12 December",
    title: "Friday",
    questName: "Final Boss",
    sessions: [
      { time: "10:30-11:30", title: "Topic TBA - dr Michał Mochocki", location: "C116/117" },
      { time: "11:30-12:30", title: "Projects presentation", location: "C116/117" },
      { time: "12:30-13:00", title: "Certificates awards", location: "C116/117" },
      { time: "13:00", title: "Lunch", location: "C116/117" },
    ],
    entries: [],
    completed: false,
    quizCompleted: false,
    dayCompletedXPClaimed: false,
    xp: 0,
    quiz: [
      {
        id: "q5-1",
        question: "What is the purpose of project presentations?",
        options: [
          "To waste time",
          "To demonstrate learning and receive feedback",
          "To compete for prizes only",
          "To avoid discussion",
        ],
        correctIndex: 1,
      },
      {
        id: "q5-2",
        question: "What makes gamification effective in education?",
        options: [
          "Adding points to everything",
          "Meaningful engagement, feedback loops, and motivation",
          "Making everything competitive",
          "Removing all structure",
        ],
        correctIndex: 1,
      },
      {
        id: "q5-3",
        question: "A key takeaway from the BIP program is:",
        options: [
          "Games have no educational value",
          "Gamification can enhance learning when thoughtfully applied",
          "Theory is more important than practice",
          "Certificates are the only goal",
        ],
        correctIndex: 1,
      },
      {
        id: "q5-4",
        question: "What skill is most valuable when presenting a project?",
        options: [
          "Speaking as fast as possible",
          "Clear communication and demonstrating your learning",
          "Avoiding questions",
          "Reading directly from slides",
        ],
        correctIndex: 1,
      },
    ],
  },
]
