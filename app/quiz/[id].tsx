// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { View, Text, Button, StyleSheet } from 'react-native';

// export default function QuizScreen() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Quiz: {id}</Text>
//       {/* Add questions here later */}
//       <Button title="Submit" onPress={() => router.push(`/result/${id}`)} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 22, fontWeight: '600', marginBottom: 20 },
// });

// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   FlatList,
// } from 'react-native';
// import { COLORS, SPACING, RADIUS } from '../../constants/theme';

// const mockQuestions = [
//   {
//     question: 'What is 5 + 3?',
//     options: ['6', '7', '8', '9'],
//     answer: '8',
//   },
//   {
//     question: 'What is the capital of France?',
//     options: ['London', 'Paris', 'Berlin', 'Rome'],
//     answer: 'Paris',
//   },
// ];

// export default function QuizScreen() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const [answers, setAnswers] = useState<string[]>([]);

//   const question = mockQuestions[currentQuestion];
//   const isLast = currentQuestion === mockQuestions.length - 1;

//   const handleOptionSelect = (option: string) => {
//     setSelectedOption(option);
//   };

//   const handleNext = () => {
//     setAnswers((prev) => [...prev, selectedOption || '']);
//     setSelectedOption(null);
//     if (isLast) {
//       router.push('/result');
//     } else {
//       setCurrentQuestion((prev) => prev + 1);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.progress}>
//         Question {currentQuestion + 1} of {mockQuestions.length}
//       </Text>

//       <View style={styles.card}>
//         <Text style={styles.question}>{question.question}</Text>
//         {question.options.map((option) => {
//           const isSelected = selectedOption === option;
//           return (
//             <Pressable
//               key={option}
//               onPress={() => handleOptionSelect(option)}
//               style={[
//                 styles.option,
//                 isSelected && {
//                   backgroundColor: COLORS.primary + '33',
//                   borderColor: COLORS.primary,
//                 },
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.optionText,
//                   isSelected && { color: COLORS.primary },
//                 ]}
//               >
//                 {option}
//               </Text>
//             </Pressable>
//           );
//         })}
//       </View>

//       <Pressable
//         onPress={handleNext}
//         style={[
//           styles.nextButton,
//           { backgroundColor: selectedOption ? COLORS.primary : COLORS.muted },
//         ]}
//         disabled={!selectedOption}
//       >
//         <Text style={styles.nextText}>
//           {isLast ? 'Submit' : 'Next'}
//         </Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     padding: SPACING.lg,
//     justifyContent: 'space-between',
//   },
//   progress: {
//     fontSize: 16,
//     color: COLORS.muted,
//     fontWeight: '500',
//     marginBottom: SPACING.sm,
//   },
//   card: {
//     backgroundColor: COLORS.white,
//     padding: SPACING.lg,
//     borderRadius: RADIUS.md,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   question: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: SPACING.md,
//     color: COLORS.text,
//   },
//   option: {
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     padding: SPACING.md,
//     borderRadius: RADIUS.sm,
//     marginBottom: SPACING.sm,
//     backgroundColor: COLORS.background,
//   },
//   optionText: {
//     fontSize: 16,
//     color: COLORS.text,
//   },
//   nextButton: {
//     padding: SPACING.md,
//     borderRadius: RADIUS.md,
//     alignItems: 'center',
//   },
//   nextText: {
//     color: COLORS.white,
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   ScrollView,
//   FlatList,
// } from 'react-native';
// import { COLORS, SPACING, RADIUS } from '../../constants/theme';

// // --- Mock Data ---
// const mockQuestions = [
//   {
//     question: 'What is 5 + 3?',
//     options: ['6', '7', '8', '9'],
//     answer: '8',
//   },
//   {
//     question: 'Capital of France?',
//     options: ['London', 'Paris', 'Berlin', 'Madrid'],
//     answer: 'Paris',
//   },
//   {
//     question: 'React Native is built on top of?',
//     options: ['Vue', 'Flutter', 'React', 'Angular'],
//     answer: 'React',
//   },
// ];

// // --- Types ---
// type QuestionState = {
//   visited: boolean;
//   answered: boolean;
//   markedForReview: boolean;
//   selectedOption?: string | null;
// };

