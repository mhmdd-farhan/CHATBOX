# 🖥️ CHATBOX (Multiple Device Realtime Chat Simulation Frontend)

## 📌 Summary

CHATBOX is a frontend application designed to simulate real-time chat communication across multiple devices. This project demonstrates how realtime messaging systems work in practice, including instant message synchronization and data persistence even after the browser tab is closed.

This project showcases realtime system design, WebSocket-based communication, and frontend–backend integration.

## 🛠 Tech Stack

- **Next.js** – React framework for modern frontend development and routing
- **Tailwind CSS** – Utility-first CSS framework for fast and consistent UI styling
- **LocalStorage** – Persists chat data locally to retain messages after closing the browser or tab
- **Socket.IO Client** – Enables real-time communication with the WebSocket server

## 🔗 Related Project (Realtime Socket Server)

Since this application relies on real-time communication, it is connected to a dedicated WebSocket server built separately.

**Socket Server: WS-CHATBOX**

- **Runtime:** Node.js
- **Framework:** Hono.js
- **Realtime Provider:** Socket.IO

**🔗 Server Repository:**  
https://github.com/mhmdd-farhan/WS-CHATBOX

This server is responsible for:

- Managing real-time client connections
- Broadcasting messages across multiple devices
- Handling event-driven communication via WebSocket

## ▶️ How to Run and Test the Project

### 🔹 Prerequisites

Make sure the following tools are installed on your local machine:

- Node.js (v18+ recommended)
- npm
- Git

### 🔹 Step 1: Clone and Run the Socket Server (WS-CHATBOX)

```bash
# Clone the socket server repository
git clone https://github.com/mhmdd-farhan/WS-CHATBOX.git

# Navigate to the server directory
cd WS-CHATBOX

# Install dependencies
npm install

# Start the development server
npm run dev
```

**📌 Note:**  
Ensure the socket server is running before starting the frontend application, as the frontend depends on this realtime connection.

### 🔹 Step 2: Clone and Run the Frontend Project

```bash
# Clone the frontend repository
git clone <FRONTEND_REPOSITORY_URL>

# Navigate to the frontend project directory
cd <frontend-project-directory>

# Install dependencies
npm install

# Run the development server
npm run dev
```

Access the application via:  
**http://localhost:3000**

## 📄 License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this project for personal or commercial purposes.
