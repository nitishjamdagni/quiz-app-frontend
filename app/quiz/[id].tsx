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

// added a submit modal and logic to disable the previous and next button
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useState, useEffect } from "react";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withRepeat,
// } from "react-native-reanimated";

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
//     marks: 2,
//   },
//   {
//     question: "Capital of France?",
//     options: ["London", "Paris", "Berlin", "Madrid"],
//     answer: "Paris",
//     marks: 1,
//   },
//   {
//     question: "React Native is built on top of?",
//     options: ["Vue", "Flutter", "React", "Angular"],
//     answer: "React",
//     marks: 3,
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
//   const [showConfirmModal, setShowConfirmModal] = useState(false);

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

//   const answeredCount = questionStates.filter((q) => q.answered).length;
//   const unansweredCount = questionStates.filter((q) => !q.answered).length;
//   const markedCount = questionStates.filter((q) => q.markedForReview).length;

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

//   const scale = useSharedValue(1);

//   useEffect(() => {
//     if (timeLeft <= 60) {
//       scale.value = withRepeat(withTiming(1.1, { duration: 500 }), -1, true);
//     }
//   }, [timeLeft]);

//   const animatedTimerStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//   }));

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

//       <Animated.View
//         style={[
//           { alignItems: "flex-end", marginBottom: 10 },
//           animatedTimerStyle,
//         ]}
//       >
//         <Text
//           style={{
//             fontSize: 18,
//             fontWeight: "bold",
//             color: timeLeft <= 60 ? COLORS.red : COLORS.primary,
//           }}
//         >
//           ⏱ Time Left: {formatTime(timeLeft)}
//         </Text>
//       </Animated.View>

//       <View style={styles.card}>
//         <Text style={styles.question}>{question.question}</Text>
//         <Text style={{ color: COLORS.text, marginBottom: 4 }}>
//           Marks: {question.marks ?? 1}
//         </Text>
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
//         <Pressable
//           onPress={goToPrevious}
//           disabled={currentQuestion === 0}
//           style={[
//             styles.navButton,
//             currentQuestion === 0 && styles.disabledButton,
//           ]}
//         >
//           <Text
//             style={[
//               styles.navButtonText,
//               currentQuestion === 0 && styles.disabledText,
//             ]}
//           >
//             Previous
//           </Text>
//         </Pressable>

//         <Pressable onPress={toggleMarkForReview} style={styles.navButton}>
//           <Text style={styles.navButtonText}>
//             {state.markedForReview ? "Unmark" : "Mark for Review"}
//           </Text>
//         </Pressable>

//         <Pressable
//           onPress={goToNext}
//           disabled={currentQuestion === mockQuestions.length - 1}
//           style={[
//             styles.navButton,
//             currentQuestion === mockQuestions.length - 1 &&
//               styles.disabledButton,
//           ]}
//         >
//           <Text
//             style={[
//               styles.navButtonText,
//               currentQuestion === mockQuestions.length - 1 &&
//                 styles.disabledText,
//             ]}
//           >
//             Next
//           </Text>
//         </Pressable>
//       </View>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.statusRow}
//       >
//         {questionStates.map(renderStatus)}
//       </ScrollView>

//       {questionStates.every((q) => q.visited) && (
//         <Pressable
//           style={styles.submitButton}
//           onPress={() => setShowConfirmModal(true)}
//         >
//           <Text style={styles.submitText}>Submit Test</Text>
//         </Pressable>
//       )}

//       {showConfirmModal && (
//         <View style={styles.modalBackdrop}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Review Summary</Text>

//             <Text style={styles.modalStat}>✅ Answered: {answeredCount}</Text>
//             <Text style={styles.modalStat}>
//               ❌ Unanswered: {unansweredCount}
//             </Text>
//             <Text style={styles.modalStat}>
//               ⭐ Marked for Review: {markedCount}
//             </Text>

//             <View style={styles.modalButtons}>
//               <Pressable
//                 onPress={handleSubmit}
//                 style={[
//                   styles.modalButton,
//                   { backgroundColor: COLORS.primary },
//                 ]}
//               >
//                 <Text style={styles.modalButtonText}>Submit Now</Text>
//               </Pressable>
//               <Pressable
//                 onPress={() => setShowConfirmModal(false)}
//                 style={[
//                   styles.modalButton,
//                   { backgroundColor: COLORS.secondary },
//                 ]}
//               >
//                 <Text style={styles.modalButtonText}>Cancel</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }

// // added modal
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useState, useEffect } from "react";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withRepeat,
//   withSpring,
//   runOnJS,
// } from "react-native-reanimated";
// import { GestureDetector, Gesture } from "react-native-gesture-handler";

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
//     marks: 2,
//   },
//   {
//     question: "Capital of France?",
//     options: ["London", "Paris", "Berlin", "Madrid"],
//     answer: "Paris",
//     marks: 1,
//   },
//   {
//     question: "React Native is built on top of?",
//     options: ["Vue", "Flutter", "React", "Angular"],
//     answer: "React",
//     marks: 3,
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
//   const [showConfirmModal, setShowConfirmModal] = useState(false);

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

