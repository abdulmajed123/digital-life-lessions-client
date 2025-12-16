# Project Name

---Digital-life-lessons

🌐 Live Site: https://digital-life-lessons-d2dce.web.app

**Digital Life Lessons** is an interactive platform for browsing, creating, and sharing educational life lessons. It provides a unique experience to learn from life stories, enhance personal growth, and interact with a supportive community.

---

## Features

- ✅ Responsive Navbar & Footer across all pages
- ✅ User Authentication: Email/Password & Google Sign-In
- ✅ Private/Protected Routes for creating, editing, and viewing lessons
- ✅ Browse Public Lessons with filters (category, emotional tone) and sorting (newest, most saved)
- ✅ Premium Upgrade via Stripe for exclusive lessons
- ✅ Comment, Like, Save/Favorite, Share, and Report Life Lessons
- ✅ Admin Dashboard for managing users, lessons, and reported content
- ✅ Interactive Analytics for users and admin
- ✅ Lottie animations for engaging user experience

---

## Pages

**Public Pages:**

- Home (Hero Banner, Featured Lessons, Top Contributors, Most Saved Lessons)
- Public Lessons (Card Layout, Filter, Sort, Search)
- Login / Register
- 404 Not Found

**Private / Protected Pages:**

- Add Lesson
- My Lessons
- Update Lesson
- Lesson Details
- Favorites
- Dashboard (User / Admin)
- Pricing / Upgrade
- Payment Success & Cancel

---

## Dashboard

### User Dashboard

- Overview: Total lessons created, saved, recently added, analytics charts
- Add Lesson: Title, Description, Category, Emotional Tone, Image, Access Level (Free/Premium)
- My Lessons: Table view with Update/Delete, visibility toggle, stats, and favorites
- Favorites: View and manage saved lessons
- Profile: Update name/photo, view created lessons, Premium badge

### Admin Dashboard

- Admin Overview: Total users, lessons, flagged content, most active contributors
- Manage Users: Update role, delete accounts
- Manage Lessons: Delete inappropriate lessons, feature lessons, mark reviewed
- Reported Lessons: Review and take action on flagged content
- Admin Profile: Update photo and display name

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router, React Hook Form
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Auth + Firebase Admin SDK for token verification
- **Payment Gateway:** Stripe (Test Mode)
- **Deployment:** Vercel (server), firebase(client)

---

## Installation

```bash
# Clone the repository
git clone :https://github.com/abdulmajed123/digital-life-lessions-client
# Go to client folder
cd digital-life-lessons/client

# Install dependencies
npm install

# Start development server
npm start


```
