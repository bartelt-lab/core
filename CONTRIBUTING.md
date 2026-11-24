# Contributing to the CORE website

For members of the network who want to change something on
<https://www.core-network.ai>: add a paper, update a person, post a news
item, fix a text, or anything larger.

There are two ways in, and nothing in between:

- **You have write access to the repository.** You can change anything
  directly. The conventions below still hold, and so does the fact that
  whatever reaches `main` is published.
- **You do not.** Every change, of any size, is a pull request from your own
  copy (a fork). Someone with write access reviews and merges it. There is no
  need to ask first or to open an issue: the pull request is the proposal.

The rest of this page describes the pull request route.

You do not need to know React for content changes.
[wiki/editing-content.md](wiki/editing-content.md) names the one file to edit
for each kind of content and shows what to write.

## Once: set up

You need [Node.js](https://nodejs.org) 20 or newer and Git.

1. On GitHub, open <https://github.com/bartelt-lab/core> and press **Fork**.
2. Get your fork onto your machine and install:

   ```bash
   git clone https://github.com/<your-user>/core.git
   cd core
   npm install
   git remote add upstream https://github.com/bartelt-lab/core.git
   git config core.hooksPath .githooks
   ```

   The last line switches on a check that runs when a commit touches a video.

## Each change

1. **Start from the current site,** not from where your fork happens to be:

   ```bash
   git fetch upstream
   git switch -c add-chi-paper upstream/main
   ```

   One branch per change, named after it.

2. **Make the change.** See [wiki/editing-content.md](wiki/editing-content.md).

3. **Look at it.**

   ```bash
   npm run dev
   ```

   Open the address it prints and go to the page you changed. Check it in
   **German** and in **dark mode** as well (both buttons are at the bottom
   left of every page), and once at phone width.

4. **Run the checks.**

   ```bash
   npm run lint
   npm run build
   ```

   Both must pass. The build takes about a minute; its last step needs a
   browser, which you install once with `npx playwright install chromium`.
   On Windows the build currently stops at its first step for a reason that
   has nothing to do with your change; run `npm run build:fast` instead. The
   full build then runs for you on GitHub, in the next step.

5. **Commit and push to your fork.**

   ```bash
   git add -A
   git commit
   git push -u origin add-chi-paper
   ```

6. **Open the pull request** on GitHub, against `bartelt-lab/core`, branch
   `main`. Fill in the short form it shows you.

GitHub then runs the lint and the full build on your pull request by itself
("Check pull request"). A green tick means the site would still build with
your change; a red cross links to the step that failed and what it said. Push
a fix to the same branch and it runs again. On your first pull request the
check may wait until someone with write access approves it.

Someone with write access will review the pull request, may ask for a change,
and merges it. **Merging into `main` publishes the site.**

## What to read before a larger change

A pull request can contain anything. For some changes there is a guide that
saves you a round of review:

| If you … | Read first |
|---|---|
| add or change a person, a paper, a news item, a contact | [wiki/editing-content.md](wiki/editing-content.md) |
| add or move a page | [wiki/routing-and-seo.md](wiki/routing-and-seo.md), [wiki/site-structure.md](wiki/site-structure.md) |
| touch a header, a menu or the footer | [wiki/navigation.md](wiki/navigation.md) |
| change a colour or a layout | [wiki/visual-identity.md](wiki/visual-identity.md), [wiki/dark-mode.md](wiki/dark-mode.md) |
| add, replace or re-encode a video | [wiki/video.md](wiki/video.md): the build enforces its rules |
| add an embed or load anything from another server (fonts, scripts, players, maps) | [wiki/legal-pages.md](wiki/legal-pages.md): the privacy policy has to stay true |
| change the Impressum or the privacy policy | [wiki/legal-pages.md](wiki/legal-pages.md) |

## Conventions

**Text**

- Every text is written twice, German first: `['Deutsch', 'English']`.
  Write both; do not leave one empty or paste the same language twice unless
  the text really is the same.
- The three research groups are **groups**, not labs: TU Clausthal, CORE Cluj,
  MDS Rostock ("MDS Lab" is that group's name). "CORE Labs" means the
  laboratories. CORE is a network of **researchers**, not of universities.
  "Cognitive Software" is not translated. The full table is in
  [wiki/site-structure.md](wiki/site-structure.md).
- A paper headline in news reads "Our paper … has been accepted at …".

**Content**

- A person belongs under the group they are a member of. A position belongs
  to the group that offers it, not to the network.
- Everything about a laboratory goes on the CORE Labs page, not on a group's
  page.
- Only publish an email address its owner wants public.

**Files**

- Pictures are WebP, under `public/`, named in lower case with hyphens
  (`jane-doe.webp`). Run `npm run optimize-images` on anything large.
- Do not upload a phone photo as it is: it records where it was taken.
  Converting it to WebP drops that.
- No Git LFS. A video above 25 MB gets a warning from the build; keep clips below that.
- Do not delete `public/google2e6aa57e94108948.html`. It looks like a stray
  file and is not.

**Commits and pull requests**

- One topic per pull request. "Add CHI 2027 paper" and "fix Jane's email" are
  two pull requests.
- The first line of a commit says what changed, as an instruction: "Add the
  CHI 2027 paper". If it is not obvious why, say why in the lines below.
- No "generated by" or co-author lines from AI tools in commit messages.
- If your change makes a sentence in `wiki/` or `README.md` wrong, correct
  that sentence in the same pull request.

## If something goes wrong

- **`npm run lint` complains:** it names the file and line. Most often it is a
  missing comma or quote in a data file.
- **The page is blank:** open the browser's console (F12); the first red line
  usually names the file.
- **Your picture does not show:** the path must start with `/` and match the
  file name exactly, including upper and lower case.
- **The build says a video has no description:** that is the video rule doing
  its job. See [wiki/video-workflow.md](wiki/video-workflow.md).
- **Git says your branch is behind:** `git fetch upstream` and
  `git rebase upstream/main`, then push again with `--force-with-lease`.

Known problems that are not yours to fix are in
[wiki/open-issues.md](wiki/open-issues.md).

## Going further

For anything beyond content: [README.md](README.md) lists every guide.
[wiki/site-structure.md](wiki/site-structure.md) explains how the site is
organised, [wiki/navigation.md](wiki/navigation.md) how the headers and menus
work, and [AGENTS.md](AGENTS.md) collects the rules that have already cost
someone time.