//   const answeredCount = questionStates.filter((q) => q.answered).length;
//   const unansweredCount = questionStates.filter((q) => !q.answered).length;
//   const markedCount = questionStates.filter((q) => q.markedForReview).length;

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

//   const scale = useSharedValue(1);

//   useEffect(() => {
//     if (timeLeft <= 60) {
//       scale.value = withRepeat(withTiming(1.1, { duration: 500 }), -1, true);
//     }
//   }, [timeLeft]);

//   const animatedTimerStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//   }));

//   // --- Panel Animation ---
//   const panelHeight = 300;
//   const translateY = useSharedValue(panelHeight);

//   const togglePanel = () => {
//     translateY.value =
//       translateY.value === 0 ? withSpring(panelHeight) : withSpring(0);
//   };

//   const animatedPanelStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//   }));

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

//       <View style={styles.topRow}>
//         <Animated.View style={[animatedTimerStyle]}>
//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: "bold",
//               color: timeLeft <= 60 ? COLORS.red : COLORS.primary,
//             }}
//           >
//             ⏱ {formatTime(timeLeft)}
//           </Text>
//         </Animated.View>

//         <Pressable onPress={togglePanel} style={styles.stateButton}>
//           <Text style={styles.stateButtonText}>📋 View Questions</Text>
//         </Pressable>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.question}>{question.question}</Text>
//         <Text style={{ color: COLORS.text, marginBottom: 4 }}>
//           Marks: {question.marks ?? 1}
//         </Text>
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
//         <Pressable
//           onPress={goToPrevious}
//           disabled={currentQuestion === 0}
//           style={[
//             styles.navButton,
//             currentQuestion === 0 && styles.disabledButton,
//           ]}
//         >
//           <Text
//             style={[
//               styles.navButtonText,
//               currentQuestion === 0 && styles.disabledText,
//             ]}
//           >
//             Previous
//           </Text>
//         </Pressable>

//         <Pressable onPress={toggleMarkForReview} style={styles.navButton}>
//           <Text style={styles.navButtonText}>
//             {state.markedForReview ? "Unmark" : "Mark for Review"}
//           </Text>
//         </Pressable>

//         <Pressable
//           onPress={goToNext}
//           disabled={currentQuestion === mockQuestions.length - 1}
//           style={[
//             styles.navButton,
//             currentQuestion === mockQuestions.length - 1 &&
//               styles.disabledButton,
//           ]}
//         >
//           <Text
//             style={[
//               styles.navButtonText,
//               currentQuestion === mockQuestions.length - 1 &&
//                 styles.disabledText,
//             ]}
//           >
//             Next
//           </Text>
//         </Pressable>
//       </View>

//       {questionStates.every((q) => q.visited) && (
//         <Pressable
//           style={styles.submitButton}
//           onPress={() => setShowConfirmModal(true)}
//         >
//           <Text style={styles.submitText}>Submit Test</Text>
//         </Pressable>
//       )}

//       {showConfirmModal && (
//         <View style={styles.modalBackdrop}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Review Summary</Text>

//             <Text style={styles.modalStat}>✅ Answered: {answeredCount}</Text>
//             <Text style={styles.modalStat}>
//               ❌ Unanswered: {unansweredCount}
//             </Text>
//             <Text style={styles.modalStat}>
//               ⭐ Marked for Review: {markedCount}
//             </Text>

//             <View
//               style={{
//                 flexDirection: "row",
//                 flexWrap: "wrap",
//                 marginTop: SPACING.md,
//               }}
//             >
//               {questionStates.map(renderStatus)}
//             </View>

//             <View style={styles.modalButtons}>
//               <Pressable
//                 onPress={handleSubmit}
//                 style={[
//                   styles.modalButton,
//                   { backgroundColor: COLORS.primary },
//                 ]}
//               >
//                 <Text style={styles.modalButtonText}>Submit Now</Text>
//               </Pressable>
//               <Pressable
//                 onPress={() => setShowConfirmModal(false)}
//                 style={[
//                   styles.modalButton,
//                   { backgroundColor: COLORS.secondary },
//                 ]}
//               >
//                 <Text style={styles.modalButtonText}>Cancel</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       )}
//       <GestureDetector
//         gesture={Gesture.Tap().onEnd(() => runOnJS(togglePanel)())}
//       >
//         <Animated.View style={[styles.panel, animatedPanelStyle]}>
//           <Text style={styles.panelTitle}>📋 Question Overview</Text>
//           <ScrollView
//             contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
//             showsVerticalScrollIndicator={false}
//           >
//             {questionStates.map(renderStatus)}
//           </ScrollView>
//         </Animated.View>
//       </GestureDetector>
//     </View>
//   );
// }

