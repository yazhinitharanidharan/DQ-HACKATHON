import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#f6f7fb", "#efeaff"]}
      style={styles.container}
    >
      {/* Floating Card */}
      <View style={styles.card}>
        {/* Glow Circle */}
        <View style={styles.glow} />

        {/* Logo */}
        <Text style={styles.logo}>NEXI</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>
          Your AI productivity companion
        </Text>

        {/* CTA Button */}
        <Pressable
          style={styles.button}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.buttonText}>Enter Workspace</Text>
        </Pressable>

        {/* Footer hint */}
        <Text style={styles.footer}>
          Powered by Chronos AI
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "85%",
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",

    // Glass effect
    borderWidth: 1,
    borderColor: "rgba(123,92,255,0.25)",

    // Shadow
    shadowColor: "#7b5cff",
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 10,
  },

  glow: {
    position: "absolute",
    top: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#7b5cff",
    opacity: 0.15,
  },

  logo: {
    fontSize: 44,
    fontWeight: "800",
    letterSpacing: 5,
    color: "#7b5cff",
    marginBottom: 10,
  },

  tagline: {
    color: "#6b6b8a",
    fontSize: 14,
    marginBottom: 40,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#7b5cff",
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 16,

    shadowColor: "#7b5cff",
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  footer: {
    marginTop: 24,
    fontSize: 12,
    color: "#9a9ab3",
  },
});
