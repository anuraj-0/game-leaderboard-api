# Game Leaderboard System

## 📌 Project Description
This is a **Game Leaderboard System** that allows:
- Creating and managing contestants
- Creating and managing games
- Assigning scores to contestants
- Viewing leaderboards at global and game levels
- Calculating and displaying a game's popularity score

The project supports API-based interaction using **Node.js, Express, Prisma (PostgreSQL)** and follows a structured modular architecture.

---

## 🚀 Tech Stack Used
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (via Prisma ORM)
- **Libraries:** Prisma, dotenv

---

## ⚡ Installation Guide

```sh
# 1️⃣ Clone the repository
git clone <repo-url>
cd game-leaderboard-system

# 2️⃣ Install dependencies
npm install

# 3️⃣ Set up environment variables
# Create a .env file and add:
echo "DATABASE_URL=postgresql://your_db_user:your_db_password@localhost:5432/your_db_name" > .env
echo "PORT=5000" >> .env

# 4️⃣ Run database migration (Prisma)
npx prisma migrate dev --name init

# 5️⃣ Start the server
npm start
```

## ⚡ API Endpoints and Usage
```sh
# Contestants API
# Get all contestants
GET /contestants

# Add a new contestant
POST /contestants
Body:
{
  "name": "John Doe",
}

# Delete a contestant
DELETE /contestants/:id

# Games API
# Get all games
GET /games

# Create a new game
POST /games
Body:
{
  "name": "Game Title",
}

# Start a game
POST /games/:id/start
Body:
{
  "contestantId": 1
}

# End a game
POST /games/:id/end
Body:
{
  "contestantId": 1
}

# Join a game
POST /games/:id/join
Body:
{
  "contestantId": 1
}

# Exit a game
POST /games/:id/exit
Body:
{
  "contestantId": 1
}

# Assign score to a contestant in a game
POST /games/:id/score
Body:
{
  "contestantId": 1,
  "score": 100
}

# Leaderboards API
# Get global leaderboard (with optional date)
GET /leaderboard/global?date=YYYY-MM-DD

# Get leaderboard for a specific game (with optional date)
GET /leaderboard/game/:gameId?date=YYYY-MM-DD


# Popularity Score API
# Get game popularity scores
GET /popularity

```
This README provides all necessary steps to run, test, and interact with the Game Leaderboard System.
If you have any questions, feel free to reach out! reach.anurajs[at]gmail.com
