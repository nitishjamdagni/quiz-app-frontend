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


import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';

const mockQuestions = [
  {
    question: 'What is 5 + 3?',
    options: ['6', '7', '8', '9'],
    answer: '8',
  },
  {
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Rome'],
    answer: 'Paris',
  },
];

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  const question = mockQuestions[currentQuestion];
  const isLast = currentQuestion === mockQuestions.length - 1;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    setAnswers((prev) => [...prev, selectedOption || '']);
    setSelectedOption(null);
    if (isLast) {
      router.push('/result');
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Question {currentQuestion + 1} of {mockQuestions.length}
      </Text>

      <View style={styles.card}>
        <Text style={styles.question}>{question.question}</Text>
        {question.options.map((option) => {
          const isSelected = selectedOption === option;
          return (
            <Pressable
              key={option}
              onPress={() => handleOptionSelect(option)}
              style={[
                styles.option,
                isSelected && {
                  backgroundColor: COLORS.primary + '33',
                  borderColor: COLORS.primary,
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

      <Pressable
        onPress={handleNext}
        style={[
          styles.nextButton,
          { backgroundColor: selectedOption ? COLORS.primary : COLORS.muted },
        ]}
        disabled={!selectedOption}
      >
        <Text style={styles.nextText}>
          {isLast ? 'Submit' : 'Next'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    justifyContent: 'space-between',
  },
  progress: {
    fontSize: 16,
    color: COLORS.muted,
    fontWeight: '500',
    marginBottom: SPACING.sm,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.md,
    color: COLORS.text,
  },
  option: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  nextButton: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  nextText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