// export default function QuizScreen() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();

//   const totalQuestions = mockQuestions.length;

//   const [questionStates, setQuestionStates] = useState<QuestionState[]>(
//     mockQuestions.map(() => ({
//       visited: false,
//       answered: false,
//       markedForReview: false,
//       selectedOption: null,
//     }))
//   );

//   const [currentQuestion, setCurrentQuestion] = useState(0);

//   const question = mockQuestions[currentQuestion];
//   const state = questionStates[currentQuestion];

//   // Mark as visited on mount/change
//   useEffect(() => {
//     setQuestionStates((prev) => {
//       const updated = [...prev];
//       updated[currentQuestion].visited = true;
//       return updated;
//     });
//   }, [currentQuestion]);

//   const selectOption = (option: string) => {
//     setQuestionStates((prev) => {
//       const updated = [...prev];
//       updated[currentQuestion].selectedOption = option;
//       updated[currentQuestion].answered = true;
//       return updated;
//     });
//   };

//   const toggleMarkForReview = () => {
//     setQuestionStates((prev) => {
//       const updated = [...prev];
//       updated[currentQuestion].markedForReview = !updated[currentQuestion].markedForReview;
//       return updated;
//     });
//   };

//   const goToQuestion = (index: number) => {
//     setCurrentQuestion(index);
//   };

//   const goToNext = () => {
//     if (currentQuestion < totalQuestions - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const goToPrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleSubmit = () => {
//     router.replace('/result'); // later pass score
//   };

//   const renderStatus = (q: QuestionState, i: number) => {
//     let bg = COLORS.gray;
//     if (q.answered) bg = COLORS.green;
//     if (!q.answered && q.markedForReview) bg = COLORS.red;
//     if (q.answered && q.markedForReview) bg = COLORS.orange;
//     if (!q.visited) bg = COLORS.darkGray;

//     return (
//       <Pressable
//         key={i}
//         onPress={() => goToQuestion(i)}
//         style={[styles.statusDot, { backgroundColor: bg }]}
//       >
//         <Text style={styles.statusNumber}>{i + 1}</Text>
//       </Pressable>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Question {currentQuestion + 1} / {totalQuestions}</Text>

//       <View style={styles.card}>
//         <Text style={styles.question}>{question.question}</Text>
//         {question.options.map((option) => {
//           const isSelected = state.selectedOption === option;
//           return (
//             <Pressable
//               key={option}
//               onPress={() => selectOption(option)}
//               style={[
//                 styles.option,
//                 isSelected && {
//                   borderColor: COLORS.primary,
//                   backgroundColor: COLORS.primary + '22',
//                 },
//               ]}
//             >
//               <Text style={[styles.optionText, isSelected && { color: COLORS.primary }]}>
//                 {option}
//               </Text>
//             </Pressable>
//           );
//         })}
//       </View>

//       <View style={styles.buttonRow}>
//         <Pressable onPress={goToPrevious} style={styles.navButton}>
//           <Text style={styles.navButtonText}>Previous</Text>
//         </Pressable>
//         <Pressable onPress={toggleMarkForReview} style={styles.navButton}>
//           <Text style={styles.navButtonText}>
//             {state.markedForReview ? 'Unmark' : 'Mark for Review'}
//           </Text>
//         </Pressable>
//         <Pressable onPress={goToNext} style={styles.navButton}>
//           <Text style={styles.navButtonText}>Next</Text>
//         </Pressable>
//       </View>

//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusRow}>
//         {questionStates.map(renderStatus)}
//       </ScrollView>

//       {currentQuestion === totalQuestions - 1 && (
//         <Pressable style={styles.submitButton} onPress={handleSubmit}>
//           <Text style={styles.submitText}>Submit Test</Text>
//         </Pressable>
//       )}
//     </View>
//   );
// }

