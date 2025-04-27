# Metrolympiades Frontend

## 🚀 Project Overview

Metrolympiades is a company specializing in organizing sport-focused team-building events for businesses. Previously relying on Excel sheets and paper, they decided to adopt a digital solution to manage games, track scores, and display rankings during their events.

This project is a frontend application built to help team leaders register, manage their team members, schedule matches, record scores, and view rankings throughout the event.

## 🛠️ Technologies Used

- **Vue.js 3** — Main JavaScript framework for building the UI
- **Pinia** — Lightweight state management for handling API interactions
- **Vue Router** — Client-side routing between pages
- **Axios** — For HTTP requests to the backend API

> We deliberately chose **not** to use a CSS framework like Tailwind CSS or Bootstrap, as the project scope was small and a simple custom CSS approach was sufficient.

## 📋 Features

- **Authentication**: Team leaders can create an account, log in, and log out.
- **Team Management**:
  - Update the team name
  - Add or remove team members
- **Match Management**:
  - Create and view matches (including opponent, time, activity, and scores)
- **Ranking System**:
  - Public access to the leaderboard
  - Points system (Win = 3 points, Draw = 1 point, Loss = 0 points)
- **Protected Routes**:
  - `/team`, `/games`, and `/game` routes are only accessible to authenticated users
- **User Experience**:
  - Loading states
  - Empty states
  - Disabled/enabled button management

## 🔧 Setup and Installation

1. Clone the repository:

`git clone https://github.com/Kdiouuu/Metrolympiades.git`

2. Install dependencies:

`npm install`

2. Run the project:

`npm run dev`

