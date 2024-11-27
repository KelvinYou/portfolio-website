import blogs from "@/data/blogs";
import { join } from "path";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getDeviceId } from "@/utils/deviceInfoUtil";
import { db } from "@/config/firebase";

export const getBlogs = () => {
  return blogs;
}

export const blogsPath = join(process.cwd(), '/src/data/blogs');

export const incrementViewCount = async (slug: string) => {
  const deviceId = getDeviceId();
  const docRef = doc(db, "views", slug);

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    if (!data.devices.includes(deviceId)) {
      await updateDoc(docRef, {
        views: data.views + 1,
        devices: arrayUnion(deviceId),
      });
    }
  } else {
    await setDoc(docRef, {
      slug: slug,
      views: 1,
      devices: [deviceId],
    });
  }
};

export const fetchViewCount = async (slug: string) => {
  const docRef = doc(db, "views", slug);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().views;
  }
  return 0;
};