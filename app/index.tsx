import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  getUseMock,
  loginViaBackend,
  setUseMock,
} from "../services/atombergApi";

export default function LoginScreen() {
  const router = useRouter();

  const [apiKey, setApiKey] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [mockEnabled, setMockEnabled] = useState(getUseMock());

  const toggleMock = (value: boolean) => {
    setMockEnabled(value);
    setUseMock(value);
  };

  const handleLogin = async () => {
  if (!apiKey || !refreshToken) {
    Alert.alert("Missing Details", "Please enter API Key and Refresh Token");
    return;
  }

  // ✅ REAL MODE VALIDATION
  if (!mockEnabled) {
    if (apiKey.length < 30) {
      Alert.alert(
        "Invalid API Key",
        "API Key looks invalid. Please enter a valid Atomberg API key."
      );
      return;
    }

    if (refreshToken.length < 200) {
      Alert.alert(
        "Invalid Refresh Token",
        "Refresh Token looks invalid. Please enter a valid Atomberg refresh token."
      );
      return;
    }
  }

  try {
    setLoading(true);

    let accessToken: string;

    if (mockEnabled) {
      accessToken = "MOCK_ACCESS_TOKEN";
    } else {
      accessToken = await loginViaBackend(apiKey, refreshToken);
    }

    router.replace("/(tabs)/fans");
  } catch (err: any) {
    Alert.alert("Login Failed", err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.screen}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.brand}>atomberg</Text>
        <Text style={styles.subtitle}>why not?</Text>
      </View>

      {/* LOGIN CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Login</Text>

        {/* MOCK TOGGLE */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Demo Mode</Text>
          <Switch
            value={mockEnabled}
            onValueChange={toggleMock}
            trackColor={{ false: "#E5E7EB", true: "#A7F3D0" }}
            thumbColor={mockEnabled ? "#1FAA59" : "#9CA3AF"}
          />
        </View>
        <Text style={styles.toggleNote}>
  {mockEnabled
    ? "Turn ON to explore the complete app flow using mock fan data."
    : "Turn OFF to use real Atomberg credentials and backend APIs."}
</Text>


        <TextInput
          style={styles.input}
          placeholder="API Key"
          placeholderTextColor="#9CA3AF"
          value={apiKey}
          onChangeText={setApiKey}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Refresh Token"
          placeholderTextColor="#9CA3AF"
          value={refreshToken}
          onChangeText={setRefreshToken}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.disabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Logging in..." : "LOGIN"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.modeNote}>
          {mockEnabled
            ? "Demo mode enabled (mock data)"
            : "Real backend mode"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  brand: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: "#F9FAFB",
  },
  button: {
    backgroundColor: "#f7bc18ff", // Atomberg yellow
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modeNote: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 12,
    color: "#6B7280",
  },
  toggleNote: {
  fontSize: 12,
  color: "#6B7280",
  marginBottom: 12,
},

});
