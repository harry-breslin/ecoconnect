### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create an `.env.local` file in the root directory with environment variables for Firebase config:

   ```bash
   FIREBASE_API_KEY=...
   FIREBASE_AUTH_DOMAIN=...
   FIREBASE_PROJECT_ID=...
   FIREBASE_STORAGE_BUCKET=...
   FIREBASE_MESSAGING_SENDER_ID=...
   FIREBASE_APP_ID=...
   ```

3. Start the local backend server:

   ```bash
   firebase emulators:start
   ```

4. Start the local frontend server (in a new terminal):
   ```bash
   npm run dev
   ```
