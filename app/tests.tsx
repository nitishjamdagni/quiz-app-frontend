// import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';

// const mockTests = [
//   { id: 'math', title: 'Math Test' },
//   { id: 'science', title: 'Science Test' },
//   { id: 'english', title: 'English Test' },
// ];

// export default function TestListScreen() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Select a Test</Text>
//       <FlatList
//         data={mockTests}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Button
//             title={item.title}
//             onPress={() => router.push(`/instructions/${item.id}`)}
//           />
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
// });

import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

const mockTests = [
  { id: 'math', title: 'Math Mastery', color: '#A78BFA', icon: '🧮' },
  { id: 'science', title: 'Science Slam', color: '#34D399', icon: '🔬' },
  { id: 'english', title: 'English Expert', color: '#FBBF24', icon: '📚' },
  { id: 'history', title: 'History Buff', color: '#60A5FA', icon: '🏛️' },
];
 
export default function TestListScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Mock Test</Text>
      <FlatList
        data={mockTests}
        contentContainerStyle={{ paddingBottom: SPACING.lg }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { backgroundColor: item.color + '33' }]}
            onPress={() => router.push(`/instructions/${item.id}`)}
          >
            <View style={styles.iconWrap}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSub}>10 questions • No time limit</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: SPACING.md,
    color: COLORS.text,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: COLORS.card,
  },
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  cardSub: {
    fontSize: 14,
    color: COLORS.muted,
  },
});