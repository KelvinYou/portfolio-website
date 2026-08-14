---
name: flow
description: Design and maintain JSON-first flow and pipeline diagrams with derived SVG and Mermaid outputs. Use when building or updating flowcharts, PipelineDiagram-like UI renderers, architecture Mermaid docs, diagram source JSON, or synchronization checks across projects.
---

# Flow Diagrams

Use a structured model as the source of truth for a flow diagram and treat every
visual format as a projection of that model.

## Core rule

```text
canonical JSON → SVG/UI renderer
                → Mermaid/document renderer
```

Never make Mermaid the canonical source. Do not build a Mermaid → JSON parser as
the default workflow: Mermaid syntax is presentation-oriented and can lose
domain semantics, layout intent, or metadata. If a Mermaid-only diagram must be
migrated, manually reconstruct and review the structured model, then regenerate
the Mermaid from it.

A minimal canonical model looks like this — domain meaning only, no coordinates:

```json
{
  "schemaVersion": 1,
  "stages": [
    { "id": "ingest", "label": "Ingest" },
    { "id": "score", "label": "Score" }
  ],
  "nodes": [
    { "id": "raw_prices", "stage": "ingest", "label": "Raw prices", "tone": "data" },
    { "id": "risk_checker", "stage": "score", "label": "RiskChecker", "tone": "agent" }
  ],
  "edges": [
    { "from": "raw_prices", "to": "risk_checker", "kind": "flow" }
  ]
}
```

Layout coordinates, theme classes (color/tone → CSS), and Mermaid node shapes are
all derived from this at render time — never stored back into it.

## Skip this skill when

A one-off diagram with no reuse and no expected edits (a single Mermaid block in
a README explaining a concept once) doesn't need a JSON source of truth — draw
the Mermaid directly. Reach for the canonical-model workflow once a diagram has
a second consumer (UI + docs), gets edited more than once, or needs to stay in
sync with code.

## Workflow

1. **Inspect before designing.** Find the existing JSON, types, renderer,
   Mermaid/document generator, generated files, and CI checks. Reuse the
   project's domain vocabulary and conventions.
2. **Establish the canonical model.** Give nodes and stages stable IDs. Keep
   domain meaning (labels, roles, states, edge semantics) separate from
   renderer-specific coordinates and theme classes. Add a schema version when
   the data is persisted or shared.
3. **Validate the model.** Check JSON syntax, required fields, unique IDs,
   references, and any domain invariants. Add runtime schema validation when
   there are multiple consumers or frequent edits; do not invent a broad
   generic schema for a single consumer.
4. **Render each output from the model.** Prefer a pure layout function and a
   renderer that owns its theme and accessibility. The SVG/UI renderer and the
   Mermaid renderer may have different layout details, but neither owns the
   source data.
5. **Synchronize and verify.** Run the project's generator, then its check mode
   (for example, `--check`). Run focused type/tests and inspect the rendered UI
   when visual changes matter. Add a read-only CI check for generated docs when
   drift would be costly.
6. **Keep abstraction proportional.** With one consumer, keep types and layout
   local. After a second real consumer appears, extract only the proven,
   framework-independent model/layout seam into a package. Keep React, Next.js,
   Tailwind, and product-specific tones in adapters.

## Editing rules

- Edit the canonical JSON, not generated Mermaid or SVG output.
- Keep IDs deterministic and labels escaped by the target renderer.
- Make fan-out, convergence, bidirectional exchange, and dashed/conditional
  edges explicit in the model instead of inferring them from coordinates.
- Prefer automatic layout over hand-tuned coordinates when the graph changes.
- Every rendered `<svg>` gets a `<title>` and `<desc>`; every node keeps its
  canonical `id` as a stable DOM anchor (e.g. `data-node-id`) so it can be
  targeted by tests, deep links, or screen-reader navigation.
- Do not add a parser, package, schema, or visual QA harness solely because it
  sounds reusable; tie each addition to a real consumer or failure mode.

## Anti-patterns

- Hand-authoring long SVG path data for a graph that has automatic layout
  available — regenerate paths from the model instead of hand-tuning points.
- Encoding layout position (x/y, row/column index) as domain state in the
  canonical JSON — position is a render concern, derived by the layout
  function, not stored.
- Baking a specific renderer's theme classes (Tailwind classes, Mermaid
  `classDef` names) into node objects — store a semantic `tone`/`role` and let
  each renderer map it to its own styling.
- Writing a bespoke Mermaid string parser to "sync back" edits made directly
  in generated `.md` files — edits belong in the JSON; treat generated Mermaid
  as read-only output.

## Existing-project adaptation

For a system like `ai-stock-analysis`, the intended maintenance loop is:

```text
edit pipeline.json
→ render the SVG in PipelineDiagram
→ run sync_architecture.py
→ run sync_architecture.py --check
→ inspect/test the affected output
```

The exact filenames and commands are project-local. Discover them first rather
than copying this example literally.
