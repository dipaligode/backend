# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```
Fan Controller App

This project is a React Native (Expo) mobile application built as an assignment to demonstrate integration with the Atomberg Developer APIs for controlling smart fans.

The app allows users to authenticate using their Atomberg API credentials, view available fans, and control fan power and speed. A demo mode is also provided to showcase the complete app flow without requiring physical hardware.

📱 Features

Login using API Key & Refresh Token
Demo Mode (Mock Data) to explore the app without real devices
View list of available fans
Control fan power (ON/OFF) and speed levels
Clean UI inspired by the Atomberg mobile app
Production-ready APK built using EAS Build
Backend proxy implemented using Node.js + Express and hosted on Vercel

🛠 Tech Stack
Frontend: React Native, Expo, Expo Router
Backend: Node.js, Express (Serverless API)
Build: Expo Application Services (EAS)
Hosting: Vercel
Version Control: Git & GitHub

🔐 Demo Mode vs Real Mode
Demo Mode (Recommended for evaluation):
Uses mock fan data
Allows full app navigation and control flow
No backend or hardware dependency
Real Mode:
Uses actual Atomberg API credentials
Communicates with backend proxy APIs
Input validation is applied for API key and refresh token

📦 APK Download
The installable Android APK is shared separately as part of the assignment submission.

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