// // Core Imports & Hooks
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useState, useEffect } from "react";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withRepeat,
//   withSpring,
//   runOnJS,
// } from "react-native-reanimated";
// import { GestureDetector, Gesture } from "react-native-gesture-handler";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   ScrollView,
//   FlatList,
// } from "react-native";
// import { COLORS, SPACING, RADIUS } from "../../constants/theme";

// // --- Mock Data --- (You’ll replace this with real data later)
// const mockQuestions = [
//     {
//       question: "What is the result when 125 is added to 379, a basic arithmetic operation taught in elementary school?",
//       options: ["504", "494", "514", "544"],
//       answer: "504",
//       marks: 2,
//     },
//     {
//       question: "Which city, known for its ancient architecture and the Vatican City, serves as the capital of Italy?",
//       options: ["Rome", "Athens", "Madrid", "Vienna"],
//       answer: "Rome",
//       marks: 1,
//     },
//     {
//       question: "Which programming language is specifically used to define the style and layout of web pages, such as fonts and colors?",
//       options: ["JavaScript", "HTML", "Python", "CSS"],
//       answer: "CSS",
//       marks: 2,
//     },
//     {
//       question: "Who is the renowned physicist that introduced the theory of general relativity, changing the understanding of gravity?",
//       options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
//       answer: "Albert Einstein",
//       marks: 3,
//     },
//     {
//       question: "The Sahara Desert, known for its vast dunes and arid climate, is located on which continent?",
//       options: ["Asia", "Australia", "Africa", "South America"],
//       answer: "Africa",
//       marks: 1,
//     },
//     {
//       question: "Which element, essential for life and respiration, is represented by the chemical symbol 'O'?",
//       options: ["O", "Ox", "Og", "Oy"],
//       answer: "O",
//       marks: 1,
//     },
//     {
//       question: "React Native, used in mobile development, is primarily based on which popular JavaScript library?",
//       options: ["Vue", "Flutter", "React", "Angular"],
//       answer: "React",
//       marks: 3,
//     },
//     {
//       question: "Which planet in our solar system is commonly referred to as the 'Red Planet' due to its iron-rich soil?",
//       options: ["Mars", "Venus", "Jupiter", "Mercury"],
//       answer: "Mars",
//       marks: 1,
//     },
//     {
//       question: "In a computer system, which component is primarily responsible for carrying out instructions and processing data?",
//       options: ["Storing files", "Processing data", "Displaying graphics", "Connecting to internet"],
//       answer: "Processing data",
//       marks: 2,
//     },
//     {
//       question: "In what year did World War II officially come to an end with the surrender of Japan?",
//       options: ["1945", "1939", "1941", "1950"],
//       answer: "1945",
//       marks: 2,
//     },
//     {
//       question: "Which gas do green plants primarily absorb from the atmosphere during the process of photosynthesis?",
//       options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
//       answer: "Carbon Dioxide",
//       marks: 2,
//     },
//     {
//       question: "Which Indian mathematician, famous for his intuitive grasp of numbers, contributed significantly to number theory?",
//       options: ["Aryabhata", "Ramanujan", "Bhaskara", "Raman"],
//       answer: "Ramanujan",
//       marks: 2,
//     },
//     {
//       question: "What is the capital city of Japan, renowned for its technology, culture, and cuisine?",
//       options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
//       answer: "Tokyo",
//       marks: 1,
//     },
//     {
//       question: "Which of the following is not a JavaScript framework or library used in frontend development?",
//       options: ["React", "Angular", "Laravel", "Vue"],
//       answer: "Laravel",
//       marks: 3,
//     },
//     {
//       question: "Who wrote the classic American novel 'To Kill a Mockingbird', a commentary on race and justice?",
//       options: ["Harper Lee", "Mark Twain", "George Orwell", "Jane Austen"],
//       answer: "Harper Lee",
//       marks: 2,
//     },
//     {
//       question: "Which part of a green plant is the main site for the process of photosynthesis?",
//       options: ["Roots", "Stem", "Leaves", "Flowers"],
//       answer: "Leaves",
//       marks: 2,
//     },
//     {
//       question: "Which element is commonly used in thermometers due to its uniform thermal expansion and metallic state at room temperature?",
//       options: ["Mercury", "Iron", "Lead", "Aluminium"],
//       answer: "Mercury",
//       marks: 1,
//     },
//     {
//       question: "Which European country, known for its cuisine and Renaissance art, is credited with inventing pizza?",
//       options: ["France", "Italy", "Germany", "Spain"],
//       answer: "Italy",
//       marks: 1,
//     },
//     {
//       question: "Which classical language, considered the root of many modern Indian languages, is known for its vast literary tradition?",
//       options: ["Hindi", "Sanskrit", "Urdu", "Tamil"],
//       answer: "Sanskrit",
//       marks: 3,
//     },
//     {
//       question: "What is the square root of 144, a perfect square often encountered in basic mathematics?",
//       options: ["10", "12", "14", "16"],
//       answer: "12",
//       marks: 2,
//     },
//     {
//       question: "Which desktop operating system, known for its sleek interface, is developed by Apple Inc.?",
//       options: ["Windows", "Linux", "macOS", "Ubuntu"],
//       answer: "macOS",
//       marks: 2,
//     },
//     {
//       question: "What is the term for the process by which water changes into vapor when heated?",
//       options: ["Condensation", "Sublimation", "Evaporation", "Melting"],
//       answer: "Evaporation",
//       marks: 1,
//     },
//     {
//       question: "Which aquatic animal, known for being the largest living mammal, inhabits oceans around the globe?",
//       options: ["Elephant", "Whale Shark", "Blue Whale", "Giraffe"],
//       answer: "Blue Whale",
//       marks: 2,
//     },
//     {
//       question: "Which metal, used in old thermometers and scientific instruments, remains liquid at room temperature?",
//       options: ["Gold", "Mercury", "Copper", "Zinc"],
//       answer: "Mercury",
//       marks: 2,
//     },
//     {
//       question: "Which famous Renaissance artist is known for painting the Mona Lisa, one of the most recognized artworks in the world?",
//       options: ["Vincent van Gogh", "Michelangelo", "Leonardo da Vinci", "Raphael"],
//       answer: "Leonardo da Vinci",
//       marks: 2,
//     },
//     {
//       question: "Which country hosted the delayed 2020 Summer Olympic Games that took place in 2021 due to the pandemic?",
//       options: ["Japan", "USA", "France", "Brazil"],
//       answer: "Japan",
//       marks: 2,
//     },
//     {
//       question: "Which data structure stores items in a Last-In, First-Out (LIFO) order, commonly used in undo operations?",
//       options: ["Queue", "Array", "Stack", "Linked List"],
//       answer: "Stack",
//       marks: 3,
//     },
//     {
//       question: "What does HTTP stand for, the protocol used to access web pages over the internet?",
//       options: [
//         "Hyper Transfer Text Protocol",
//         "HyperText Transfer Protocol",
//         "High Transfer Text Protocol",
//         "Hyperlink Transfer Protocol"
//       ],
//       answer: "HyperText Transfer Protocol",
//       marks: 3,
//     },
//     {
//       question: "Which layer of the OSI networking model is responsible for logical addressing and routing of data packets?",
//       options: ["Application", "Network", "Data Link", "Transport"],
//       answer: "Network",
//       marks: 3,
//     },
//     {
//       question: "At what temperature, in degrees Celsius, does water boil at sea level under normal atmospheric pressure?",
//       options: ["100°C", "90°C", "120°C", "80°C"],
//       answer: "100°C",
//       marks: 1,
//     },
//   ];

