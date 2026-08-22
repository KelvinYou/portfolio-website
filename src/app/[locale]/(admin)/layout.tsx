// `redirect` from the i18n navigation helpers, not from `next/navigation`. The
// bare version emitted an unprefixed `/`, which the locale middleware then had
// to redirect a second time — two hops to reach the page one hop away. It needs
// the locale to build the prefixed path, so the layout takes its own params.
import { redirect } from "@/i18n/navigation";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // The editor writes MDX to disk, so it only exists while developing. The API
  // it calls repeats this check — a route handler sits outside this layout and
  // inherits nothing from it.
  if (process.env.NODE_ENV !== "development") {
    redirect({ href: "/", locale });
  }

  return <>{children}</>;
}
