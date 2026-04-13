---
name: git-commit
description: Generate well-crafted conventional commit messages and handle the full git commit workflow (staging, diffing, committing). Use this skill whenever the user says "commit", "/commit", "git commit", asks to commit their changes, save their work to git, or wants help writing a commit message. Also trigger when the user says things like "ok that looks good, commit it" or "save this" in a git repo context.
argument-hint: [optional: specific files or commit message hint]
allowed-tools: Bash, Read, Glob, Grep
---

## Git Commit Skill

Create meaningful conventional commits by analyzing the actual changes, not just file names.

## Workflow

### Step 1: Assess the situation

Run these in parallel:
- `git status` — see what's staged, modified, and untracked (never use `-uall`)
- `git diff --cached` — see already-staged changes
- `git diff` — see unstaged changes
- `git log --oneline -10` — see recent commit style for consistency

### Step 2: Decide what to stage

- If the user specified files via $ARGUMENTS, stage those
- If changes are already staged, respect that — don't unstage or add more unless asked
- If nothing is staged, look at all modified/untracked files and make a judgment call:
  - If all changes are related, stage everything
  - If changes span unrelated concerns, **always split into separate commits** — the user prefers atomic, single-concern commits. Group related files together and commit them one group at a time
- Never stage files that look like secrets (`.env`, credentials, tokens, API keys)
- Prefer `git add <specific-files>` over `git add .` or `git add -A`

### Step 3: Analyze the diff

Read the staged diff carefully. Understand what changed and why — the commit message should capture the intent, not just list files.

Look for:
- New features vs. modifications to existing ones
- Bug fixes (look for condition changes, error handling)
- Refactoring (same behavior, different structure)
- Config/data updates
- Documentation changes

### Step 4: Write the commit message

Follow conventional commits format matching this project's style:

```
type(scope): concise description of WHY, not WHAT

[optional body for non-obvious changes]

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

**Types** (from this project's history):
- `feat` — new functionality
- `fix` — bug fix
- `docs` — documentation only
- `chore` — maintenance, regeneration, config
- `refactor` — code restructuring without behavior change
- `test` — adding or fixing tests
- `style` — formatting, no logic change

**Scope**: derived from the primary area of change. Examples from this project: `daily`, `weekly`, `scripts`, `config`, `template`, `finance`, `prompts`.

**Message rules**:
- Lowercase after the colon
- No period at the end
- Under 72 characters for the first line
- Focus on the "why" — `add sleep structure fields` is better than `modify daily.md template`
- If multiple scopes are equally affected, omit the scope parentheses

### Step 5: Commit

Use a heredoc to preserve formatting:

```bash
git commit -m "$(cat <<'EOF'
type(scope): message here

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

### Step 6: Verify

Run `git status` after committing to confirm success. Show the user the commit hash and message.

## Edge Cases

- **Empty changes**: If there's nothing to commit, say so — don't create empty commits
- **Pre-commit hook failure**: Fix the issue, re-stage, and create a NEW commit (never `--amend` after a hook failure — the commit didn't happen, so amending would modify the previous commit)
- **Mixed changes**: If staged changes span unrelated work, suggest splitting. Offer to commit the current set and then handle the rest separately
- **User provides a message hint**: If the user says something like "commit — fixed the bug with sleep tracking", incorporate their intent but still format it properly as a conventional commit

## What NOT to Do

- Never `--amend` unless the user explicitly asks
- Never `--no-verify` or skip hooks
- Never force push
- Never commit `.env`, credentials, or secrets
- Never auto-push — only commit locally unless the user asks to push
