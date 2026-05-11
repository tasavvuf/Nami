# Nami

Nami is a MERN app for anonymous notes: a small emotional release valve for messages that are too heavy, too soft, or too late to send directly. People can leave a note without logging in, browse what others have released, filter by feeling, and react with a heart or a "felt this" response.

The project feels like a digital shoreline. The frontend carries the mood with full-screen imagery, glassy panels, and gentle copy, while the backend keeps the notes simple, anonymous, and persistent.

## What It Does

- Lets visitors write anonymous notes without accounts or names.
- Stores each note with an optional emotional tag.
- Shows a browsable wall of notes with tag filters.
- Opens individual note pages for longer reading.
- Tracks heart and felt reactions for each note.
- Uses a quiet landing flow before the note wall.

## Tech Stack

- MongoDB for storing anonymous notes.
- Express for the REST API.
- React for the client experience.
- Node.js for the backend runtime.
- Mongoose for MongoDB models and queries.
- Vite for the frontend dev server and build tooling.
- Tailwind CSS for the visual system.
- Axios for client API calls.

## Project Structure

```text
backend/
  server.js
  src/
    app.js
    db/db.js
    model/note.model.js

frontend/
  src/
    App.jsx
    main.jsx
    index.css
    pages/Form.jsx
    constants/tags.js
  images/
  public/
```

## API

The backend runs on `http://localhost:5000` by default.

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/` | Health welcome response |
| `GET` | `/notes` | Read all notes |
| `POST` | `/wish` | Create a new anonymous note |
| `PATCH` | `/notes/:id/felt` | Add or remove a felt reaction |
| `PATCH` | `/notes/:id/heart` | Add or remove a heart reaction |

## Updates

### v0.3
- Added same-tag note suggestion after submit
- Updated form component styling and added homepage image asset
- Enhanced glass-morphism design and added loading animations
- Added update showcase section and loading state to home page
- Updated frontend dependencies and main entry point
- Made app partially responsive (images to be worked on later)
- Updated frontend API endpoints to Railway production server
- Added Railway backend service configuration and start script
- Added about page
- Kept app workspaces clean

## Environment

Create a backend `.env` file with:

```bash
MONGO_URI=your_mongodb_connection_string
```

## Run Locally

Install backend dependencies:

```bash
cd backend
npm install
node server.js
```

Install frontend dependencies:

```bash
cd frontend
npm install
npm run dev
```

Open the frontend URL shown by Vite and keep the backend running on port `5000`.

## The Feeling

Nami is for the sentence that stayed in your throat. It is for the apology you rehearsed, the love you protected, the grief you could not name, and the tiny truth that only needed somewhere to land.

No profiles. No pressure. Just a note released into the wave.

Nami (波)

A quiet corner of the internet for the words you never sent. Anonymous notes, no logins, no names just feelings released into the wave. Built with MERN.
