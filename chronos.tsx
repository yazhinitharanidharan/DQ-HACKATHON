import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useTasks } from "../context/TaskContext";

type Message = {
  sender: "user" | "chronos";
  text: string;
};

export default function Chronos() {
  const { tasks, addTask, updateTaskPriority } = useTasks();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "chronos",
      text: "Hi 👋 I’m Chronos, your personal AI assistant. How can I help you today?",
    },
  ]);

  /* ---------- INTENT HELPERS ---------- */

  function extractAddTask(text: string) {
    const lower = text.toLowerCase();

    if (lower.includes("add")) {
      let priority: "High" | "Normal" = "Normal";

      if (lower.includes("urgent") || lower.includes("high")) {
        priority = "High";
      }

      const cleaned = text
        .replace(/add|a|task|to|with|urgent|high|priority/gi, "")
        .trim();

      return {
        task: cleaned || "New Task",
        priority,
      };
    }
    return null;
  }

  function extractPriorityChange(text: string) {
    const lower = text.toLowerCase();

    if (lower.includes("change") || lower.includes("set") || lower.includes("make")) {
      if (lower.includes("high")) return "High";
      if (lower.includes("medium") || lower.includes("normal")) return "Normal";
    }
    return null;
  }

  function generateAIReply(text: string) {
    const lower = text.toLowerCase();

    if (lower.includes("hi") || lower.includes("hello")) {
      return "Hey 😊 I’m here with you. What do you want to work on today?";
    }

    if (lower.includes("schedule") || lower.includes("meeting")) {
      return "📅 Got it! You can open the Meetings tab to analyze or plan meetings. Want me to help you break it into tasks?";
    }

    if (lower.includes("focus")) {
      return "🎧 Let’s focus together. Start with just one small task — momentum will follow.";
    }

    if (lower.includes("tired") || lower.includes("stress")) {
      return "🫂 That’s okay. Take a breath. We can slow things down or reschedule if needed.";
    }

    if (lower.includes("plan")) {
      return "🗓️ Let’s plan smart. What’s the ONE thing that must be done today?";
    }

    return "👍 I’m here to help! You can add tasks, change priorities, or ask about your workload.";
  }

  /* ---------- SEND MESSAGE ---------- */

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const lower = userText.toLowerCase();

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText },
    ]);
    setInput("");

    /* ADD TASK */
    const addIntent = extractAddTask(userText);
    if (addIntent) {
      addTask(addIntent.task, addIntent.priority);

      setMessages((prev) => [
        ...prev,
        {
          sender: "chronos",
          text: `✅ Task added: "${addIntent.task}" (${addIntent.priority}). You’re doing great 🚀`,
        },
      ]);
      return;
    }

    /* CHANGE PRIORITY */
    const newPriority = extractPriorityChange(userText);
    if (newPriority && tasks.length > 0) {
      const lastTask = tasks[tasks.length - 1];
      updateTaskPriority(lastTask.title, newPriority);

      setMessages((prev) => [
        ...prev,
        {
          sender: "chronos",
          text: `🔁 Updated "${lastTask.title}" to ${newPriority} priority.`,
        },
      ]);
      return;
    }

    /* COUNT TASKS */
    if (lower.includes("how many tasks") || lower.includes("number of tasks")) {
      const pending = tasks.filter((t) => !t.completed).length;

      setMessages((prev) => [
        ...prev,
        {
          sender: "chronos",
          text: `📋 You have ${tasks.length} task(s) total, ${pending} still pending. One step at a time 💡`,
        },
      ]);
      return;
    }

    /* AI-STYLE RESPONSE (SAFE MODE) */
    const reply = generateAIReply(userText);

    setMessages((prev) => [
      ...prev,
      { sender: "chronos", text: reply },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>
        Chronos AI
      </Text>

      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: item.sender === "user" ? "#7c3aed" : "#e5e7eb",
              padding: 10,
              borderRadius: 12,
              marginVertical: 4,
              maxWidth: "80%",
            }}
          >
            <Text style={{ color: item.sender === "user" ? "#fff" : "#000" }}>
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Talk to Chronos..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 10,
          }}
        />
        <Pressable
          onPress={sendMessage}
          style={{
            marginLeft: 10,
            backgroundColor: "#7c3aed",
            paddingHorizontal: 16,
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff" }}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}
