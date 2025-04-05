import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const mockTests = [
  { id: 'math', title: 'Math Test' },
  { id: 'science', title: 'Science Test' },
  { id: 'english', title: 'English Test' },
];

export default function TestListScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Test</Text>
      <FlatList
        data={mockTests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.title}
            onPress={() => router.push(`/instructions/${item.id}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
