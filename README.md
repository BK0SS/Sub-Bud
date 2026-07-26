# 💸 Sub-Bud

> A clean, intuitive subscription tracking app to help users manage recurring expenses and take control of their budget.

🔗 **[Live Demo → subscription-bud.com](https://subscription-bud.com/)**

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

---

## 🧩 Problem → Solution

**Problem:** Subscription costs are scattered — Netflix here, Spotify there, cloud storage somewhere else. People routinely forget what they're paying for, lose track of billing cycles, and get surprised by charges they didn't notice.

**Solution:** Sub-Bud gives users a single dashboard to log every subscription, see their true monthly and yearly spend at a glance, and manage billing cycles in one place — no spreadsheet required.

---

## ✨ Features

- **Spend Overview:** Instant total of monthly and yearly subscription costs on the dashboard
- **Manage Subscriptions:** Add, edit, or delete subscriptions with custom billing cycles (monthly, yearly, weekly)
- **Secure Authentication:** Per-user data isolation via Firebase Auth — each user only ever sees their own subscriptions
- **Responsive Design:** Mobile-first UI that works on any screen size

---

## 🛠️ Tech Stack & Why

| Technology | Role | Why This Choice |
|---|---|---|
| **Next.js** | Frontend framework + API routes | Provides both SSR/SSG for fast page loads *and* built-in API routes, eliminating the need for a separate Express server for simple backend calls |
| **React** | UI component layer | Component-based architecture makes the subscription list, forms, and dashboard independently reusable and easy to maintain |
| **Firebase Firestore** | Database | A NoSQL real-time database that scales automatically with zero server management — ideal for a per-user document store where each subscription is a simple JSON object |
| **Firebase Authentication** | User auth | Handles the full auth lifecycle (sign-up, login, session management, password reset) out of the box, so no custom auth logic needed |
| **Next.js API Routes** | Backend logic | Keeps business logic server-side without deploying a separate backend service, reducing infrastructure complexity |
| **CSS (custom)** | Styling | Vanilla CSS with custom properties keeps the bundle lean and avoids dependency on a heavy UI framework |

---

## 📂 Project Structure

```text
sub-bud/
├── app/              # Next.js App Router pages and layouts
├── components/       # Reusable UI components (cards, forms, modals)
├── context/          # React Context for global auth and subscription state
├── utils/            # Helper functions (date formatting, cost calculations)
├── firebase.js       # Firebase SDK initialization and config
└── public/           # Static assets
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- A [Firebase](https://firebase.google.com/) project with Firestore and Authentication enabled

### Installation

```bash
git clone https://github.com/BK0SS/Sub-Bud.git
cd Sub-Bud/sub-bud
npm install
```

Create a `.env.local` file in the `sub-bud/` directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 👤 Author

**Bogdan Kosulin**
- GitHub: [@BK0SS](https://github.com/BK0SS)
- LinkedIn: [bogdan-kosulin](https://www.linkedin.com/in/bogdan-kosulin/)
