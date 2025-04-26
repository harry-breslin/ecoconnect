/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions/v1");
const { FieldValue } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
admin.initializeApp();
// Connect to Firestore emulator if running locally
if (process.env.FIRESTORE_EMULATOR_HOST) {
  admin.firestore().settings({
    host: process.env.FIRESTORE_EMULATOR_HOST,
    ssl: false,
  });
}

// Trigger whenever a listing’s status changes
exports.onSwapComplete = functions.firestore
  .document("listings/{listingId}")
  .onUpdate(async (change, context) => {
    console.log("onSwapComplete triggered");
    const before = change.before.data(),
      after = change.after.data();

    // Only fire when status flips from anything → "completed"
    const newlyCompleted =
      before.status !== "completed" && after.status === "completed";
    if (!newlyCompleted) return null;

    const ownerId = after.ownerId, // uid of the listing owner
      otherUserId = after.swappedWith; // make sure frontend writes this field

    const POINTS_GAIN = 10;

    // Update both users in parallel
    await Promise.all(
      // 2102 reference !!
      [ownerId, otherUserId].map(async (userId) =>
        admin
          .firestore()
          .doc(`users/${userId}`)
          // Increment each user’s points by POINTS_GAIN
          .update({ points: FieldValue.increment(POINTS_GAIN) })
      )
    );
    console.log(`Points awarded to ${ownerId} and ${otherUserId}`);
    return null;
  });
