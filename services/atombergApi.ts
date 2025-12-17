// =======================
// CONFIG
// =======================

let USE_MOCK = true;

export const getUseMock = () => USE_MOCK;

export const setUseMock = (value: boolean) => {
  USE_MOCK = value;
};

const BACKEND_URL =
  process.env.EXPO_PUBLIC_BACKEND_URL || "";

// =======================
// AUTH
// =======================

export async function loginViaBackend(
  apiKey: string,
  refreshToken: string
) {
  if (!BACKEND_URL) {
    throw new Error(
      "Backend not configured. Please enable Demo Mode."
    );
  }

  const response = await fetch(`${BACKEND_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey, refreshToken }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data.accessToken;
}



// =======================
// FANS (REAL + MOCK)
// =======================

export async function getFans(accessToken: string) {
  // Real implementation will call backend later
  console.log("REAL getFans called with token:", accessToken);
  return [];
}

export function getMockFans() {
  return [
    {
      device_id: "fan_1",
      name: "Bedroom Fan",
      state: "ON",
      speed: 3,
    },
    {
      device_id: "fan_2",
      name: "Living Room Fan",
      state: "OFF",
      speed: 2,
    },
  ];
}


// =======================
// FAN COMMANDS
// =======================

export async function sendCommand(
  deviceId: string,
  command: any
) {
  // Real implementation will call backend later
  console.log("REAL sendCommand", { deviceId, command });
}

export function mockSendCommand(
  deviceId: string,
  command: any
) {
  console.log("MOCK sendCommand", { deviceId, command });
}
