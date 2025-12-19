import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Left Brand */}
      

      {/* Greeting */}
      <Text style={styles.heading}>👋 Hi, I’m Chronos</Text>
      <Text style={styles.subHeading}>
        Your personal AI assistant to manage time, tasks & focus
      </Text>

      {/* Action Cards */}
      <View style={styles.cardRow}>
        <Pressable
          style={[styles.card, styles.schedule]}
          onPress={() => router.push("/(tabs)/calendar")}
        >
          <Text style={styles.cardIcon}>📅</Text>
          <Text style={styles.cardText}>Schedule</Text>
        </Pressable>

        <Pressable
          style={[styles.card, styles.tasks]}
          onPress={() => router.push("/(tabs)/tasks")}
        >
          <Text style={styles.cardIcon}>✅</Text>
          <Text style={styles.cardText}>Tasks</Text>
        </Pressable>
      </View>

      {/* AI Insight Box */}
      <View style={styles.insightBox}>
        <Text style={styles.insightTitle}>🧠 AI Insights</Text>
        <Text style={styles.insightText}>
          You have multiple tasks today. I recommend prioritizing
          high-impact work and taking a short break to avoid overload.
        </Text>

        <Pressable
          style={styles.askChronos}
          onPress={() => router.push("/(tabs)/chronos")}
        >
          <Text style={styles.askChronosText}>Ask Chronos</Text>
        </Pressable>
      </View>

      {/* Empty State */}
      <View style={styles.emptyBox}>
        <Text style={styles.emptyIcon}>✨</Text>
        <Text style={styles.emptyText}>
          No reminders yet. Add your first task 🚀
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8fafc",
  },

  brand: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 18,
    fontWeight: "800",
    color: "#6d5dfc",
    letterSpacing: 2,
  },

  heading: {
    marginTop: 80,
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
  },

  subHeading: {
    marginTop: 6,
    fontSize: 15,
    color: "#475569",
    marginBottom: 30,
  },

  cardRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 28,
  },

  card: {
    flex: 1,
    height: 120,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  schedule: {
    backgroundColor: "#4f46e5",
  },

  tasks: {
    backgroundColor: "#22c55e",
  },

  cardIcon: {
    fontSize: 28,
    marginBottom: 8,
  },

  cardText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  insightBox: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },

  insightTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },

  insightText: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 16,
  },

  askChronos: {
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  askChronosText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },

  emptyBox: {
    backgroundColor: "#eef2ff",
    padding: 22,
    borderRadius: 18,
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 26,
    marginBottom: 6,
  },

  emptyText: {
    color: "#4f46e5",
    fontSize: 14,
    fontWeight: "500",
  },
});
