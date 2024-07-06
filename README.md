---

## Personal Journaling App

This is a personal journaling app built with React Native and bootstrapped with Expo. The app allows users to create, edit, and delete journal entries, and includes features such as user authentication, summaries, and profile settings.

### Screenshots
![alt-text-1](/screenshots/login.png) ![alt-text-2](/screenshots/signup.png) ![alt-text-3](/screenshots/mainView.png)
![alt-text-4](/screenshots/mainView2.png) ![alt-text-5](/screenshots/mainView3.png) ![alt-text-6](/screenshots/add-a-new-entry.png)
![alt-text-7](/screenshots/Menu.png) ![alt-text-8](/screenshots/summary.png) ![alt-text-9](/screenshots/entry-created-sucessfully.png)


## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Credits](#credits)

## Features

- User authentication (Sign Up, Login)
- Create, edit, and delete journal entries
- Summary View of journal entries by month, week, or day
- Profile settings (change Name, email, password, Logout)
- Smooth animations and transitions
- Responsive design

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/en/download/) (version 14.x or later)
- You have installed [Expo CLI](https://docs.expo.dev/get-started/installation/)
- You have a working mobile device or emulator to run the app

## Installation

1. Clone the repository:

```bash
git clone https://github.com/fabulousDesigns/user-interface.git
cd user-interface
```

2. Install dependencies:

```bash
npm install
```

## Running the App

1. Start the Expo development server:

```bash
npx expo start --clear
```

2. Open the Expo app on your mobile device and scan the QR code, or run the app on an emulator:

- For iOS: Press `i` to run on an iOS simulator.
- For Android: Press `a` to run on an Android emulator.

*Note: I used a Browser to test this app.. You can get more insights on the setup video below*

3. The app should now be running on your device or emulator.

## Project Structure

Here is an overview of the project structure:

```
personal-journaling-app/
├── app/                    # Entry point of the app
├── app.json                # Expo configuration
├── assets/                 # Asset files (images, fonts, etc.)
├── components/             # Reusable components
├── constants/              # Constant values (e.g., colors, styles)
├── contexts/               # Context providers
├── hooks/                  # Custom hooks
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
├── screens/                # Screen components
├── services/               # API service calls
└── styles/                 # Global styles

```


## Credits
- Name: Maina Bernard Mburu
- Email: designsfabulous8@gmail.com
- Phone: +254110026199

---
