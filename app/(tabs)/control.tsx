import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { sendCommand } from "../../services/atombergApi";

export default function ControlScreen() {
  const { deviceId } = useLocalSearchParams();

  // 🔹 Local state to reflect current fan status
  const [power, setPower] = useState<"ON" | "OFF">("OFF");
  const [speed, setSpeed] = useState<number>(0);

  const handlePower = (state: "ON" | "OFF") => {
    setPower(state);
    sendCommand(deviceId as string, { power: state });
  };

  const handleSpeed = (value: number) => {
    setSpeed(value);
    sendCommand(deviceId as string, { speed: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fan Remote</Text>
      <Text style={styles.device}>Device ID: {deviceId}</Text>

      {/* CURRENT STATUS */}
      <View style={styles.statusCard}>
        <Text style={styles.statusText}>
          Power:{" "}
          <Text
            style={{
              color: power === "ON" ? "#1FAA59" : "#E11D48",
              fontWeight: "bold",
            }}
          >
            {power}
          </Text>
        </Text>

        <Text style={styles.statusText}>
          Speed:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {speed === 0 ? "-" : speed}
          </Text>
        </Text>
      </View>

      {/* POWER CONTROLS */}
      <View style={styles.powerRow}>
        <TouchableOpacity
          style={[
            styles.powerButton,
            power === "ON" ? styles.onActive : styles.on,
          ]}
          onPress={() => handlePower("ON")}
        >
          <Text style={styles.powerText}>ON</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.powerButton,
            power === "OFF" ? styles.offActive : styles.off,
          ]}
          onPress={() => handlePower("OFF")}
        >
          <Text style={styles.powerText}>OFF</Text>
        </TouchableOpacity>
      </View>

      {/* SPEED CONTROLS */}
      <Text style={styles.sectionTitle}>Speed</Text>

      <View style={styles.speedGrid}>
        {[1, 2, 3, 4, 5].map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.speedButton,
              speed === value && styles.speedActive,
            ]}
            onPress={() => handleSpeed(value)}
          >
            <Text style={styles.speedText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    color: "#0052CC", // Atomberg blue
  },
  device: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 16,
  },
  statusCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 24,
    elevation: 2,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 6,
  },
  powerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  powerButton: {
    flex: 1,
    padding: 18,
    marginHorizontal: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  on: {
    backgroundColor: "#C7EDE6",
  },
  off: {
    backgroundColor: "#FECACA",
  },
  onActive: {
    backgroundColor: "#1FAA59",
  },
  offActive: {
    backgroundColor: "#E11D48",
  },
  powerText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#0052CC",
  },
  speedGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  speedButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  speedActive: {
    backgroundColor: "#FBBF24",
  },
  speedText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "bold",
  },
});
