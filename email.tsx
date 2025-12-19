import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";

export default function EmailAgent() {
  const [loading, setLoading] = useState(false);

  const sendTestEmail = async () => {
  setLoading(true);

  try {
    const response = await fetch(
      "https://padhmavathi.app.n8n.cloud/webhook/email-agent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Subject: "Invoice due tomorrow",
          snippet: "Please clear the payment today",
          From: "finance@company.com",
          id: "expo-test-id",
        }),
      }
    );

    const text = await response.text();

    if (!response.ok) {
      throw new Error(text || "Webhook failed");
    }

    Alert.alert(
      "✅ Success",
      "Email agent workflow completed."
    );
  } catch (err: any) {
    Alert.alert(
      "❌ Error",
      err.message || "No response from n8n"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f6f7fb",
      }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "700",
          marginBottom: 20,
        }}
      >
        Email Agent
      </Text>

      <Pressable
        onPress={sendTestEmail}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#a78bfa" : "#7c3aed",
          paddingVertical: 14,
          paddingHorizontal: 30,
          borderRadius: 16,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Send Test Email
          </Text>
        )}
      </Pressable>
    </View>
  );
}
