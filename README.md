### Local setup (requires Node)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Firebase CLI globally:

   ```bash
   npm install -g firebase-tools
   ```

3. Create an `.env.local` file in the root directory with environment variables for Firebase config:

   ```bash
   NEXT_PUBLIC_FIREBASEAPI_KEY=...
   NEXT_PUBLIC_FIREBASEAUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASEPROJECT_ID=...
   NEXT_PUBLIC_FIREBASESTORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASEMESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASEAPP_ID=...
   ```

4. Start the local backend server:

   ```bash
   firebase emulators:start
   ```

5. Start the local frontend server (in a new terminal):
   ```bash
   npm run dev
   ```
