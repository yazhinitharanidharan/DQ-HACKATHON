import { View, Text } from "react-native";
import { useTasks } from "../context/TaskContext";

export default function Dashboard() {
  const { tasks } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const productivity =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const stressMessage =
    pending >= 6
      ? "⚠️ You’re overloaded. Consider rescheduling."
      : pending >= 3
      ? "🙂 You’re managing well. Stay focused."
      : "🚀 Light workload. Great time to plan ahead.";

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>
        Productivity Dashboard
      </Text>

      <Text style={{ marginTop: 20 }}>Total Tasks: {total}</Text>
      <Text>Completed: {completed}</Text>
      <Text>Pending: {pending}</Text>

      {/* Bar Graph */}
      <View
        style={{
          marginTop: 20,
          height: 20,
          width: "100%",
          backgroundColor: "#eee",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${productivity}%`,
            backgroundColor: "#4caf50",
            borderRadius: 10,
          }}
        />
      </View>

      <Text style={{ marginTop: 10 }}>
        Productivity: {productivity}%
      </Text>

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        {stressMessage}
      </Text>
    </View>
  );
}
