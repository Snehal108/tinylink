# TinyLink 🚀
TinyLink is a modern, full-stack URL shortener and tracker built with **Next.js**, **Node.js**, **Express**, and **MongoDB**. 
It allows users to create short links, track click statistics, and monitor the health of the backend service.

---

## 🌟 Features

- Create short links with custom or auto-generated codes.
- Track total clicks and last clicked timestamp.
- Search links by code or URL.
- Copy short links to clipboard.
- Delete links with confirmation.
- Health check endpoint to monitor backend status.
- Responsive and professional UI built with TailwindCSS.
- Toast notifications for success and error messages.

---

## 🖼 Screenshots

**Dashboard**  
![Dashboard](public/images/dashboard.png)

**Create Link Modal**  
![Create Link](public/images/add-link-modal.png)

**Link Stats Page**  
![Link Stats](public/images/link-stats.png)

**Health Check Page**  
![Health Check](public/images/healthz.png)

---

## 🛠 Tech Stack

- **Frontend:** Next.js 13 (App Router), React, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Deployment:** Vercel

---

## ⚡ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Snehal108/tinylink.git
cd tinylink

2. Install dependencies for frontend & backend:

npm install

3. Setup environment variables: Create a .env file in the root folder:
NEXT_PUBLIC_API_URL=http://localhost:4000
PORT=4000
CORS_ORIGIN=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string

4. Run the backend server:
node server/server.js

5. Run the frontend app:
npm run dev

6. Open your browser:
Frontend: http://localhost:3000
Backend Health Check: http://localhost:4000/healthz

📁 Folder Structure
tinylink/
├─ app/                  # Next.js frontend pages
│  ├─ [code]/page.jsx    # Link stats page
│  ├─ healthz/page.jsx   # Health check page
│  └─ page.jsx           # Dashboard
├─ components/           # Reusable React components
│  ├─ AddLinkModal.jsx
│  ├─ LinkTable.jsx
│  ├─ Nav.jsx
│  ├─ Toast.jsx
│  └─ EmptyState.jsx
├─ server/               # Backend code
│  ├─ db.js
│  ├─ link.model.js
│  └─ server.js
├─ public/images/        # Screenshots and static images
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
└─ README.md

💡 How It Works

- User creates a short link via the Dashboard.
- Backend saves the original URL and generates a unique code.
- Dashboard displays all links with click stats.
- Clicking on a short link redirects to the target URL and increments click count.
- Health check ensures backend is up and running.

🤝 Contributing

- Fork the repository
- Create your feature branch: git checkout -b feature/your-feature
- Commit changes: git commit -m "Add your feature"
- Push to branch: git push origin feature/your-feature
- Open a Pull Request


👨‍💻 Author
SNEHAL AHIRE
