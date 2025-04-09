// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { View, Text, Button, StyleSheet } from 'react-native';

// export default function InstructionsScreen() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Instructions for {id} Test</Text>
//       <Text style={styles.instructions}>You’ll have 10 questions. No time limit. Just do your best!</Text>
//       <Button title="Start Quiz" onPress={() => router.push(`/quiz/${id}`)} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: 'center' },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
//   instructions: { marginBottom: 20 },
// });


import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';

const testDetails = {
  math: { title: 'Math Mastery', icon: '🧮', color: '#A78BFA' },
  science: { title: 'Science Slam', icon: '🔬', color: '#34D399' },
  english: { title: 'English Expert', icon: '📚', color: '#FBBF24' },
  history: { title: 'History Buff', icon: '🏛️', color: '#60A5FA' },
};

export default function InstructionsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const test = testDetails[id as keyof typeof testDetails];

  if (!test) return <Text>Test not found.</Text>;

  return (
    <View style={styles.container}>
      <View style={[styles.iconWrapper, { backgroundColor: test.color + '33' }]}>
        <Text style={styles.icon}>{test.icon}</Text>
      </View>
      <Text style={styles.title}>{test.title}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Instructions</Text>
        <Text style={styles.text}>• You’ll get 10 questions.</Text>
        <Text style={styles.text}>• There’s no time limit.</Text>
        <Text style={styles.text}>• Each question has one correct answer.</Text>
        <Text style={styles.text}>• You'll see your score at the end.</Text>
      </View>

      <Pressable
        style={[styles.button, { backgroundColor: test.color }]}
        onPress={() => router.push(`/quiz/${id}`)}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: SPACING.lg,
    color: COLORS.text,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    color: COLORS.text,
  },
  text: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: SPACING.sm,
  },
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
