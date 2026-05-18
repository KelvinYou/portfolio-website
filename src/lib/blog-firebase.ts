"use client";

import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export type BlogComment = {
  id: string;
  name: string;
  email?: string;
  message: string;
  createdAt: Timestamp | null;
};

const POSTS_COLLECTION = "blog-posts";
const COMMENTS_SUBCOLLECTION = "comments";

export function isBlogFirebaseReady(): boolean {
  return isFirebaseConfigured && db !== null;
}

export function incrementPostViews(slug: string): Promise<void> {
  if (!db) return Promise.resolve();
  const ref = doc(db, POSTS_COLLECTION, slug);
  return setDoc(ref, { views: increment(1) }, { merge: true });
}

export function subscribeToAllPostViews(
  onChange: (viewsBySlug: Map<string, number>) => void
): () => void {
  if (!db) return () => {};
  const ref = collection(db, POSTS_COLLECTION);
  return onSnapshot(ref, (snap) => {
    const map = new Map<string, number>();
    snap.forEach((d) => {
      const v = (d.data()?.views as number | undefined) ?? 0;
      map.set(d.id, v);
    });
    onChange(map);
  });
}

export function subscribeToComments(
  slug: string,
  onChange: (comments: BlogComment[]) => void
): () => void {
  if (!db) return () => {};
  const ref = collection(db, POSTS_COLLECTION, slug, COMMENTS_SUBCOLLECTION);
  const q = query(ref, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const comments = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<BlogComment, "id">),
    }));
    onChange(comments);
  });
}

export async function addComment(
  slug: string,
  input: { name: string; email?: string; message: string }
): Promise<void> {
  if (!db) throw new Error("Firebase is not configured");
  const ref = collection(db, POSTS_COLLECTION, slug, COMMENTS_SUBCOLLECTION);
  await addDoc(ref, {
    name: input.name.trim().slice(0, 60),
    email: input.email?.trim().slice(0, 120) || null,
    message: input.message.trim().slice(0, 2000),
    createdAt: serverTimestamp(),
  });
}
