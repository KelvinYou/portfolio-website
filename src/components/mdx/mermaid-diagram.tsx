"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState } from "react";

// Mermaid's own palettes are light-grey/blue and read as a pasted-in foreign
// image against this site. These map its theme variables onto the same tokens
// globals.css uses, so a diagram looks like it belongs to the page.
const THEME_VARIABLES = {
  dark: {
    background: "#07070C",
    primaryColor: "#0E0E18",
    primaryTextColor: "#F0F0F6",
    primaryBorderColor: "#00F0FF",
    secondaryColor: "#121220",
    secondaryTextColor: "#F0F0F6",
    secondaryBorderColor: "rgba(255, 255, 255, 0.08)",
    tertiaryColor: "#0E0E18",
    tertiaryTextColor: "#F0F0F6",
    tertiaryBorderColor: "rgba(255, 255, 255, 0.08)",
    lineColor: "#00F0FF",
    textColor: "#F0F0F6",
    mainBkg: "#0E0E18",
    nodeBorder: "#00F0FF",
    nodeTextColor: "#F0F0F6",
    clusterBkg: "rgba(0, 240, 255, 0.04)",
    clusterBorder: "rgba(255, 255, 255, 0.08)",
    edgeLabelBackground: "#07070C",
    // Sequence diagrams
    actorBkg: "#0E0E18",
    actorBorder: "#00F0FF",
    actorTextColor: "#F0F0F6",
    actorLineColor: "rgba(255, 255, 255, 0.24)",
    signalColor: "#F0F0F6",
    signalTextColor: "#F0F0F6",
    labelBoxBkgColor: "#0E0E18",
    labelBoxBorderColor: "#00F0FF",
    labelTextColor: "#F0F0F6",
    loopTextColor: "#F0F0F6",
    noteBkgColor: "rgba(0, 240, 255, 0.08)",
    noteBorderColor: "#00F0FF",
    noteTextColor: "#F0F0F6",
    sequenceNumberColor: "#07070C",
    // State diagrams
    transitionColor: "#00F0FF",
    transitionLabelColor: "#F0F0F6",
    stateBkg: "#0E0E18",
    stateLabelColor: "#F0F0F6",
    altBackground: "#121220",
    compositeBackground: "#0E0E18",
    compositeBorder: "rgba(255, 255, 255, 0.08)",
    compositeTitleBackground: "#121220",
    innerEndBackground: "#0E0E18",
    specialStateColor: "#00F0FF",
  },
  light: {
    background: "#F8F8FC",
    primaryColor: "#FFFFFF",
    primaryTextColor: "#0C0C14",
    primaryBorderColor: "#00B4C4",
    secondaryColor: "#F2F2F8",
    secondaryTextColor: "#0C0C14",
    secondaryBorderColor: "rgba(0, 0, 0, 0.09)",
    tertiaryColor: "#FFFFFF",
    tertiaryTextColor: "#0C0C14",
    tertiaryBorderColor: "rgba(0, 0, 0, 0.09)",
    lineColor: "#00B4C4",
    textColor: "#0C0C14",
    mainBkg: "#FFFFFF",
    nodeBorder: "#00B4C4",
    nodeTextColor: "#0C0C14",
    clusterBkg: "rgba(0, 180, 196, 0.05)",
    clusterBorder: "rgba(0, 0, 0, 0.09)",
    edgeLabelBackground: "#F8F8FC",
    actorBkg: "#FFFFFF",
    actorBorder: "#00B4C4",
    actorTextColor: "#0C0C14",
    actorLineColor: "rgba(0, 0, 0, 0.24)",
    signalColor: "#0C0C14",
    signalTextColor: "#0C0C14",
    labelBoxBkgColor: "#FFFFFF",
    labelBoxBorderColor: "#00B4C4",
    labelTextColor: "#0C0C14",
    loopTextColor: "#0C0C14",
    noteBkgColor: "rgba(0, 180, 196, 0.1)",
    noteBorderColor: "#00B4C4",
    noteTextColor: "#0C0C14",
    sequenceNumberColor: "#FFFFFF",
    transitionColor: "#00B4C4",
    transitionLabelColor: "#0C0C14",
    stateBkg: "#FFFFFF",
    stateLabelColor: "#0C0C14",
    altBackground: "#F2F2F8",
    compositeBackground: "#FFFFFF",
    compositeBorder: "rgba(0, 0, 0, 0.09)",
    compositeTitleBackground: "#F2F2F8",
    innerEndBackground: "#FFFFFF",
    specialStateColor: "#00B4C4",
  },
} as const;

interface MermaidDiagramProps {
  chart: string;
  className?: string;
  /** Describes the diagram for screen readers and for anyone it fails to render for. */
  label?: string;
}

// A fence has nowhere to hang a caption, so authors declare one as a mermaid
// comment (`%% label: …`) on the first line. Mermaid ignores `%%` itself.
const LABEL_DIRECTIVE = /^\s*%%\s*label:\s*(.+)$/im;

export function MermaidDiagram({
  chart,
  className,
  label: labelProp,
}: MermaidDiagramProps) {
  const label = labelProp ?? chart.match(LABEL_DIRECTIVE)?.[1]?.trim();
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);
  // useId gives a stable id per instance; mermaid needs a unique one per render
  // or concurrent diagrams on the same page overwrite each other's definitions.
  const reactId = useId();
  const renderKey = useRef(0);

  useEffect(() => {
    let cancelled = false;
    // next-themes resolves on the client only; rendering before it settles would
    // paint a light diagram and then swap, which flashes on the black theme.
    if (!resolvedTheme) return;

    const mode = resolvedTheme === "dark" ? "dark" : "light";

    // Dynamic import keeps mermaid (~500KB) out of every other page's bundle —
    // only a post that actually contains a diagram pays for it.
    import("mermaid")
      .then(async ({ default: mermaid }) => {
        if (cancelled) return;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: "var(--font-archivo), system-ui, sans-serif",
          themeVariables: THEME_VARIABLES[mode],
        });

        renderKey.current += 1;
        const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, "")}-${renderKey.current}`;
        const { svg: rendered } = await mermaid.render(id, chart);
        if (!cancelled) {
          setSvg(rendered);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to render diagram");
      });

    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme, reactId]);

  if (error) {
    // Fall back to the source rather than an empty gap — a broken diagram should
    // still let the reader see what it was meant to say.
    return (
      <figure className={cn("my-6", className)}>
        <pre className="overflow-x-auto rounded-xl border border-destructive/30 bg-muted/30 p-4 text-sm">
          <code>{chart}</code>
        </pre>
        <figcaption className="mt-2 text-xs text-destructive">
          Diagram failed to render: {error}
        </figcaption>
      </figure>
    );
  }

  // The rendered SVG is a picture of a graph with no accessible structure, so
  // it is hidden from assistive tech and the description carries the meaning.
  const description =
    label ?? "Diagram. The surrounding text describes the same structure.";

  return (
    <figure
      className={cn(
        "my-6 rounded-xl border border-border/30 bg-muted/20 p-4",
        className,
      )}
      role="group"
      aria-label={description}
    >
      <div
        className={cn(
          "flex justify-center overflow-x-auto",
          // Reserve height while mermaid loads so the article doesn't jump.
          !svg && "min-h-40 animate-pulse",
        )}
        aria-hidden="true"
        // Mermaid output is generated from author-controlled MDX in this repo,
        // and securityLevel "strict" strips script/HTML from labels.
        dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
      />
      {label ? (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}
