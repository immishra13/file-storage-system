# CloudDrive — Personal Cloud Storage

Your Personal Cloud Storage. Securely store, organize, and share your files with a beautiful, minimal platform.

## What it does

- Upload and organise your files from one dashboard: Files, Folders and Shared views.
- Share any file with a public link (`/share/:fileId`).
- Sign in with email and password, or with Google.
- File cards with edit and details views, plus toast notifications.

## Stack

- React 19 + Vite
- Firebase (Authentication, Firestore)
- react-router-dom v7, lucide-react, react-hot-toast

## How it works

- **Auth:** Firebase Auth (email/password + Google sign-in). Each signup creates a Firestore user document with `storageUsed: 0`.
- **Files:** stored in the Firestore `files` collection. The dashboard lists only the files where `uploadedBy` matches the signed-in user, so one query is the access rule.
- **Routes:** `/` landing, `/login`, `/signup`, `/dashboard/*` (protected, behind login), `/share/:fileId` (public view of a shared file).
- **Dashboard:** sidebar + navbar, Files / Folders / Shared views, a folder detail route, and a mobile sidebar.

## Run it

```bash
npm install
npm run dev     # start the dev server
npm run build   # production build
npm run lint    # ESLint
```

You need your own Firebase project: add its config in `src/firebase/config.js` (Auth + Firestore).

## Status

Work in progress. Folder filtering is not wired yet: the Files view currently lists all of the signed-in user's files, and the `folderId` filter in `FilesView.jsx` is commented out.
