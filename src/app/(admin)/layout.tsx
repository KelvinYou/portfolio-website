import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV !== "development") {
    return redirect("/");
  }
  return <>{children}</>;
}
