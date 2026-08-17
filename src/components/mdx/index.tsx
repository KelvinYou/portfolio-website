import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./mdx-components";

/**
 * Post bodies are compiled and rendered on the server.
 *
 * The previous path went through `next-mdx-remote/serialize` in the loader,
 * shipped the compiled source to the browser as a prop, and evaluated it in a
 * client component loaded with `dynamic(…, { ssr: false })`. That meant a
 * `force-static` post was prerendered to HTML containing its title, its
 * metadata, and no article — the body only existed once the bundle had run.
 * (The client renderer cannot prerender either: it builds the component tree
 * inside `useMemo`, which throws during React 19 static generation.)
 *
 * The RSC renderer removes both problems and the wire payload with them: the
 * compiled MDX never crosses to the client at all.
 */
export function PostBody({ source }: { source: string }) {
  return (
    <div className="mdx-content">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          // next-mdx-remote v6 defaults `blockJS: true`, which runs a remark
          // plugin that strips every JavaScript expression from the MDX —
          // including JSX attribute values. That silently dropped `items={[…]}`
          // from the `<Gallery>` in beyondsoft.mdx, so the post shipped a "No
          // media items to display" box where its photos should be. (The old
          // serialize() path had the same default and the same bug.)
          //
          // Turning it off is safe *because of where this content comes from*:
          // every post is an .mdx file committed to this repo, authored by the
          // site owner. There is no user-submitted MDX anywhere. Disabling
          // blockJS also promotes `blockDangerousJS`, which stays on and keeps
          // blocking eval/Function/require and friends.
          blockJS: false,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeExternalLinks,
                { target: "_blank", rel: ["noopener", "noreferrer"] },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