// // --- Types ---
// type QuestionState = {
//   visited: boolean;
//   answered: boolean;
//   markedForReview: boolean;
//   selectedOption?: string | null;
// };

// export default function QuizScreen() {
//   // --- Navigation & Route ---
//   const { id } = useLocalSearchParams(); // route param
//   const router = useRouter();

//   // --- State ---
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [showPanel, setShowPanel] = useState(false);

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
//   const [timeLeft, setTimeLeft] = useState(5 * 60); // Countdown in seconds

//   // Extract current question and its state
//   const question = mockQuestions[currentQuestion];
//   const state = questionStates[currentQuestion];

//   // --- Track Visit on Question Change ---
//   useEffect(() => {
//     setQuestionStates((prev) => {
//       const updated = [...prev];
//       updated[currentQuestion].visited = true;
//       return updated;
//     });
//   }, [currentQuestion]);

//   // --- Timer Countdown Effect ---
//   useEffect(() => {
//     if (timeLeft === 0) {
//       handleSubmit(); // Auto-submit on timer end
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   // --- Option Select / Deselect ---
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

//   // --- Derived State for Summary ---
//   const answeredCount = questionStates.filter((q) => q.answered).length;
//   const unansweredCount = questionStates.filter((q) => !q.answered).length;
//   const markedCount = questionStates.filter((q) => q.markedForReview).length;

//   // --- Toggle Review Flag ---
//   const toggleMarkForReview = () => {
//     setQuestionStates((prev) => {
//       const updated = [...prev];
//       updated[currentQuestion].markedForReview =
//         !updated[currentQuestion].markedForReview;
//       return updated;
//     });
//   };

//   // --- Navigation Logic ---
//   const goToQuestion = (index: number) => setCurrentQuestion(index);
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
//     router.replace("/result"); // TODO: Send score later
//   };

//   // --- Timer Formatting ---
//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s.toString().padStart(2, "0")}`;
//   };

//   // --- Timer Animation ---
//   const scale = useSharedValue(1);
//   useEffect(() => {
//     if (timeLeft <= 60) {
//       scale.value = withRepeat(withTiming(1.1, { duration: 500 }), -1, true);
//     }
//   }, [timeLeft]);

//   const animatedTimerStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//   }));

