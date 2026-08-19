import localFont from "next/font/local";

// Shared by the locale layout and by global-not-found.tsx, which replaces the
// root layout outright and so has to declare the document's fonts itself.
export const archivo = localFont({
  src: [
    {
      path: "../../public/assets/fonts/open-sans-v17-latin-regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/assets/fonts/open-sans-v17-latin-600.ttf",
      weight: "600",
    },
    {
      path: "../../public/assets/fonts/open-sans-v17-latin-700.ttf",
      weight: "700",
    },
  ],
  variable: "--font-archivo",
  display: "swap",
});

export const spaceGrotesk = localFont({
  src: [
    {
      path: "../../public/assets/fonts/quicksand-v20-latin-300.ttf",
      weight: "300",
    },
    {
      path: "../../public/assets/fonts/quicksand-v20-latin-regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/assets/fonts/quicksand-v20-latin-600.ttf",
      weight: "600",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const bodyClassName = `${archivo.variable} ${spaceGrotesk.variable} font-sans antialiased`;
