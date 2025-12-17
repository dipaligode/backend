import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getFans, getMockFans, getUseMock } from "../../services/atombergApi";


export default function FanListScreen() {
  const router = useRouter();
  const { accessToken } = useLocalSearchParams();

  const [fans, setFans] = useState<any[]>([]);

  useEffect(() => {
  async function loadFans() {
    let data: any[] = [];

    if (getUseMock()) {
  console.log("Using MOCK fans");
  data = getMockFans();
} else {
      if (!accessToken) return;
      data = await getFans(accessToken as string);
    }

    setFans(data);
  }

  loadFans();
}, [accessToken]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Fans</Text>

      {fans.length === 0 ? (
        <Text>No fans loaded</Text>
      ) : (
        <FlatList
          data={fans}
          keyExtractor={(item) => item.device_id}
          renderItem={({ item }) => (
            <View style={styles.fanCard}>
              <Text style={styles.fanName}>{item.name}</Text>
              <Text>Status: {item.state}</Text>
              <Text>Speed: {item.speed}</Text>

              <Text
                style={styles.controlLink}
                onPress={() =>
                  router.push({
                    pathname: "/control",
                    params: { deviceId: item.device_id },
                  })
                }
              >
                Control Fan →
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  fanCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
  },
  fanName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  controlLink: {
    marginTop: 10,
    color: "#2563eb",
    fontWeight: "bold",
  },
});