//   // --- Bottom Panel Animation Logic ---
//   const panelHeight = 300;
//   const translateY = useSharedValue(panelHeight);

//   const togglePanel = () => {
//     const isOpen = translateY.value === 0;

//     if (isOpen) {
//       translateY.value = withSpring(panelHeight);
//       setTimeout(() => runOnJS(setShowPanel)(false), 300);
//     } else {
//       setShowPanel(true);
//       translateY.value = withSpring(0);
//     }
//   };

//   const animatedPanelStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//   }));

//   // --- Question Status Circle Renderer ---
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

//   // --- Drag Gesture for Bottom Sheet ---
//   const panGesture = Gesture.Pan()
//     .onUpdate((e) => {
//       if (e.translationY > 0) {
//         translateY.value = e.translationY;
//       }
//     })
//     .onEnd((e) => {
//       if (e.translationY > panelHeight / 3 || e.velocityY > 800) {
//         translateY.value = withSpring(panelHeight);
//         runOnJS(setShowPanel)(false);
//       } else {
//         translateY.value = withSpring(0);
//       }
//     });

//   // --- JSX Return Block Below ---

//   return (
//     <View style={styles.container}>
//       {/* Header Row */}
//       <Text style={styles.header}>
//         Question {currentQuestion + 1} / {totalQuestions}
//       </Text>
//       <View style={styles.topRow}>
//         <Animated.View style={[animatedTimerStyle]}>
//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: "bold",
//               color: timeLeft <= 60 ? COLORS.red : COLORS.primary,
//             }}
//           >
//             ⏱ {formatTime(timeLeft)}
//           </Text>
//         </Animated.View>
//         <Pressable onPress={togglePanel} style={styles.stateButton}>
//           <Text style={styles.stateButtonText}>📋 View Questions</Text>
//         </Pressable>
//       </View>

//       {/* Question Card */}
//       <View style={styles.card}>
//         <Text style={styles.question}>{question.question}</Text>
//         <Text style={{ color: COLORS.text, marginBottom: 4 }}>
//           Marks: {question.marks ?? 1}
//         </Text>
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

//       {/* Navigation Buttons */}
//       <View style={styles.buttonRow}>
//         <Pressable
//           onPress={goToPrevious}
//           disabled={currentQuestion === 0}
//           style={[
//             styles.navButton,
//             currentQuestion === 0 && styles.disabledButton,
//           ]}
//         >
//           <Text
//             style={[
//               styles.navButtonText,
//               currentQuestion === 0 && styles.disabledText,
//             ]}
//           >
//             Previous
//           </Text>
//         </Pressable>
//         <Pressable onPress={toggleMarkForReview} style={styles.navButton}>
//           <Text style={styles.navButtonText}>
//             {state.markedForReview ? "Unmark" : "Mark for Review"}
//           </Text>
//         </Pressable>
//         <Pressable
//           onPress={goToNext}
//           disabled={currentQuestion === mockQuestions.length - 1}
//           style={[
//             styles.navButton,
//             currentQuestion === mockQuestions.length - 1 &&
//               styles.disabledButton,
//           ]}
//         >
//           <Text
//             style={[
//               styles.navButtonText,
//               currentQuestion === mockQuestions.length - 1 &&
//                 styles.disabledText,
//             ]}
//           >
//             Next
//           </Text>
//         </Pressable>
//       </View>

//       {/* Submit Button */}
//       {questionStates.every((q) => q.visited) && (
//         <Pressable
//           style={styles.submitButton}
//           onPress={() => setShowConfirmModal(true)}
//         >
//           <Text style={styles.submitText}>Submit Test</Text>
//         </Pressable>
//       )}

//       {/* Submit Confirmation Modal */}
//       {showConfirmModal && (
//         <View style={styles.modalBackdrop}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Review Summary</Text>
//             <Text style={styles.modalStat}>✅ Answered: {answeredCount}</Text>
//             <Text style={styles.modalStat}>
//               ❌ Unanswered: {unansweredCount}
//             </Text>
//             <Text style={styles.modalStat}>
//               ⭐ Marked for Review: {markedCount}
//             </Text>
//             <View
//               style={{
//                 flexDirection: "row",
//                 flexWrap: "wrap",
//                 marginTop: SPACING.md,
//               }}
//             >
//               {questionStates.map(renderStatus)}
//             </View>
//             <View style={styles.modalButtons}>
//               <Pressable
//                 onPress={handleSubmit}
//                 style={[
//                   styles.modalButton,
//                   { backgroundColor: COLORS.primary },
//                 ]}
//               >
//                 {" "}
//                 <Text style={styles.modalButtonText}>Submit Now</Text>
//               </Pressable>
//               <Pressable
//                 onPress={() => setShowConfirmModal(false)}
//                 style={[
//                   styles.modalButton,
//                   { backgroundColor: COLORS.secondary },
//                 ]}
//               >
//                 {" "}
//                 <Text style={styles.modalButtonText}>Cancel</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       )}

