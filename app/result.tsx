import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

const ResultScreen = () => {
  const router = useRouter();

  // For now, just mock this
  const score = 7;
  const total = 10;
  const percent = (score / total) * 100;

  const getMessage = () => {
    if (percent === 100) return 'Perfect! 🎯';
    if (percent >= 80) return 'Great Job! 🎉';
    if (percent >= 50) return 'Good Try! 👍';
    return 'Keep Practicing! 💪';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🏁</Text>
      <Text style={styles.title}>Quiz Complete</Text>
      <Text style={styles.message}>{getMessage()}</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreText}>
          You scored <Text style={styles.scoreNumber}>{score}</Text> out of <Text style={styles.scoreNumber}>{total}</Text>
        </Text>
      </View>

      <View style={styles.buttonGroup}>
        <Pressable style={styles.primaryButton} onPress={() => router.replace('/quiz/math')}>
          <Text style={styles.primaryText}>Retake Test</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => router.replace('/')}>
          <Text style={styles.secondaryText}>Back to Home</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 50,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  message: {
    fontSize: 16,
    color: COLORS.muted,
    marginBottom: SPACING.lg,
  },
  scoreCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: SPACING.xl,
    width: '100%',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 16,
    color: COLORS.text,
  },
  scoreNumber: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  buttonGroup: {
    width: '100%',
    gap: SPACING.md,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  primaryText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    borderColor: COLORS.muted,
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  secondaryText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
  },
});
