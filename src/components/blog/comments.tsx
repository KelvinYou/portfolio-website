"use client";

import { motion } from "framer-motion";
import { MessageCircle, Send, User } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { usePostComments } from "@/components/blog/blog-data-provider";
import { defaultViewport, fadeIn } from "@/lib/animations";
import {
  addComment,
  isBlogFirebaseReady,
  type BlogComment,
} from "@/lib/blog-firebase";
import { cn, formatRelativeTime } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialForm: FormState = { name: "", email: "", message: "" };

export function Comments({ slug }: { slug: string }) {
  const ready = isBlogFirebaseReady();
  const { comments, loaded: contextLoaded } = usePostComments(slug);
  // When Firebase isn't configured, we still want the UI to "finish loading"
  // and show the unavailable state.
  const loaded = ready ? contextLoaded : true;
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const messageLength = form.message.length;
  const isValid = useMemo(() => {
    const name = form.name.trim();
    const message = form.message.trim();
    if (name.length < 2 || name.length > 60) return false;
    if (message.length < 2 || message.length > 2000) return false;
    if (form.email.trim() && !isValidEmail(form.email.trim())) return false;
    return true;
  }, [form]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    try {
      await addComment(slug, {
        name: form.name.trim(),
        email: form.email.trim() || undefined,
        message: form.message.trim(),
      });
      setForm(initialForm);
      toast.success("Comment posted");
    } catch (err) {
      console.error("Failed to post comment:", err);
      toast.error("Couldn't post comment. Try again?");
    } finally {
      setSubmitting(false);
    }
  }

  if (!ready) {
    return (
      <section className="mt-12 pt-10 border-t border-border/30">
        <p className="text-xs font-mono tracking-[0.16em] uppercase text-subtle mb-1">
          Comments
        </p>
        <p className="text-sm text-muted-foreground">
          Comments are temporarily unavailable.
        </p>
      </section>
    );
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeIn}
      className="mt-12 pt-10 border-t border-border/30"
    >
      <header className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs font-mono tracking-[0.16em] uppercase text-subtle mb-1">
            Comments
          </p>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary-ink/70" />
            {loaded ? comments.length : "—"}{" "}
            {comments.length === 1 ? "response" : "responses"}
          </h2>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-border/40 bg-card/40 p-5 mb-8"
      >
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your name *"
            maxLength={60}
            required
            className="w-full px-3 py-2.5 rounded-lg bg-muted/40 border border-border/40 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/15 transition-all placeholder:text-subtle"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="Email (optional, not shown)"
            maxLength={120}
            className="w-full px-3 py-2.5 rounded-lg bg-muted/40 border border-border/40 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/15 transition-all placeholder:text-subtle"
          />
        </div>
        <textarea
          value={form.message}
          onChange={(e) =>
            setForm((f) => ({ ...f, message: e.target.value.slice(0, 2000) }))
          }
          placeholder="Share your thoughts…"
          rows={4}
          required
          className="w-full px-3 py-2.5 rounded-lg bg-muted/40 border border-border/40 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/15 transition-all placeholder:text-subtle resize-y"
        />
        <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
          <span
            className={cn(
              "text-[11px] font-mono",
              messageLength > 1800
                ? "text-foreground"
                : "text-subtle",
            )}
          >
            {messageLength}/2000
          </span>
          <button
            type="submit"
            disabled={!isValid || submitting}
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              "border",
              isValid && !submitting
                ? "border-primary/60 bg-primary/10 text-foreground hover:bg-primary/20 hover:border-primary"
                : "border-border/40 bg-muted/30 text-muted-foreground cursor-not-allowed",
            )}
          >
            <Send className="h-3.5 w-3.5" />
            {submitting ? "Posting…" : "Post comment"}
          </button>
        </div>
      </form>

      {!loaded ? (
        <p className="text-sm text-subtle">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-subtle text-center py-8">
          Be the first to leave a comment.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </ul>
      )}
    </motion.section>
  );
}

function CommentItem({ comment }: { comment: BlogComment }) {
  const date = comment.createdAt?.toDate?.();
  const dateLabel = date ? formatRelativeTime(date) : "just now";

  return (
    <li className="rounded-xl border border-border/40 bg-card/40 p-4">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <User className="h-3.5 w-3.5 text-primary-ink/70" />
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-sm font-semibold text-foreground">
            {comment.name}
          </span>
          <span className="text-[11px] text-subtle">
            {dateLabel}
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap break-words pl-9">
        {comment.message}
      </p>
    </li>
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