//       {/* Bottom Panel */}
//       {showPanel && (
//         <Animated.View
//           style={{
//             ...StyleSheet.absoluteFillObject,
//             backgroundColor: "rgba(0,0,0,0.3)",
//           }}
//         >
//           <GestureDetector
//             gesture={Gesture.Tap().onEnd(() => runOnJS(togglePanel)())}
//           >
//             <View style={{ flex: 1 }} />
//           </GestureDetector>
//           <GestureDetector gesture={panGesture}>
//             <Animated.View style={[styles.panel, animatedPanelStyle]}>
//               <View
//                 style={{
//                   width: 40,
//                   height: 5,
//                   backgroundColor: "#ccc",
//                   borderRadius: 3,
//                   alignSelf: "center",
//                   marginVertical: 8,
//                 }}
//               />
//               <Text style={styles.panelTitle}>📋 Question Overview</Text>
//               <ScrollView
//                 contentContainerStyle={{
//                   flexDirection: "row",
//                   flexWrap: "wrap",
//                 }}
//                 showsVerticalScrollIndicator={false}
//               >
//                 {questionStates.map(renderStatus)}
//               </ScrollView>
//             </Animated.View>
//           </GestureDetector>
//         </Animated.View>
//       )}
//     </View>
//   );
// }

// added typescript features are working good //
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useState, useEffect } from "react";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withRepeat,
//   withSpring,
//   runOnJS,
// } from "react-native-reanimated";
// import { GestureDetector, Gesture } from "react-native-gesture-handler";
// import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
// import { COLORS, SPACING, RADIUS } from "../../constants/theme";
// import {
//   mockQuestions,
//   Question,
//   QuestionState,
// } from "@/constants/mockQuestion";


// export default function QuizScreen(): JSX.Element {
//   const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
//   const [showPanel, setShowPanel] = useState<boolean>(false);

//   const { id } = useLocalSearchParams<{ id: string }>();
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

//   const [currentQuestion, setCurrentQuestion] = useState<number>(0);
//   const [timeLeft, setTimeLeft] = useState<number>(5 * 60); // 5 minutes in seconds

//   const question = mockQuestions[currentQuestion];
//   const state = questionStates[currentQuestion];

//   useEffect(() => {
//     setQuestionStates((prev) => {
//       const updated = [...prev];
//       updated[currentQuestion].visited = true;
//       return updated;
//     });
//   }, [currentQuestion]);

//   useEffect(() => {
//     if (timeLeft === 0) {
//       handleSubmit();
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

//   const answeredCount = questionStates.filter((q) => q.answered).length;
//   const unansweredCount = questionStates.filter((q) => !q.answered).length;
//   const markedCount = questionStates.filter((q) => q.markedForReview).length;

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
//     router.replace("/result");
//   };

//   const formatTime = (seconds: number): string => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s.toString().padStart(2, "0")}`;
//   };

//   const scale = useSharedValue(1);

//   useEffect(() => {
//     if (timeLeft <= 60) {
//       scale.value = withRepeat(withTiming(1.1, { duration: 500 }), -1, true);
//     }
//   }, [timeLeft]);

//   const animatedTimerStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//   }));

//   const panelHeight = 300;
//   const translateY = useSharedValue(panelHeight);

//   const togglePanel = () => {
//     const isOpen = translateY.value === 0;

//     if (isOpen) {
//       translateY.value = withSpring(panelHeight);
//       setTimeout(() => runOnJS(setShowPanel)(false), 300);
//     } else {
//       setShowPanel(true);
//       translateY.value = withSpring(0);
//     }
//   };

//   const animatedPanelStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//   }));

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

//   const panGesture = Gesture.Pan()
//     .onUpdate((e) => {
//       if (e.translationY > 0) {
//         translateY.value = e.translationY;
//       }
//     })
//     .onEnd((e) => {
//       if (e.translationY > panelHeight / 3 || e.velocityY > 800) {
//         translateY.value = withSpring(panelHeight);
//         runOnJS(setShowPanel)(false);
//       } else {
//         translateY.value = withSpring(0);
//       }
//     });

//   // --- JSX Return Block Below ---

//   return (
//     <View style={styles.container}>
//       {/* Header Row */}
//       <Text style={styles.header}>
//         Question {currentQuestion + 1} / {totalQuestions}
//       </Text>
//       <View style={styles.topRow}>
//         <Animated.View style={[animatedTimerStyle]}>
//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: "bold",
//               color: timeLeft <= 60 ? COLORS.red : COLORS.primary,
//             }}
//           >
//             ⏱ {formatTime(timeLeft)}
//           </Text>
//         </Animated.View>
//         <Pressable onPress={togglePanel} style={styles.stateButton}>
//           <Text style={styles.stateButtonText}>📋 View Questions</Text>
//         </Pressable>
//       </View>

