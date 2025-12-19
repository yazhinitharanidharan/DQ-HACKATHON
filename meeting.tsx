import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function Meetings() {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#f6f7fb",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "800", textAlign: "center" }}>
        🤝 Meetings
      </Text>

      {/* MEETING ANALYZER */}
      <Pressable
        onPress={() => router.push("/meeting/analyzer")}
        style={{
          backgroundColor: "#7c3aed",
          padding: 24,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
          📊 Meeting Analyzer
        </Text>
        <Text style={{ color: "#e9d5ff", marginTop: 6 }}>
          Analyze meeting transcripts, extract insights & action items
        </Text>
      </Pressable>

      {/* DOCUMENT BRIEFER */}
      <Pressable
        onPress={() => router.push("/meeting/briefer")}
        style={{
          backgroundColor: "#22c55e",
          padding: 24,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
          📄 Document Briefer
        </Text>
        <Text style={{ color: "#dcfce7", marginTop: 6 }}>
          Upload documents and get concise AI summaries
        </Text>
      </Pressable>
    </View>
  );
}
