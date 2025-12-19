import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";

export default function MeetingAnalyzer() {
  const [notes, setNotes] = useState("");

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "800" }}>
        📊 Meeting Analyzer
      </Text>

      <Text style={{ marginTop: 10, color: "#6b7280" }}>
        Paste meeting transcript or notes below
      </Text>

      <TextInput
        value={notes}
        onChangeText={setNotes}
        multiline
        placeholder="Paste meeting transcript..."
        style={{
          marginTop: 14,
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 14,
          padding: 14,
          minHeight: 180,
          textAlignVertical: "top",
        }}
      />

      <Pressable
        style={{
          marginTop: 20,
          backgroundColor: "#7c3aed",
          padding: 14,
          borderRadius: 14,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          Analyze Meeting
        </Text>
      </Pressable>

      <Text style={{ marginTop: 20, color: "#6b7280" }}>
        🔍 Chronos will extract:
        {"\n"}• Action items
        {"\n"}• Decisions
        {"\n"}• Key discussion points
      </Text>
    </View>
  );
}