//       {/* Question Card */}
//       <View style={styles.card}>
//         <Text style={styles.question}>{question.question}</Text>
//         <Text style={{ color: COLORS.text, marginBottom: 4 }}>
//           Marks: {question.marks ?? 1}
//         </Text>
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

//       {/* Navigation Buttons */}
//       <View style={styles.buttonRow}>
//         <Pressable
//           onPress={goToPrevious}
//           disabled={currentQuestion === 0}
//           style={[
//             styles.navButton,
//             currentQuestion === 0 && styles.disabledButton,
//           ]}
//         >
//           <Text
//             style={[
//               styles.navButtonText,
//               currentQuestion === 0 && styles.disabledText,
//             ]}
//           >
//             Previous
//           </Text>
//         </Pressable>
//         <Pressable onPress={toggleMarkForReview} style={styles.navButton}>
//           <Text style={styles.navButtonText}>
//             {state.markedForReview ? "Unmark" : "Mark for Review"}
//           </Text>
//         </Pressable>
//         <Pressable
//           onPress={goToNext}
//           disabled={currentQuestion === mockQuestions.length - 1}
//           style={[
//             styles.navButton,
//             currentQuestion === mockQuestions.length - 1 &&
//               styles.disabledButton,
//           ]}
//         >
//           <Text
//             style={[
//               styles.navButtonText,
//               currentQuestion === mockQuestions.length - 1 &&
//                 styles.disabledText,
//             ]}
//           >
//             Next
//           </Text>
//         </Pressable>
//       </View>

//       {/* Submit Button */}
//       {questionStates.every((q) => q.visited) && (
//         <Pressable
//           style={styles.submitButton}
//           onPress={() => setShowConfirmModal(true)}
//         >
//           <Text style={styles.submitText}>Submit Test</Text>
//         </Pressable>
//       )}

//       {/* Submit Confirmation Modal */}
//       {showConfirmModal && (
//         <View style={styles.modalBackdrop}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Review Summary</Text>
//             <Text style={styles.modalStat}>✅ Answered: {answeredCount}</Text>
//             <Text style={styles.modalStat}>
//               ❌ Unanswered: {unansweredCount}
//             </Text>
//             <Text style={styles.modalStat}>
//               ⭐ Marked for Review: {markedCount}
//             </Text>
//             <View
//               style={{
//                 flexDirection: "row",
//                 flexWrap: "wrap",
//                 marginTop: SPACING.md,
//               }}
//             >
//               {questionStates.map(renderStatus)}
//             </View>
//             <View style={styles.modalButtons}>
//               <Pressable
//                 onPress={handleSubmit}
//                 style={[
//                   styles.modalButton,
//                   { backgroundColor: COLORS.primary },
//                 ]}
//               >
//                 {" "}
//                 <Text style={styles.modalButtonText}>Submit Now</Text>
//               </Pressable>
//               <Pressable
//                 onPress={() => setShowConfirmModal(false)}
//                 style={[
//                   styles.modalButton,
//                   { backgroundColor: COLORS.secondary },
//                 ]}
//               >
//                 {" "}
//                 <Text style={styles.modalButtonText}>Cancel</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       )}

//       {/* Bottom Panel */}
//       {showPanel && (
//         <Animated.View
//           style={{
//             ...StyleSheet.absoluteFillObject,
//             backgroundColor: "rgba(0,0,0,0.3)",
//           }}
//         >
//           <GestureDetector
//             gesture={Gesture.Tap().onEnd(() => runOnJS(togglePanel)())}
//           >
//             <View style={{ flex: 1 }} />
//           </GestureDetector>
//           <GestureDetector gesture={panGesture}>
//             <Animated.View style={[styles.panel, animatedPanelStyle]}>
//               <View
//                 style={{
//                   width: 40,
//                   height: 5,
//                   backgroundColor: "#ccc",
//                   borderRadius: 3,
//                   alignSelf: "center",
//                   marginVertical: 8,
//                 }}
//               />
//               <Text style={styles.panelTitle}>📋 Question Overview</Text>
//               <ScrollView
//                 contentContainerStyle={{
//                   flexDirection: "row",
//                   flexWrap: "wrap",
//                 }}
//                 showsVerticalScrollIndicator={false}
//               >
//                 {questionStates.map(renderStatus)}
//               </ScrollView>
//             </Animated.View>
//           </GestureDetector>
//         </Animated.View>
//       )}
//     </View>
//   );
// }

// added custom hook //
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { COLORS, SPACING, RADIUS } from "../../constants/theme";
import { useQuestionStateManager } from "../hooks/useQuestionStateManager"; 

