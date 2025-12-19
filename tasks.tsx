import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTasks } from "../context/TaskContext";

export default function TaskDashboard() {
  /* 🌍 GLOBAL TASKS */
  const { tasks, addTask, toggleTask } = useTasks();

  /* 🧠 LOCAL STATES */
  const [input, setInput] = useState("");
  const [focusTask, setFocusTask] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [minutes, setMinutes] = useState("25");

  const [focusScore, setFocusScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastDoneDate, setLastDoneDate] = useState<string | null>(null);

  /* ⏱ FOCUS TIMER */
  useEffect(() => {
    if (!focusTask || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearInterval(t);
  }, [focusTask, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && focusTask) {
      setFocusScore((s) => s + 10);
      setFocusTask(null);
    }
  }, [timeLeft, focusTask]);

  /* 🧠 SMART LOGIC */
  const getPriority = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("today") || t.includes("asap")) return "High";
    if (t.includes("submit") || t.includes("meeting")) return "High";
    return "Normal";
  };

  const getDifficulty = (text: string) => {
    if (text.length > 40) return "Hard";
    if (text.length > 20) return "Medium";
    return "Easy";
  };

  const handleAddTask = () => {
    if (!input.trim()) return;
    addTask(input.trim(), getPriority(input));
    setInput("");
  };

  /* 📊 DERIVED DATA */
  const pending = tasks.filter((t) => !t.completed);
  const urgent = pending.filter((t) => t.priority === "High");

  const progress = tasks.length
    ? Math.round(
        (tasks.filter((t) => t.completed).length / tasks.length) * 100
      )
    : 0;

  const overload =
    urgent.length >= 3
      ? "HIGH"
      : pending.length >= 6
      ? "MEDIUM"
      : "LOW";

  /* 🧾 UI */
  return (
    <View style={styles.page}>
      <Text style={styles.title}>📜Chronos Tasks📜</Text>

      {/* STATS */}
      <View style={styles.statsRow}>
        <Stat label="🔥 Streak" value={streak} />
        <Stat label="🏆 Focus" value={focusScore} />
        <Stat label="📈 Done" value={`${progress}%`} />
      </View>

      {/* ADD TASK */}
      <View style={styles.card}>
        <TextInput
          placeholder="Add a task (e.g. Submit report today)"
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <Pressable style={styles.primaryBtn} onPress={handleAddTask}>
          <Text style={styles.btnText}>+ Add Task</Text>
        </Pressable>
      </View>

      {/* TASK LIST */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.card}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#6b7280" }}>
            No tasks yet. Ask Chronos to add one 🚀
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <View>
              <Text
                style={[
                  styles.taskText,
                  item.completed && { textDecorationLine: "line-through" },
                ]}
              >
                {item.title}
              </Text>

              <View style={styles.tag(item.priority)}>
                <Text>{item.priority}</Text>
              </View>

              <View style={styles.diff(getDifficulty(item.title))}>
                <Text>{getDifficulty(item.title)}</Text>
              </View>
            </View>

            <Pressable
              onPress={() => {
                if (!item.completed) {
                  const today = new Date().toDateString();
                  if (lastDoneDate !== today) {
                    setStreak((s) => s + 1);
                    setLastDoneDate(today);
                  }
                }
                toggleTask(item.id);
              }}
            >
              <Ionicons
                name={
                  item.completed
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                size={28}
                color="#7c3aed"
              />
            </Pressable>
          </View>
        )}
      />

      {/* AI INSIGHT */}
      <View style={styles.aiBox}>
        <Text style={styles.aiTitle}>🤖 Chronos Insight</Text>
        <Text>
          {overload === "HIGH"
            ? "⚠️ Cognitive overload detected. Take a break."
            : overload === "MEDIUM"
            ? "⚡ Moderate workload. Focus on one task."
            : "✅ Workload is healthy."}
        </Text>
      </View>

      {/* FOCUS MODE */}
      {pending.length > 0 && !focusTask && (
        <View style={styles.focusRow}>
          <TextInput
            value={minutes}
            onChangeText={setMinutes}
            keyboardType="numeric"
            style={styles.minuteInput}
          />
          <Text>min</Text>

          <Pressable
            style={styles.primaryBtn}
            onPress={() => {
              setFocusTask(pending[0]);
              setTimeLeft(Number(minutes) * 60);
            }}
          >
            <Text style={styles.btnText}>🎧 Start Focus</Text>
          </Pressable>
        </View>
      )}

      {/* FOCUS MODAL */}
      <Modal visible={!!focusTask} transparent>
        <View style={styles.focusOverlay}>
          <Text style={styles.focusTitle}>Focus Mode</Text>
          <Text style={styles.focusTask}>{focusTask?.title}</Text>
          <Text style={styles.timer}>
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </Text>

          <Pressable
            style={styles.exitBtn}
            onPress={() => setFocusTask(null)}
          >
            <Text style={styles.btnText}>Exit</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

/* SMALL STAT COMPONENT */
const Stat = ({ label, value }: any) => (
  <View style={styles.statCard}>
    <Text>{label}</Text>
    <Text style={{ fontWeight: "bold" }}>{value}</Text>
  </View>
);

/* STYLES */
const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f3ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#4c1d95",
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  primaryBtn: {
    backgroundColor: "#7c3aed",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "600" },
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  taskText: { fontSize: 16 },
  tag: (p: string) => ({
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: p === "High" ? "#fecaca" : "#d1fae5",
  }),
  diff: (d: string) => ({
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor:
      d === "Hard"
        ? "#fca5a5"
        : d === "Medium"
        ? "#fde047"
        : "#bbf7d0",
  }),
  aiBox: {
    backgroundColor: "#ede9fe",
    padding: 16,
    borderRadius: 18,
    marginTop: 10,
  },
  aiTitle: { fontWeight: "700", marginBottom: 6 },
  focusRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 10,
  },
  minuteInput: {
    width: 60,
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    textAlign: "center",
  },
  focusOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  focusTitle: { color: "white", fontSize: 22 },
  focusTask: { color: "#ddd", textAlign: "center" },
  timer: { fontSize: 40, color: "white" },
  exitBtn: {
    backgroundColor: "#a855f7",
    padding: 12,
    borderRadius: 14,
  },
});
