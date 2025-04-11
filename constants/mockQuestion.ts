// data/mockQuestions.ts
export type Question = {
  question: string;
  options: string[];
  answer: string;
  marks: number;
};

export type QuestionState = {
  visited: boolean;
  answered: boolean;
  markedForReview: boolean;
  selectedOption: string | null;
};

export const mockQuestions: Question[] = [
    {
        question: "What is the result when 125 is added to 379, a basic arithmetic operation taught in elementary school?",
        options: ["504", "494", "514", "544"],
        answer: "504",
        marks: 2,
      },
      {
        question: "Which city, known for its ancient architecture and the Vatican City, serves as the capital of Italy?",
        options: ["Rome", "Athens", "Madrid", "Vienna"],
        answer: "Rome",
        marks: 1,
      },
      {
        question: "Which programming language is specifically used to define the style and layout of web pages, such as fonts and colors?",
        options: ["JavaScript", "HTML", "Python", "CSS"],
        answer: "CSS",
        marks: 2,
      },
      {
        question: "Who is the renowned physicist that introduced the theory of general relativity, changing the understanding of gravity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
        answer: "Albert Einstein",
        marks: 3,
      },
      {
        question: "The Sahara Desert, known for its vast dunes and arid climate, is located on which continent?",
        options: ["Asia", "Australia", "Africa", "South America"],
        answer: "Africa",
        marks: 1,
      },
      {
        question: "Which element, essential for life and respiration, is represented by the chemical symbol 'O'?",
        options: ["O", "Ox", "Og", "Oy"],
        answer: "O",
        marks: 1,
      },
      {
        question: "React Native, used in mobile development, is primarily based on which popular JavaScript library?",
        options: ["Vue", "Flutter", "React", "Angular"],
        answer: "React",
        marks: 3,
      },
      {
        question: "Which planet in our solar system is commonly referred to as the 'Red Planet' due to its iron-rich soil?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        answer: "Mars",
        marks: 1,
      },
      {
        question: "In a computer system, which component is primarily responsible for carrying out instructions and processing data?",
        options: ["Storing files", "Processing data", "Displaying graphics", "Connecting to internet"],
        answer: "Processing data",
        marks: 2,
      },
      {
        question: "In what year did World War II officially come to an end with the surrender of Japan?",
        options: ["1945", "1939", "1941", "1950"],
        answer: "1945",
        marks: 2,
      },
      {
        question: "Which gas do green plants primarily absorb from the atmosphere during the process of photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: "Carbon Dioxide",
        marks: 2,
      },
      {
        question: "Which Indian mathematician, famous for his intuitive grasp of numbers, contributed significantly to number theory?",
        options: ["Aryabhata", "Ramanujan", "Bhaskara", "Raman"],
        answer: "Ramanujan",
        marks: 2,
      },
      {
        question: "What is the capital city of Japan, renowned for its technology, culture, and cuisine?",
        options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
        answer: "Tokyo",
        marks: 1,
      },
      {
        question: "Which of the following is not a JavaScript framework or library used in frontend development?",
        options: ["React", "Angular", "Laravel", "Vue"],
        answer: "Laravel",
        marks: 3,
      },
      {
        question: "Who wrote the classic American novel 'To Kill a Mockingbird', a commentary on race and justice?",
        options: ["Harper Lee", "Mark Twain", "George Orwell", "Jane Austen"],
        answer: "Harper Lee",
        marks: 2,
      },
      {
        question: "Which part of a green plant is the main site for the process of photosynthesis?",
        options: ["Roots", "Stem", "Leaves", "Flowers"],
        answer: "Leaves",
        marks: 2,
      },
      {
        question: "Which element is commonly used in thermometers due to its uniform thermal expansion and metallic state at room temperature?",
        options: ["Mercury", "Iron", "Lead", "Aluminium"],
        answer: "Mercury",
        marks: 1,
      },
      {
        question: "Which European country, known for its cuisine and Renaissance art, is credited with inventing pizza?",
        options: ["France", "Italy", "Germany", "Spain"],
        answer: "Italy",
        marks: 1,
      },
      {
        question: "Which classical language, considered the root of many modern Indian languages, is known for its vast literary tradition?",
        options: ["Hindi", "Sanskrit", "Urdu", "Tamil"],
        answer: "Sanskrit",
        marks: 3,
      },
      {
        question: "What is the square root of 144, a perfect square often encountered in basic mathematics?",
        options: ["10", "12", "14", "16"],
        answer: "12",
        marks: 2,
      },
      {
        question: "Which desktop operating system, known for its sleek interface, is developed by Apple Inc.?",
        options: ["Windows", "Linux", "macOS", "Ubuntu"],
        answer: "macOS",
        marks: 2,
      },
      {
        question: "What is the term for the process by which water changes into vapor when heated?",
        options: ["Condensation", "Sublimation", "Evaporation", "Melting"],
        answer: "Evaporation",
        marks: 1,
      },
      {
        question: "Which aquatic animal, known for being the largest living mammal, inhabits oceans around the globe?",
        options: ["Elephant", "Whale Shark", "Blue Whale", "Giraffe"],
        answer: "Blue Whale",
        marks: 2,
      },
      {
        question: "Which metal, used in old thermometers and scientific instruments, remains liquid at room temperature?",
        options: ["Gold", "Mercury", "Copper", "Zinc"],
        answer: "Mercury",
        marks: 2,
      },
      {
        question: "Which famous Renaissance artist is known for painting the Mona Lisa, one of the most recognized artworks in the world?",
        options: ["Vincent van Gogh", "Michelangelo", "Leonardo da Vinci", "Raphael"],
        answer: "Leonardo da Vinci",
        marks: 2,
      },
      {
        question: "Which country hosted the delayed 2020 Summer Olympic Games that took place in 2021 due to the pandemic?",
        options: ["Japan", "USA", "France", "Brazil"],
        answer: "Japan",
        marks: 2,
      },
      {
        question: "Which data structure stores items in a Last-In, First-Out (LIFO) order, commonly used in undo operations?",
        options: ["Queue", "Array", "Stack", "Linked List"],
        answer: "Stack",
        marks: 3,
      },
      {
        question: "What does HTTP stand for, the protocol used to access web pages over the internet?",
        options: [
          "Hyper Transfer Text Protocol",
          "HyperText Transfer Protocol",
          "High Transfer Text Protocol",
          "Hyperlink Transfer Protocol"
        ],
        answer: "HyperText Transfer Protocol",
        marks: 3,
      },
      {
        question: "Which layer of the OSI networking model is responsible for logical addressing and routing of data packets?",
        options: ["Application", "Network", "Data Link", "Transport"],
        answer: "Network",
        marks: 3,
      },
      {
        question: "At what temperature, in degrees Celsius, does water boil at sea level under normal atmospheric pressure?",
        options: ["100°C", "90°C", "120°C", "80°C"],
        answer: "100°C",
        marks: 1,
      },
];
