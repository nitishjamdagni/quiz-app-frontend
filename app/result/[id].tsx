import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ResultScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results for {id} Test</Text>
      <Text style={styles.score}>Score: 8/10 (for example)</Text>
      <Button title="Retake Test" onPress={() => router.replace(`/quiz/${id}`)} />
      <Button title="Go to Home" onPress={() => router.replace('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  score: { marginBottom: 20, fontSize: 18 },
});