// // --- Styles ---
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     padding: SPACING.lg,
//   },
//   header: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: COLORS.text,
//     marginBottom: SPACING.md,
//   },
//   card: {
//     backgroundColor: COLORS.white,
//     padding: SPACING.lg,
//     borderRadius: RADIUS.md,
//     marginBottom: SPACING.lg,
//   },
//   question: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: SPACING.md,
//     color: COLORS.text,
//   },
//   option: {
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     padding: SPACING.md,
//     borderRadius: RADIUS.sm,
//     marginBottom: SPACING.sm,
//     backgroundColor: COLORS.background,
//   },
//   optionText: {
//     fontSize: 16,
//     color: COLORS.text,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: SPACING.md,
//     gap: SPACING.sm,
//   },
//   navButton: {
//     flex: 1,
//     backgroundColor: COLORS.secondary,
//     padding: SPACING.md,
//     borderRadius: RADIUS.sm,
//     alignItems: 'center',
//   },
//   navButtonText: {
//     color: COLORS.white,
//     fontWeight: '600',
//   },
//   submitButton: {
//     backgroundColor: COLORS.primary,
//     padding: SPACING.lg,
//     borderRadius: RADIUS.md,
//     alignItems: 'center',
//   },
//   submitText: {
//     color: COLORS.white,
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   statusRow: {
//     flexDirection: 'row',
//     marginBottom: SPACING.md,
//   },
//   statusDot: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: SPACING.xs,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   statusNumber: {
//     color: COLORS.white,
//     fontWeight: '700',
//   },
// });

// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   ScrollView,
//   FlatList,
// } from "react-native";
// import { COLORS, SPACING, RADIUS } from "../../constants/theme";

// // --- Mock Data ---
// const mockQuestions = [
//   {
//     question: "What is 5 + 3?",
//     options: ["6", "7", "8", "9"],
//     answer: "8",
//   },
//   {
//     question: "Capital of France?",
//     options: ["London", "Paris", "Berlin", "Madrid"],
//     answer: "Paris",
//   },
//   {
//     question: "React Native is built on top of?",
//     options: ["Vue", "Flutter", "React", "Angular"],
//     answer: "React",
//   },
// ];

// // --- Types ---
// type QuestionState = {
//   visited: boolean;
//   answered: boolean;
//   markedForReview: boolean;
//   selectedOption?: string | null;
// };

// export default function QuizScreen() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();

//   const totalQuestions = mockQuestions.length;

//   const [questionStates, setQuestionStates] = useState<QuestionState[]>(
//     mockQuestions.map(() => ({
//       visited: false,
//       answered: false,
//       markedForReview: false,
//       selectedOption: null,
//     }))
//   );

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

//   const question = mockQuestions[currentQuestion];
//   const state = questionStates[currentQuestion];

//   // Mark as visited on mount/change
//   useEffect(() => {
//     setQuestionStates((prev) => {
//       const updated = [...prev];
//       updated[currentQuestion].visited = true;
//       return updated;
//     });
//   }, [currentQuestion]);

//   useEffect(() => {
//     if (timeLeft === 0) {
//       handleSubmit(); // Auto-submit when timer hits 0
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const selectOption = (option: string) => {
//     setQuestionStates((prev) => {
//       const updated = [...prev];
//       const current = updated[currentQuestion];

//       if (current.selectedOption === option) {
//         current.selectedOption = null;
//         current.answered = false;
//       } else {
//         current.selectedOption = option;
//         current.answered = true;
//       }

//       return updated;
//     });
//   };

//   const toggleMarkForReview = () => {
//     setQuestionStates((prev) => {
//       const updated = [...prev];
//       updated[currentQuestion].markedForReview =
//         !updated[currentQuestion].markedForReview;
//       return updated;
//     });
//   };

//   const goToQuestion = (index: number) => {
//     setCurrentQuestion(index);
//   };

//   const goToNext = () => {
//     if (currentQuestion < totalQuestions - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const goToPrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleSubmit = () => {
//     router.replace("/result"); // later pass score
//   };

//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s.toString().padStart(2, "0")}`;
//   };

//   const renderStatus = (q: QuestionState, i: number) => {
//     let bg = COLORS.gray;
//     if (q.answered) bg = COLORS.green;
//     if (!q.answered && q.markedForReview) bg = COLORS.red;
//     if (q.answered && q.markedForReview) bg = COLORS.orange;
//     if (!q.visited) bg = COLORS.darkGray;

//     return (
//       <Pressable
//         key={i}
//         onPress={() => goToQuestion(i)}
//         style={[styles.statusDot, { backgroundColor: bg }]}
//       >
//         <Text style={styles.statusNumber}>{i + 1}</Text>
//       </Pressable>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>
//         Question {currentQuestion + 1} / {totalQuestions}
//       </Text>

//       <View style={{ alignItems: "flex-end", marginBottom: 10 }}>
//         <Text style={{ fontSize: 16, fontWeight: "bold", color: COLORS.red }}>
//           ⏱ Time Left: {formatTime(timeLeft)}
//         </Text>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.question}>{question.question}</Text>
//         {question.options.map((option) => {
//           const isSelected = state.selectedOption === option;
//           return (
//             <Pressable
//               key={option}
//               onPress={() => selectOption(option)}
//               style={[
//                 styles.option,
//                 isSelected && {
//                   borderColor: COLORS.primary,
//                   backgroundColor: COLORS.primary + "22",
//                 },
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.optionText,
//                   isSelected && { color: COLORS.primary },
//                 ]}
//               >
//                 {option}
//               </Text>
//             </Pressable>
//           );
//         })}
//       </View>

//       <View style={styles.buttonRow}>
//         <Pressable onPress={goToPrevious} style={styles.navButton}>
//           <Text style={styles.navButtonText}>Previous</Text>
//         </Pressable>
//         <Pressable onPress={toggleMarkForReview} style={styles.navButton}>
//           <Text style={styles.navButtonText}>
//             {state.markedForReview ? "Unmark" : "Mark for Review"}
//           </Text>
//         </Pressable>
//         <Pressable onPress={goToNext} style={styles.navButton}>
//           <Text style={styles.navButtonText}>Next</Text>
//         </Pressable>
//       </View>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.statusRow}
//       >
//         {questionStates.map(renderStatus)}
//       </ScrollView>

//       {currentQuestion === totalQuestions - 1 && (
//         <Pressable style={styles.submitButton} onPress={handleSubmit}>
//           <Text style={styles.submitText}>Submit Test</Text>
//         </Pressable>
//       )}
//     </View>
//   );
// }

// // --- Styles ---
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     padding: SPACING.lg,
//   },
//   header: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.text,
//     marginBottom: SPACING.md,
//   },
//   card: {
//     backgroundColor: COLORS.white,
//     padding: SPACING.lg,
//     borderRadius: RADIUS.md,
//     marginBottom: SPACING.lg,
//   },
//   question: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: SPACING.md,
//     color: COLORS.text,
//   },
//   option: {
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     padding: SPACING.md,
//     borderRadius: RADIUS.sm,
//     marginBottom: SPACING.sm,
//     backgroundColor: COLORS.background,
//   },
//   optionText: {
//     fontSize: 16,
//     color: COLORS.text,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: SPACING.md,
//     gap: SPACING.sm,
//   },
//   navButton: {
//     flex: 1,
//     backgroundColor: COLORS.secondary,
//     padding: SPACING.md,
//     borderRadius: RADIUS.sm,
//     alignItems: "center",
//   },
//   navButtonText: {
//     color: COLORS.white,
//     fontWeight: "600",
//   },
//   submitButton: {
//     backgroundColor: COLORS.primary,
//     padding: SPACING.lg,
//     borderRadius: RADIUS.md,
//     alignItems: "center",
//   },
//   submitText: {
//     color: COLORS.white,
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   statusRow: {
//     flexDirection: "row",
//     marginBottom: SPACING.md,
//   },
//   statusDot: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: SPACING.xs,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   statusNumber: {
//     color: COLORS.white,
//     fontWeight: "700",
//   },
// });

import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import { COLORS, SPACING, RADIUS } from "../../constants/theme";

// --- Mock Data ---
const mockQuestions = [
  {
    question: "What is 5 + 3?",
    options: ["6", "7", "8", "9"],
    answer: "8",
    marks: 2,
  },
  {
    question: "Capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    answer: "Paris",
    marks: 1,
  },
  {
    question: "React Native is built on top of?",
    options: ["Vue", "Flutter", "React", "Angular"],
    answer: "React",
    marks: 3,
  },
];

// --- Types ---
type QuestionState = {
  visited: boolean;
  answered: boolean;
  markedForReview: boolean;
  selectedOption?: string | null;
};

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const totalQuestions = mockQuestions.length;

  const [questionStates, setQuestionStates] = useState<QuestionState[]>(
    mockQuestions.map(() => ({
      visited: false,
      answered: false,
      markedForReview: false,
      selectedOption: null,
    }))
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

  const question = mockQuestions[currentQuestion];
  const state = questionStates[currentQuestion];

  // Mark as visited on mount/change
  useEffect(() => {
    setQuestionStates((prev) => {
      const updated = [...prev];
      updated[currentQuestion].visited = true;
      return updated;
    });
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(); // Auto-submit when timer hits 0
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const selectOption = (option: string) => {
    setQuestionStates((prev) => {
      const updated = [...prev];
      const current = updated[currentQuestion];

      if (current.selectedOption === option) {
        current.selectedOption = null;
        current.answered = false;
      } else {
        current.selectedOption = option;
        current.answered = true;
      }

      return updated;
    });
  };

  const toggleMarkForReview = () => {
    setQuestionStates((prev) => {
      const updated = [...prev];
      updated[currentQuestion].markedForReview =
        !updated[currentQuestion].markedForReview;
      return updated;
    });
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  const goToNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    router.replace("/result"); // later pass score
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const scale = useSharedValue(1);

  useEffect(() => {
    if (timeLeft <= 60) {
      scale.value = withRepeat(withTiming(1.1, { duration: 500 }), -1, true);
    }
  }, [timeLeft]);

  const animatedTimerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const renderStatus = (q: QuestionState, i: number) => {
    let bg = COLORS.gray;
    if (q.answered) bg = COLORS.green;
    if (!q.answered && q.markedForReview) bg = COLORS.red;
    if (q.answered && q.markedForReview) bg = COLORS.orange;
    if (!q.visited) bg = COLORS.darkGray;

    return (
      <Pressable
        key={i}
        onPress={() => goToQuestion(i)}
        style={[styles.statusDot, { backgroundColor: bg }]}
      >
        <Text style={styles.statusNumber}>{i + 1}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Question {currentQuestion + 1} / {totalQuestions}
      </Text>

      <Animated.View
        style={[
          { alignItems: "flex-end", marginBottom: 10 },
          animatedTimerStyle,
        ]}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: timeLeft <= 60 ? COLORS.red : COLORS.primary,
          }}
        >
          ⏱ Time Left: {formatTime(timeLeft)}
        </Text>
      </Animated.View>

      <View style={styles.card}>
        <Text style={styles.question}>{question.question}</Text>
        <Text style={{ color: COLORS.text, marginBottom: 4 }}>
          Marks: {question.marks ?? 1}
        </Text>
        {question.options.map((option) => {
          const isSelected = state.selectedOption === option;
          return (
            <Pressable
              key={option}
              onPress={() => selectOption(option)}
              style={[
                styles.option,
                isSelected && {
                  borderColor: COLORS.primary,
                  backgroundColor: COLORS.primary + "22",
                },
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && { color: COLORS.primary },
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.buttonRow}>
        <Pressable onPress={goToPrevious} style={styles.navButton}>
          <Text style={styles.navButtonText}>Previous</Text>
        </Pressable>
        <Pressable onPress={toggleMarkForReview} style={styles.navButton}>
          <Text style={styles.navButtonText}>
            {state.markedForReview ? "Unmark" : "Mark for Review"}
          </Text>
        </Pressable>
        <Pressable onPress={goToNext} style={styles.navButton}>
          <Text style={styles.navButtonText}>Next</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statusRow}
      >
        {questionStates.map(renderStatus)}
      </ScrollView>

      {currentQuestion === totalQuestions - 1 && (
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Test</Text>
        </Pressable>
      )}
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  header: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.lg,
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: SPACING.md,
    color: COLORS.text,
  },
  option: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  navButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    alignItems: "center",
  },
  navButtonText: {
    color: COLORS.white,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: "center",
  },
  submitText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  statusRow: {
    flexDirection: "row",
    marginBottom: SPACING.md,
  },
  statusDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  statusNumber: {
    color: COLORS.white,
    fontWeight: "700",
  },
});
