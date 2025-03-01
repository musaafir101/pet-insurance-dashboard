import { NextResponse } from "next/server";
import admin from "firebase-admin";

// Initialize Firebase Admin (Only once)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Handle POST requests (Save Messages)
export async function POST(req) {
  try {
    const { text } = await req.json();
    await db.collection("messages").add({
      text,
      sender: "User",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle GET requests (Fetch Messages)
export async function GET() {
  try {
    const snapshot = await db
      .collection("messages")
      .orderBy("timestamp", "asc")
      .get();
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
