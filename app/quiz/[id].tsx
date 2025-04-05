import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz: {id}</Text>
      {/* Add questions here later */}
      <Button title="Submit" onPress={() => router.push(`/result/${id}`)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 20 },
});
