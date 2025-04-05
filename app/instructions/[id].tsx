import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function InstructionsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instructions for {id} Test</Text>
      <Text style={styles.instructions}>You’ll have 10 questions. No time limit. Just do your best!</Text>
      <Button title="Start Quiz" onPress={() => router.push(`/quiz/${id}`)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  instructions: { marginBottom: 20 },
});
