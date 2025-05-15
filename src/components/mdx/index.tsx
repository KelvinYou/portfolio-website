"use client";

import dynamic from "next/dynamic";

export const MdxRemoteRender = dynamic(() => import("./mdx-remote-render"), {
  ssr: false,
});
