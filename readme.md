## 📦 Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express + JWT Auth
- **Database:** SQLite 
- **Containerization:** Docker 

---

“ Note: Docker setup is included but may not work properly on M1/M2 chips due to Vite/rollup bugs. You can run the project locally as per instructions.”


## 🚀 Features

### ✅ Day 1:
- **Customer Onboarding**: Form to save name, email, timezone (saved to DB)
- **Source Configuration**: Secure DB connection config per tenant
- **Pipeline Toggle**: On/Off switch per tenant; status shown on dashboard

### ✅ Day 2:
- **User Management**: Role-based access (Admin/Viewer)
- **Health Monitoring**: Simulated metrics (Last Sync, Last Error, Status)
- **Authentication**: JWT-based login with role-based UI changes

---

## 📁 Folder Structure
assignment/
├── backend/
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   ├── utils/
│   ├── models/
│   ├── db/
│   ├── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   ├── vite.config.js
├── docker-compose.yml
└── README.md

---

## 🛠 Setup Instructions

### 1. Clone the Repo

```bash
git clone git remote add origin https://github.com/kartikekhurana/Assignment.git



Create your own .env file using the template:
cp backend/.env.example backend/.env



 Run Locally

 Backend
 cd backend 
 npm install
 npm run dev

 Frontend
 cd frontend
npm install
npm run dev


Run With Docker 
docker compose down --volumes --remove-orphans
docker compose build --no-cache
docker compose up

App will be available at:
	Frontend: http://localhost:5173
	Backend API: http://localhost:3000

git commit -m "first commit"
🧪 Test Credentials
	Admin: admin@gmail.com / admin123
	Viewer: viewer@gmail.com / viewer123