export default function QuizScreen(): JSX.Element {
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showPanel, setShowPanel] = useState<boolean>(false);

  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const {
    questionStates,
    currentQuestion,
    setCurrentQuestion,
    question,
    state,
    selectOption,
    toggleMarkForReview,
    goToQuestion,
    goToNext,
    goToPrevious,
    answeredCount,
    unansweredCount,
    markedCount,
    totalQuestions,
  } = useQuestionStateManager();

  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = () => {
    router.replace("/result");
  };

  const formatTime = (seconds: number): string => {
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

  const panelHeight = 300;
  const translateY = useSharedValue(panelHeight);

  const togglePanel = () => {
    const isOpen = translateY.value === 0;
    if (isOpen) {
      translateY.value = withSpring(panelHeight);
      setTimeout(() => runOnJS(setShowPanel)(false), 300);
    } else {
      setShowPanel(true);
      translateY.value = withSpring(0);
    }
  };

  const animatedPanelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const renderStatus = (q: any, i: number) => {
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

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > panelHeight / 3 || e.velocityY > 800) {
        translateY.value = withSpring(panelHeight);
        runOnJS(setShowPanel)(false);
      } else {
        translateY.value = withSpring(0);
      }
    });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Question {currentQuestion + 1} / {totalQuestions}
      </Text>

      <View style={styles.topRow}>
        <Animated.View style={[animatedTimerStyle]}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: timeLeft <= 60 ? COLORS.red : COLORS.primary,
            }}
          >
            ⏱ {formatTime(timeLeft)}
          </Text>
        </Animated.View>
        <Pressable onPress={togglePanel} style={styles.stateButton}>
          <Text style={styles.stateButtonText}>📋 View Questions</Text>
        </Pressable>
      </View>

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
        <Pressable
          onPress={goToPrevious}
          disabled={currentQuestion === 0}
          style={[
            styles.navButton,
            currentQuestion === 0 && styles.disabledButton,
          ]}
        >
          <Text
            style={[
              styles.navButtonText,
              currentQuestion === 0 && styles.disabledText,
            ]}
          >
            Previous
          </Text>
        </Pressable>
        <Pressable onPress={toggleMarkForReview} style={styles.navButton}>
          <Text style={styles.navButtonText}>
            {state.markedForReview ? "Unmark" : "Mark for Review"}
          </Text>
        </Pressable>
        <Pressable
          onPress={goToNext}
          disabled={currentQuestion === totalQuestions - 1}
          style={[
            styles.navButton,
            currentQuestion === totalQuestions - 1 && styles.disabledButton,
          ]}
        >
          <Text
            style={[
              styles.navButtonText,
              currentQuestion === totalQuestions - 1 && styles.disabledText,
            ]}
          >
            Next
          </Text>
        </Pressable>
      </View>

      {questionStates.every((q) => q.visited) && (
        <Pressable
          style={styles.submitButton}
          onPress={() => setShowConfirmModal(true)}
        >
          <Text style={styles.submitText}>Submit Test</Text>
        </Pressable>
      )}

      {showConfirmModal && (
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Review Summary</Text>
            <Text style={styles.modalStat}>✅ Answered: {answeredCount}</Text>
            <Text style={styles.modalStat}>❌ Unanswered: {unansweredCount}</Text>
            <Text style={styles.modalStat}>⭐ Marked for Review: {markedCount}</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: SPACING.md }}>
              {questionStates.map(renderStatus)}
            </View>
            <View style={styles.modalButtons}>
              <Pressable
                onPress={handleSubmit}
                style={[styles.modalButton, { backgroundColor: COLORS.primary }]}
              >
                <Text style={styles.modalButtonText}>Submit Now</Text>
              </Pressable>
              <Pressable
                onPress={() => setShowConfirmModal(false)}
                style={[styles.modalButton, { backgroundColor: COLORS.secondary }]}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {showPanel && (
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)" }}>
          <GestureDetector gesture={Gesture.Tap().onEnd(() => runOnJS(togglePanel)())}>
            <View style={{ flex: 1 }} />
          </GestureDetector>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.panel, animatedPanelStyle]}>
              <View
                style={{
                  width: 40,
                  height: 5,
                  backgroundColor: "#ccc",
                  borderRadius: 3,
                  alignSelf: "center",
                  marginVertical: 8,
                }}
              />
              <Text style={styles.panelTitle}>📋 Question Overview</Text>
              <ScrollView
                contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                showsVerticalScrollIndicator={false}
              >
                {questionStates.map(renderStatus)}
              </ScrollView>
            </Animated.View>
          </GestureDetector>
        </Animated.View>
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
  disabledButton: {
    backgroundColor: COLORS.gray,
    opacity: 0.6,
  },
  disabledText: {
    color: COLORS.gray,
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    width: "100%",
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: SPACING.md,
    color: COLORS.text,
    textAlign: "center",
  },
  modalStat: {
    fontSize: 16,
    marginBottom: SPACING.sm,
    color: COLORS.text,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  modalButton: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    alignItems: "center",
  },
  modalButtonText: {
    color: COLORS.white,
    fontWeight: "600",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },

  stateButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
  },

  stateButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
  },

  panel: {
    maxHeight: "70%",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    padding: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },

  panelTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: SPACING.md,
    color: COLORS.text,
  },

  panelBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdropTouchableArea: {
    flex: 1,
  },
});
