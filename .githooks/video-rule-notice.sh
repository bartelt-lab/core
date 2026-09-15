#!/bin/sh
# PreToolUse hook: inject the project rules when an agent is about to touch a video
# or the registry.
#
# NOT ENABLED. To turn it on, add to .claude/settings.json alongside enabledPlugins:
#   "hooks": { "PreToolUse": [ { "matcher": "Edit|Write|MultiEdit",
#     "hooks": [ { "type": "command",
#                  "command": "sh .githooks/video-rule-notice.sh", "timeout": 10 } ] } ] }
#
# wiki/video.md only helps agents that choose to read it. This fires whether or not
# they did, at the moment it matters. Silent and exit 0 for every other path, so
# ordinary edits are untouched.
#
# The rules are NOT duplicated here — PROJECT_CONTEXT.md is the single copy, printed
# verbatim, so editing that file updates this hook and the build gate at once.

payload=$(cat)
path=$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

case "$path" in
    */public/videos/*|*/src/data/videos.js) ;;
    *) exit 0 ;;
esac

root=$(git -C "$(dirname "$path")" rev-parse --show-toplevel 2>/dev/null) || exit 0
rules="$root/PROJECT_CONTEXT.md"
[ -f "$rules" ] || exit 0

jq -Rs '{hookSpecificOutput: {hookEventName: "PreToolUse", additionalContext: ("You are about to modify video content. The enforced rules for this repo follow, from PROJECT_CONTEXT.md:\n\n" + .)}}' < "$rules"
