import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";

export default function DocumentBriefer() {
  const [doc, setDoc] = useState("");

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "800" }}>
        📄 Document Briefer
      </Text>

      <Text style={{ marginTop: 10, color: "#6b7280" }}>
        Paste document content to generate a brief summary
      </Text>

      <TextInput
        value={doc}
        onChangeText={setDoc}
        multiline
        placeholder="Paste document text here..."
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
          backgroundColor: "#22c55e",
          padding: 14,
          borderRadius: 14,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          Generate Brief
        </Text>
      </Pressable>

      <Text style={{ marginTop: 20, color: "#6b7280" }}>
        ✨ Chronos will:
        {"\n"}• Summarize key points
        {"\n"}• Highlight important sections
        {"\n"}• Reduce reading time
      </Text>
    </View>
  );
}
