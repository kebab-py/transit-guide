# 🚀 QUICK START GUIDE

## Getting Your App Running in 5 Minutes

### Prerequisites
- Computer with internet connection
- That's it! (We'll install Node.js if needed)

### Step 1: Check if you have Node.js

Open terminal (Mac/Linux) or Command Prompt (Windows) and type:
```bash
node --version
```

**If you see a version number (like v18.0.0)**: Great! Skip to Step 3.

**If you get an error**: Continue to Step 2.

### Step 2: Install Node.js (if needed)

1. Go to https://nodejs.org/
2. Download the "LTS" version (left button)
3. Install it (just click next/accept for everything)
4. Restart your terminal/command prompt
5. Test again: `node --version`

### Step 3: Navigate to the Project

Open terminal and navigate to where you downloaded the project:

**Mac/Linux:**
```bash
cd /path/to/transit-guide
```

**Windows:**
```cmd
cd C:\path\to\transit-guide
```

### Step 4: Install Dependencies

```bash
npm install
```

This takes 2-3 minutes. You'll see a lot of text - that's normal!

### Step 5: Start the App

```bash
npm start
```

The app will automatically open in your browser at http://localhost:3000

**If it doesn't open automatically**, just open your browser and go to:
```
http://localhost:3000
```

## 🎉 That's It!

You should now see your Transit Guide app running!

## What You Can Do Now

1. **Browse Cities**: Click on Bratislava, Banská Bystrica, or Porto
2. **Test Login**: Click "Login" in the top right (it's a demo, no password needed)
3. **Add a Tip**: After logging in, go to any city and add a community tip
4. **Search**: Try searching for "Porto" or "Slovakia"

## Making Changes

The main files you'll edit:
- `src/App.js` - All the functionality
- `src/App.css` - All the styling

When you save a file, the app automatically refreshes!

## Adding Your First City

1. Open `src/App.js` in any text editor
2. Find the `initialCities` array (around line 10)
3. Copy one of the existing cities
4. Change the data to your city
5. Save the file
6. See your new city appear!

## Stopping the App

Press `Ctrl+C` in the terminal where it's running.

## Starting It Again

Just run `npm start` again!

## Next Steps

Read the other guides:
- `README.md` - Technical overview
- `DEPLOYMENT-GUIDE.md` - How to put it online
- `AI-SCRAPING-GUIDE.md` - How to automate data collection
- `backend-example/server.js` - Backend API reference

## Troubleshooting

### "npm: command not found"
- Node.js isn't installed or not in PATH
- Reinstall Node.js
- Restart your computer

### "Port 3000 already in use"
- Another app is using port 3000
- Close other apps or run: `PORT=3001 npm start`

### "Module not found"
- Delete `node_modules` folder
- Run `npm install` again

### Nothing shows up
- Check browser console (F12)
- Make sure you're at http://localhost:3000
- Try a different browser

### Still stuck?
- Google the error message
- Check Stack Overflow
- Ask on r/reactjs
- Message me (the creator) if you know how to reach me!

## Keyboard Shortcuts

- `Ctrl+C` - Stop the app
- `Ctrl+S` - Save file (auto-refreshes app)
- `F12` - Open browser developer tools

## What Files Can I Delete?

**Don't delete:**
- package.json
- package-lock.json
- public/ folder
- src/ folder
- node_modules/ (but you can regenerate it with `npm install`)

**You can customize:**
- README.md
- DEPLOYMENT-GUIDE.md
- AI-SCRAPING-GUIDE.md
- This file!

**You can ignore:**
- backend-example/ (just reference for future)
- .gitignore (only needed if using Git)

---

**Need help?** Read the README.md or DEPLOYMENT-GUIDE.md for more details!
