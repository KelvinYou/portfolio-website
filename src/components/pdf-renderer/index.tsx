import dynamic from "next/dynamic";

export const PdfViewer = dynamic(() => import("../pdf-renderer/pdf-viewer"), {
  ssr: false,
});

export const PdfDownloader = dynamic(
  () => import("../pdf-renderer/pdf-downloader"),
  { ssr: false },
);
