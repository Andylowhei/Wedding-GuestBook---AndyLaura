
# 💒 Andy & Laura's Wedding Guestbook
An AI-powered cloud guestbook for Andy Low & Laura Kauderer's wedding on **19 September 2026**.
## Features
- 🎨 Beautiful wedding-themed design with live countdown timer
- 📝 Guests leave heartfelt messages via a web form
- 🤖 AI sentiment analysis reads the mood of each message
- 🎨 Messages are coloured by mood: happy 😊, sad 😢, neutral 😐, mixed 🤔
- 💾 All messages are permanently stored in PostgreSQL
- 🛡️ Daily rate limiting (500 messages/day) to prevent abuse
---
## 🚀 Deploy to Vercel (Step-by-Step)
### Step 1: Create a Free PostgreSQL Database
You need a database. Pick **one** of these free options:
#### Option A: Neon (Recommended)
1. Go to [neon.tech](https://neon.tech)
2. Sign up (GitHub/Google)
3. Create a new project
4. Copy the **connection string** (looks like `postgresql://user:pass@ep-xxxx.us-east-2.aws.neon.tech/dbname`)
#### Option B: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database → Connection string
4. Use the **URI** format
### Step 2: Push Code to GitHub
```bash
# Initialise git repo and push to a new GitHub repository
git init
git add .
git commit -m "Wedding guestbook - initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wedding-guestbook.git
git push -u origin main
```
### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Under **Environment Variables**, add:
   - **Key:** `DATABASE_URL`
   - **Value:** (the connection string from Step 1)
5. Click **Deploy** 🎉
### Step 4: Push the Database Schema
After Vercel deploys, you need to create the tables in your remote database.
Run this **locally** in your terminal (with your real database URL):
```bash
export DATABASE_URL="your-actual-postgresql-connection-string-here"
npx drizzle-kit push
```
Or alternatively, from the Vercel dashboard:
1. Go to **Settings** → **General** → **Deployment Protection**
2. Note: You may need to run the schema push from your local machine
That's it! Your guestbook is live. 🥂
---
## 🛠️ Tech Stack
- **Frontend:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL + Drizzle ORM
- **AI Sentiment:** Custom keyword-based mood detection
- **Deploy:** Vercel
## 📁 Project Structure
```
src/
├── app/
│   ├── api/guestbook/route.ts   # API - GET/POST messages
│   ├── layout.tsx               # Root layout + fonts
│   └── page.tsx                 # Wedding homepage
├── components/
│   ├── CountdownSection.tsx     # Live countdown to the big day
│   └── GuestbookSection.tsx     # Guestbook form + message list
├── db/
│   ├── index.ts                 # Database connection
│   └── schema.ts                # Table definitions
└── lib/
    └── sentiment.ts             # AI mood detection
```
---
Made with ♥ for Andy & Laura
