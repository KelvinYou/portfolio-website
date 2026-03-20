import dynamic from "next/dynamic";

export const PdfViewer = dynamic(
  () =>
    import("../pdf-renderer/pdf-viewer").then((mod) => ({
      default: mod.PdfViewer,
    })),
  { ssr: false },
);

export const PdfDownloader = dynamic(
  () =>
    import("../pdf-renderer/pdf-downloader").then((mod) => ({
      default: mod.PdfDownloader,
    })),
  { ssr: false },
);
