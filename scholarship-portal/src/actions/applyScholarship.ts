import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

export async function applyForScholarship(data: any) {
  const customId = "cslbYwjW3IyrcIkF7HLG";
  const ref = doc(db, "applications", customId);
  const existing = await getDoc(ref);

  if (existing.exists()) {
    return { success: false, error: "Application already submitted." };
  }

  await setDoc(ref, {
    ...data,
    createdAt: Timestamp.now(),
    status: "pending",
  });

  return { success: true, id: customId };
}
