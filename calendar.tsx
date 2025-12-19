import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function CalendarScreen() {
  const [meetings, setMeetings] = useState([
    {
      id: "1",
      title: "Team Standup",
      date: "Tomorrow",
      time: "5:00 PM",
      priority: "High",
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Meeting Assistant</Text>

      <Pressable style={styles.addBtn}>
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.addText}>Schedule Meeting</Text>
      </Pressable>

      <FlatList
        data={meetings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.meetingTitle}>{item.title}</Text>
              <Text style={styles.meta}>
                {item.date} • {item.time}
              </Text>
            </View>

            <View style={styles.badge(item.priority)}>
              <Text style={styles.badgeText}>{item.priority}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3ff",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#4c1d95",
    marginBottom: 10,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#7c3aed",
    padding: 14,
    borderRadius: 16,
    justifyContent: "center",
  },
  addText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  meta: {
    color: "#6b7280",
    marginTop: 4,
  },
  badge: (p: string) => ({
    backgroundColor: p === "High" ? "#fecaca" : "#d1fae5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  }),
  badgeText: {
    fontWeight: "600",
  },
});
