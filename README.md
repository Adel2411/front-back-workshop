# Fontend vs Backend and API Communication

Welcome to the **Micro Club Members Management** demo app, built for educational purposes as part of our **"Bridge the Gap: Frontend & Backend with REST API"** workshop!

This project is designed to help beginners understand the link between frontend and backend development by implementing a simple **CRUD (Create, Read, Update, Delete)** system using a **React frontend** and an **Express backend**, communicating through a RESTful API.

---

## 📂 Project Structure

| Folder      | Description                              |
| ----------- | ---------------------------------------- |
| `/frontend` | React app using `fetch` for API requests |
| `/backend`  | Express server with REST API endpoints   |

---

## 🌐 What is a REST API?

A **REST API (Representational State Transfer)** is a way for two applications (like your frontend and backend) to communicate over HTTP. REST APIs allow you to send and receive data using standard HTTP methods like:

| Method | Purpose              |
| ------ | -------------------- |
| GET    | Retrieve data        |
| POST   | Create new data      |
| PUT    | Update existing data |
| DELETE | Remove data          |

Each method interacts with **resources** — in this case, **MC members** — identified by URLs.

---

## 🧪 Member Object Structure

Here's the structure of a **member** you'll be managing:

```json
{
  "name": "abdou",
  "email": "abdou@gmail.com",
  "discordId": "abdou",
  "section": "IT",
  "department": "Marketing"
}
```

---

## 🔀 REST API Endpoints + Fetch Examples

### 📥 GET `/api/members` – Fetch All Members

```js
fetch("http://localhost:5000/api/members")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

---

### ➕ POST `/api/members` – Create New Member

```js
fetch("http://localhost:5000/api/members", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "abdou",
    email: "abdou@gmail.com",
    discordId: "abdou",
    section: "IT",
    department: "Marketing",
  }),
});
```

---

### 🔁 PUT `/api/members/:id` – Update a Member

```js
fetch("http://localhost:5000/api/members/123", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "updated name",
    email: "updated@gmail.com",
    discordId: "updated#0001",
    section: "Game Dev",
    department: "Development",
  }),
});
```

---

### ❌ DELETE `/api/members/:id` – Delete a Member

```js
fetch("http://localhost:5000/api/members/123", {
  method: "DELETE",
});
```

---

## 🧑‍🏫 What You’ll Learn

✅ The difference between frontend and backend
✅ How they communicate via REST APIs
✅ JavaScript's role on both sides
✅ Real-world usage of HTTP methods
✅ How to run and connect a fullstack app

---

## 🔧 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/Adel2411/front-back-workshop
cd front-back-workshop
```

2. **Install dependencies**

```bash
cd backend && npm run i
cd ../frontend && npm run i
```

3. **Start the app**

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend (in a separate terminal):

```bash
cd frontend
npm run dev
```

> Note: You need to run both the backend and frontend in separate terminal windows.

---

## 🧠 Ideal For

🎓 Students working on university website projects
🧱 Beginners who want to build full-stack web apps
💡 Developers curious about backend-frontend communication

---

## 🤝 Workshop Hosts

- 🎤 **Frontend**: [HADJ ARAB Adel](https://github.com/Adel2411) — Frontend Developer
- 🧠 **Backend**: [BECHAR Walid](https://github.com/edaywalid) — Backend Developer

---

## 📌 Final Notes

This app is beginner-friendly and perfect for educational demos, workshops, or as a base for learning how to connect **React + Express** using a **RESTful API**.
