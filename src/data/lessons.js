export const modules = {
  git: {
    id: 'git', title: 'Version Control', description: 'Master Git and GitHub from beginner to advanced', icon: '🔀',
    badges: [
      { label: 'Git', variant: 'beginner' },
      { label: 'GitHub', variant: 'beginner' },
      { label: 'Beginner → Advanced', variant: 'intermediate' }
    ],
    sections: [
      { id: 'sec1', title: 'Introduction to Version Control', lessons: [
        { id: 'l1', title: 'What is Version Control?', duration: '6 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'Version control is a system that records changes to files over time, allowing you to recall specific versions later. Think of it as an unlimited undo button for your entire project — not just one file, but everything.' },
          { type: 'analogy', body: 'Imagine working on a Word document with a teammate. Without version control, you\'d email files back and forth: report.docx, report_v2.docx, report_FINAL.docx, report_FINAL_v2_ACTUAL.docx. Version control eliminates this chaos.' },
          { type: 'callout', variant: 'mistake', body: 'Without version control: no rollback on bugs, accidental overwrites destroy work, collaboration becomes a nightmare, no audit trail of who changed what.' },
          { type: 'diagram', title: 'With vs Without VCS', content: 'Without VCS:\nproject_v1.zip → project_v2.zip → project_final.zip → project_ACTUAL_final.zip 😱\n\nWith VCS:\ncommit a1b → commit c3d → commit e5f → commit g7h ✓  (+ full history, branches, rollback)' },
          { type: 'concept', body: 'Centralized VCS (SVN) uses a single central server — one point of failure. Distributed VCS (Git) gives every developer a complete copy of the entire history. No internet required to work. No single point of failure.' },
          { type: 'diagram', title: 'Centralized vs Distributed', content: 'CENTRALIZED (SVN):        DISTRIBUTED (Git):\n   [Central Server]          [Your Machine - Full Repo]\n   /     |     \\                    ↕\n Dev1   Dev2   Dev3         [Remote (GitHub)]\n                                    ↕\n                            [Teammate - Full Repo]' },
          { type: 'callout', variant: 'note', body: 'Version control is not optional in professional software development. It is the foundation everything else is built on.' },
          { type: 'summary', points: ['VCS tracks every change to your codebase over time', 'Enables collaboration without conflict', 'Git is distributed — every developer has the full history', 'Rollback to any point in history instantly'] }
        ]},
        { id: 'l2', title: 'Introduction to Git', duration: '8 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'Git is a free, open-source distributed version control system created by Linus Torvalds in 2005. He built it in two weeks to manage the Linux kernel after the existing tool\'s license was revoked. Today it powers virtually every software project on earth.' },
          { type: 'concept', body: 'Unlike older systems that track file differences (diffs), Git stores a snapshot of your entire project at each commit. If files haven\'t changed, Git stores a reference to the previous snapshot — not a duplicate. This makes Git extremely efficient.' },
          { type: 'diagram', title: 'Snapshot vs Delta Model', content: 'Delta-based (older VCS):\nFile A:  v1 → +lines → +lines → -lines\nFile B:  v1 → (no change) → +lines\n\nSnapshot-based (Git):\nCommit 1: [A-v1] [B-v1] [C-v1]\nCommit 2: [A-v2] [B-v1 ref] [C-v2]   ← B unchanged = just a reference\nCommit 3: [A-v2 ref] [B-v2] [C-v3]' },
          { type: 'concept', body: 'Git manages three areas: Working Directory (your actual files on disk), Staging Area / Index (what you\'ve told Git to include in the next commit), Repository / .git (the permanent database of all commits).' },
          { type: 'diagram', title: 'Git Three Trees', content: '┌──────────────────────────────────────────────────┐\n│  Working Directory     Staging Area    Repository  │\n│  (your files)          (Index)         (.git/)     │\n│                                                    │\n│  [edit files]                                      │\n│       ──── git add ────►                          │\n│                        [stage changes]             │\n│                             ──── git commit ────►  │\n│                                          [snapshot] │\n└──────────────────────────────────────────────────┘' },
          { type: 'code', language: 'bash', code: '# Check your git version\ngit --version\n# git version 2.43.0\n\n# See the three areas in action\ngit status           # shows working dir vs staging\ngit diff             # working dir vs staging\ngit diff --staged    # staging vs last commit' },
          { type: 'callout', variant: 'mistake', body: 'Git is NOT GitHub. Git is the version control tool that runs on your machine. GitHub is a website that hosts Git repositories in the cloud and adds collaboration features. You can use Git without GitHub entirely.' }
        ]}
      ]},
      { id: 'sec2', title: 'Setting Up Git', lessons: [
        { id: 'l3', title: 'Installing Git', duration: '5 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'Before using Git, install it on your machine. Git is available for all major operating systems. Always install the latest stable version — many modern commands require Git 2.23+.' },
          { type: 'code', language: 'bash', code: '# Download Git for Windows from: https://git-scm.com/download/win\n# Run the installer — use all defaults\n# Verify in Git Bash or PowerShell:\ngit --version\n# git version 2.43.0.windows.1\n\n# Recommended: Use Git Bash for all Git commands on Windows\n# It provides a Unix-like terminal experience' },
          { type: 'code', language: 'bash', code: '# macOS — Option 1: Xcode Command Line Tools (simplest)\nxcode-select --install\n\n# macOS — Option 2: Homebrew (recommended)\nbrew install git\n\n# Verify:\ngit --version\n# git version 2.43.0' },
          { type: 'code', language: 'bash', code: '# Linux — Ubuntu/Debian\nsudo apt update\nsudo apt install git -y\ngit --version\n\n# Linux — Fedora/RHEL\nsudo dnf install git\ngit --version' },
          { type: 'callout', variant: 'tip', body: 'After installing, open your terminal and run git --version. If it returns a version number, Git is installed correctly. If not, restart your terminal and try again.' },
          { type: 'callout', variant: 'tip', body: 'Install the VS Code Git extension for a visual interface alongside terminal Git commands. Both skills are important — know the command line first.' }
        ]},
        { id: 'l4', title: 'Git Configuration', duration: '7 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'Git needs your identity before you can make commits. Every commit is stamped with your name and email — this is how teams know who made what change. Configuration has three levels that cascade.' },
          { type: 'diagram', title: 'Configuration Levels', content: 'Configuration Levels (higher = more specific = wins):\n─────────────────────────────────────────────────────\nSystem  → /etc/gitconfig          applies to ALL users on the machine\nGlobal  → ~/.gitconfig            applies to YOUR user account\nLocal   → .git/config             applies to THIS repository only\n\nPrecedence: Local > Global > System' },
          { type: 'code', language: 'bash', code: '# ─── REQUIRED SETUP ─── (do this before your first commit)\n\n# Set your name (appears in all commits)\ngit config --global user.name "Jane Smith"\n\n# Set your email (use your GitHub email for proper attribution)\ngit config --global user.email "jane@example.com"\n\n# ─── RECOMMENDED SETUP ───\n\n# Set VS Code as default editor\ngit config --global core.editor "code --wait"\n\n# Set default branch name to \'main\' (modern standard)\ngit config --global init.defaultBranch main\n\n# Enable colorized output\ngit config --global color.ui auto\n\n# ─── VERIFY YOUR CONFIG ───\n\n# View all settings and where they come from\ngit config --list --show-origin\n\n# View a specific value\ngit config user.name\ngit config user.email' },
          { type: 'code', language: 'bash', code: '# View your global config file directly\ncat ~/.gitconfig\n\n# Example output:\n# [user]\n#     name = Jane Smith\n#     email = jane@example.com\n# [core]\n#     editor = code --wait\n#     defaultBranch = main' },
          { type: 'callout', variant: 'tip', body: 'Use --global on personal machines for most settings. Use --local (no flag needed, it\'s default inside a repo) when you need a different identity — for example, a work email for your company\'s repository vs. your personal email for open source.' },
          { type: 'callout', variant: 'warning', body: 'If you forget to set your name and email, Git will use system defaults that may look unprofessional in your commit history. Set these up before your very first commit.' }
        ]}
      ]},
      { id: 'sec3', title: 'Basic Git Commands', lessons: [
        { id: 'l5', title: 'Initializing a Repository', duration: '5 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'A Git repository is any directory that Git is tracking. You create one with git init. This creates a hidden .git folder that contains the entire history of your project — every commit, branch, and configuration.' },
          { type: 'code', language: 'bash', code: '# ─── Create a new project with Git ───\nmkdir my-project\ncd my-project\ngit init\n# Initialized empty Git repository in /home/jane/my-project/.git/\n\n# ─── Or add Git to an existing project ───\ncd existing-project\ngit init\n# Already have files? Git will find them — nothing is committed yet.\n\n# Verify Git is tracking this directory:\nls -la         # you\'ll see a .git folder\ngit status     # On branch main, No commits yet' },
          { type: 'diagram', title: 'Repository Structure', content: '┌─────────────────────────────────────────────────────┐\n│                    my-project/                       │\n│                                                      │\n│   index.html     style.css     app.js               │\n│   README.md      package.json                       │\n│                                                      │\n│   .git/                 ← Git lives here            │\n│   ├── HEAD              ← points to current branch  │\n│   ├── config            ← repo-specific settings    │\n│   ├── objects/          ← all your commits/blobs    │\n│   └── refs/             ← branch and tag pointers   │\n└─────────────────────────────────────────────────────┘' },
          { type: 'callout', variant: 'warning', body: 'Never manually edit or delete files inside .git/. You will corrupt your repository. Let Git manage it entirely through commands.' },
          { type: 'callout', variant: 'tip', body: 'To stop tracking a project with Git, simply delete the .git folder: rm -rf .git. This is non-destructive to your actual files — just removes Git history.' }
        ]},
        { id: 'l6', title: 'Adding & Committing', duration: '8 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'Making a commit is a two-step process: staging (git add) then committing (git commit). This separation is intentional — it lets you craft precise commits even if you\'ve changed many files.' },
          { type: 'code', language: 'bash', code: '# ─── Stage files ───\n\n# Stage a single file\ngit add index.html\n\n# Stage multiple specific files\ngit add index.html style.css\n\n# Stage all changes in current directory\ngit add .\n\n# Stage parts of a file interactively (advanced)\ngit add -p\n\n# ─── Commit staged changes ───\n\n# Commit with inline message (most common)\ngit commit -m "feat: add homepage layout"\n\n# Open editor for longer commit message\ngit commit\n\n# Stage ALL tracked files and commit in one step\n# (won\'t add new/untracked files)\ngit commit -am "fix: correct typo in header"' },
          { type: 'callout', variant: 'note', body: 'Conventional Commits format: type: short description — feat: new feature, fix: bug fix, docs: documentation only, refactor: code change that isn\'t a fix or feature, test: adding tests, chore: build process, dependency updates.' },
          { type: 'diagram', title: 'Good vs Bad Commit Messages', content: 'Good commit messages:\n✅  feat: add user authentication with JWT\n✅  fix: resolve null pointer exception in cart\n✅  docs: update README with Docker setup steps\n✅  refactor: extract payment logic into PaymentService\n✅  test: add unit tests for user registration\n\nBad commit messages:\n❌  update\n❌  fix stuff\n❌  wip\n❌  ok now it works hopefully\n❌  aaaaaa' },
          { type: 'callout', variant: 'tip', body: 'Commit early and often. Small, focused commits are easier to review, debug, and revert than massive multi-feature commits. A good rule: if you can\'t describe a commit in one sentence, it\'s too big.' }
        ]},
        { id: 'l7', title: 'Viewing History', duration: '7 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'Git provides several commands to inspect the state and history of your repository. These are read-only — they can\'t break anything, so run them freely to understand what\'s happening.' },
          { type: 'code', language: 'bash', code: '# ─── View commit history ───\n\n# Full log with all details\ngit log\n\n# Compact one-line format (most useful)\ngit log --oneline\n# a3f5c12 feat: add login feature\n# b7e2a09 fix: resolve navbar overflow bug\n# c1d4f88 docs: add setup instructions\n# e2b9f11 feat: initial project setup\n\n# Visual branch graph (extremely useful)\ngit log --oneline --graph --all\n\n# Show commits by a specific author\ngit log --author="Jane"\n\n# Show commits from the last 7 days\ngit log --since="7 days ago"\n\n# ─── Check current state ───\ngit status\n\n# ─── Compare differences ───\ngit diff\ngit diff --staged\ngit show a3f5c12\ngit diff b7e2a09 a3f5c12' },
          { type: 'diagram', title: 'Understanding git status', content: 'On branch main\nChanges to be committed:            ← STAGED (will go in next commit)\n  (use "git restore --staged" to unstage)\n        modified:   index.html\n\nChanges not staged for commit:      ← MODIFIED but not staged\n  (use "git add" to stage)\n        modified:   style.css\n\nUntracked files:                    ← NEW files Git doesn\'t know about\n  (use "git add" to include in commit)\n        app.js' }
        ]},
        { id: 'l8', title: 'Undoing Changes', duration: '10 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'Git gives you multiple ways to undo changes, each for a different scenario. The key question: have you pushed these commits to a shared remote repository? If yes, you must avoid rewriting history.' },
          { type: 'code', language: 'bash', code: '# ─── SCENARIO 1: Discard changes in working directory ───\ngit restore index.html\n\n# ─── SCENARIO 2: Unstage a file ───\ngit restore --staged index.html\n\n# ─── SCENARIO 3: Undo last commit — keep changes staged ───\ngit reset --soft HEAD~1\n\n# ─── SCENARIO 4: Undo last commit — keep changes unstaged ───\ngit reset --mixed HEAD~1\n\n# ─── SCENARIO 5: Undo last commit — DISCARD ALL CHANGES ───\ngit reset --hard HEAD~1\n\n# ─── SCENARIO 6: Safely undo a commit on a shared branch ───\ngit revert HEAD\ngit revert a3f5c12' },
          { type: 'diagram', title: 'Undo Decision Tree', content: 'Have you already pushed the commit to a shared branch?\n│\n├─ NO ──► Is it safe to rewrite local history?\n│         ├─ Want to keep changes?  → git reset --soft HEAD~1\n│         ├─ Want changes unstaged? → git reset --mixed HEAD~1\n│         └─ Want to discard all?   → git reset --hard HEAD~1\n│\n└─ YES ─► Use git revert (creates a new undo commit, safe for teams)\n          git revert <commit-hash>' },
          { type: 'callout', variant: 'warning', body: 'git reset --hard is permanent. Your changes are gone. There is no undo (unless you have the commit hash and use git reflog within a short window). Use with extreme caution.' },
          { type: 'callout', variant: 'tip', body: 'git reflog is your safety net. It records every position HEAD has been in for the last 90 days. If you accidentally reset too far, git reflog can help you recover.' }
        ]}
      ]},
      { id: 'sec4', title: 'Branching & Merging', lessons: [
        { id: 'l9', title: 'Git Branching', duration: '8 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'A branch is a lightweight, movable pointer to a specific commit. main is just a branch — there\'s nothing special about it except convention. Creating a branch is nearly instant and costs almost no resources. This is one of Git\'s greatest strengths.' },
          { type: 'concept', body: 'Branching lets multiple developers work simultaneously without stepping on each other. Features, bug fixes, and experiments all get their own branch. Stable code stays on main.' },
          { type: 'code', language: 'bash', code: '# ─── Viewing branches ───\ngit branch              # list local branches\ngit branch -a           # list all branches including remote\ngit branch -v           # show last commit on each branch\n\n# ─── Creating branches ───\ngit branch feature/user-auth\n\n# ─── Switching branches ───\ngit switch feature/user-auth        # modern (Git 2.23+)\ngit checkout feature/user-auth      # older syntax\n\n# ─── Create AND switch in one command ───\ngit switch -c feature/user-auth     # modern\ngit checkout -b feature/user-auth   # older\n\n# ─── Deleting branches ───\ngit branch -d feature/user-auth     # safe: warns if unmerged\ngit branch -D feature/user-auth     # force: deletes regardless\n\n# ─── Rename a branch ───\ngit branch -m old-name new-name' },
          { type: 'diagram', title: 'Branching Visualization', content: 'Before branching:\nmain:  A ── B ── C\n                 ↑ HEAD\n\nAfter: git switch -c feature/login\nmain:  A ── B ── C\n                 ↑\nfeature/login:   ↑ (same starting point)\n\nAfter commits on feature/login:\nmain:  A ── B ── C\n                  \\\nfeature/login:     D ── E\n                        ↑ HEAD' },
          { type: 'callout', variant: 'tip', body: 'Branch naming conventions: feature/, fix/, hotfix/, release/, chore/. Example: feature/add-payment-gateway, fix/navbar-overflow, hotfix/critical-auth-bug.' }
        ]},
        { id: 'l10', title: 'Merging', duration: '8 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'Merging integrates changes from one branch into another. Always merge INTO the destination — switch to the branch you want to update, then merge the source.' },
          { type: 'code', language: 'bash', code: '# Merge feature/login into main\ngit switch main\ngit merge feature/login\n\n# Merge with a commit message even for fast-forward\ngit merge --no-ff feature/login -m "Merge feature/login into main"\n\n# Abort a merge in progress\ngit merge --abort' },
          { type: 'diagram', title: 'Merge Types', content: 'FAST-FORWARD MERGE (main hasn\'t moved since branch was created):\n\nBefore:                After:\nmain: A──B──C         main: A──B──C──D──E\n             \\                           ↑\nfeature:      D──E    Git just moves the pointer forward.\n\n3-WAY MERGE (both branches have new commits):\n\nBefore:               After:\nmain:    A──B──C──F   main:    A──B──C──F──[M]\n              \\                        \\      ↑ merge commit\nfeature:       D──E   feature:          D──E──┘' },
          { type: 'callout', variant: 'tip', body: 'Use --no-ff (no fast-forward) when you want to always create a merge commit, preserving the fact that a feature branch existed. Many teams enforce this for traceability.' }
        ]},
        { id: 'l11', title: 'Merge Conflicts', duration: '10 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'A merge conflict occurs when two branches have modified the same part of the same file differently. Git doesn\'t know which version to keep — it asks you to decide.' },
          { type: 'concept', body: 'Conflicts look scary but they follow a consistent pattern. Once you understand the markers, resolving them becomes routine.' },
          { type: 'diagram', title: 'Conflict Markers', content: '<<<<<<< HEAD                          ← your current branch starts here\n    console.log("Hello from main");\n=======                               ← divider between the two versions\n    console.log("Hello from feature");\n>>>>>>> feature/login                 ← incoming branch ends here\n\nYour job: delete the markers and keep the version you want (or combine them)' },
          { type: 'code', language: 'bash', code: '# When you run git merge and get a conflict:\ngit merge feature/login\n# CONFLICT (content): Merge conflict in app.js\n\n# Step 1: See which files have conflicts\ngit status\n\n# Step 2: Open each conflicted file and resolve\n# Step 3: After resolving, stage the file\ngit add app.js\n\n# Step 4: Complete the merge\ngit commit\n\n# If you want to back out entirely:\ngit merge --abort' },
          { type: 'callout', variant: 'tip', body: 'Prevention strategies: Pull from main frequently, keep branches short-lived, communicate with teammates before touching the same files, keep PRs small.' }
        ]},
        { id: 'l12', title: 'Git Stashing', duration: '6 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'Stashing temporarily shelves changes in your working directory so you can switch context — handle an urgent bug, review a colleague\'s branch, etc. — then return to your work exactly where you left off.' },
          { type: 'code', language: 'bash', code: '# ─── Basic stash ───\ngit stash                           # stash everything\ngit stash push -m "WIP: login form" # stash with description\n\n# ─── Include untracked files ───\ngit stash push -u -m "WIP: new feature files"\n\n# ─── Viewing stashes ───\ngit stash list\n# stash@{0}: On feature/login: WIP: login form\n# stash@{1}: On main: WIP: hotfix attempt\n\n# ─── Applying stashes ───\ngit stash pop               # apply most recent + remove from list\ngit stash apply             # apply most recent + KEEP in list\ngit stash apply stash@{2}   # apply specific stash\n\n# ─── Removing stashes ───\ngit stash drop stash@{0}    # remove a specific stash\ngit stash clear             # remove ALL stashes' },
          { type: 'callout', variant: 'tip', body: 'Real-world scenario: You\'re 2 hours into building a new feature when your manager says there\'s a critical bug in production. git stash, switch to main, fix the bug, switch back, git stash pop — you\'re right where you left off.' }
        ]}
      ]},
      { id: 'sec5', title: 'Advanced Git', lessons: [
        { id: 'l13', title: 'Rebase', duration: '10 min', difficulty: 'Advanced', content: [
          { type: 'concept', body: 'Rebase is an alternative to merge. Instead of creating a merge commit, rebase moves or "replays" your commits on top of another branch, creating a linear history.' },
          { type: 'diagram', title: 'Rebase Visualization', content: 'BEFORE REBASE:\nmain:          A──B──C──F\n                    \\\nfeature/login:       D──E\n\ngit switch feature/login\ngit rebase main\n\nAFTER REBASE:\nmain:          A──B──C──F\n                         \\\nfeature/login:            D\'──E\'   (new commits — same changes, new hashes)' },
          { type: 'code', language: 'bash', code: '# Rebase feature onto main\ngit switch feature/login\ngit rebase main\n\n# If conflicts during rebase:\n# 1. Resolve the conflict in the file\n# 2. git add <resolved-file>\n# 3. git rebase --continue\n# To abort: git rebase --abort\n\n# Interactive rebase — rewrite last 3 commits\ngit rebase -i HEAD~3\n# Opens editor with options:\n# pick a3f5c12 feat: add login page\n# pick b7e2a09 fix: typo\n# pick c1d4f88 fix: another typo\n#\n# Change \'pick\' to:\n# squash (s)  → combine with previous commit\n# reword (r)  → change commit message\n# edit (e)    → stop to amend the commit\n# drop (d)    → delete the commit' },
          { type: 'callout', variant: 'warning', body: 'The Golden Rule of Rebase: Never rebase commits that have been pushed to a shared branch. Rebasing rewrites commit hashes. If teammates based their work on those commits, rewriting them creates inconsistency and painful conflicts.' }
        ]},
        { id: 'l14', title: 'Cherry-pick', duration: '5 min', difficulty: 'Advanced', content: [
          { type: 'concept', body: 'Cherry-pick lets you apply the changes from a specific commit onto your current branch — without merging the entire source branch. It\'s surgical: grab exactly the commit you need.' },
          { type: 'code', language: 'bash', code: '# Apply a specific commit to current branch\ngit cherry-pick a3f5c12\n\n# Cherry-pick multiple commits\ngit cherry-pick a3f5c12 b7e2a09\n\n# Cherry-pick a range\ngit cherry-pick a3f5c12..b7e2a09\n\n# Apply changes without committing\ngit cherry-pick --no-commit a3f5c12' },
          { type: 'callout', variant: 'tip', body: 'Use case: A critical bug fix is buried in a feature branch that isn\'t ready to ship. Cherry-pick just that fix commit onto main to release it immediately, without merging the unfinished feature.' },
          { type: 'callout', variant: 'warning', body: 'Cherry-pick creates a duplicate commit with a new hash. The same logical change exists in two places. This can cause confusion and conflicts during later merges. Use sparingly.' }
        ]},
        { id: 'l15', title: 'Tags', duration: '6 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'Tags mark specific commits as significant — typically release points. Unlike branches, tags don\'t move. v1.0.0 always points to the exact same commit forever.' },
          { type: 'code', language: 'bash', code: '# ─── Lightweight tag (just a pointer, no metadata) ───\ngit tag v1.0.0\n\n# ─── Annotated tag (recommended for releases) ───\ngit tag -a v1.0.0 -m "First stable production release"\n\n# Tag a specific past commit\ngit tag -a v0.9.0 -m "Beta release" b7e2a09\n\n# ─── Viewing tags ───\ngit tag                  # list all tags\ngit tag -l "v1.*"        # list matching pattern\ngit show v1.0.0          # see tag details\n\n# ─── Pushing tags ───\ngit push origin v1.0.0          # push single tag\ngit push origin --tags          # push all tags\n\n# ─── Deleting tags ───\ngit tag -d v1.0.0               # delete local\ngit push origin --delete v1.0.0 # delete remote' },
          { type: 'concept', body: 'Semantic Versioning: Use MAJOR.MINOR.PATCH format. v2.1.3 means breaking change version 2, feature release 1, bug fix 3. Breaking changes increment MAJOR, new features increment MINOR, bug fixes increment PATCH.' }
        ]},
        { id: 'l16', title: 'Git Hooks', duration: '8 min', difficulty: 'Advanced', content: [
          { type: 'concept', body: 'Git hooks are scripts that run automatically at specific points in the Git workflow. They live in .git/hooks/ and can enforce standards, run tests, or prevent bad commits from ever being made.' },
          { type: 'diagram', title: 'Common Hooks', content: 'Common hooks:\n─────────────────────────────────────────────────\npre-commit     → runs before commit is created\n                 (lint code, run tests, check formatting)\ncommit-msg     → runs after commit message is written\n                 (enforce conventional commit format)\npre-push       → runs before push to remote\n                 (run full test suite)\npost-merge     → runs after a merge completes\n                 (install dependencies if package.json changed)' },
          { type: 'code', language: 'bash', code: '# Create a pre-commit hook\n# File: .git/hooks/pre-commit\n# Make it executable: chmod +x .git/hooks/pre-commit\n\n#!/bin/sh\necho "Running linter..."\nnpm run lint\nif [ $? -ne 0 ]; then\n  echo "❌ Linting failed. Fix errors before committing."\n  exit 1\nfi\necho "✅ Linting passed. Proceeding with commit."\nexit 0' },
          { type: 'code', language: 'bash', code: '# For teams: use Husky to share hooks via package.json\nnpm install --save-dev husky\nnpx husky install\nnpx husky add .husky/pre-commit "npm run lint"\n\n# Hooks in .husky/ are committed to the repo — all teammates get them' },
          { type: 'callout', variant: 'tip', body: '.git/hooks is not committed to the repository (it\'s inside .git). For team-wide hooks, use Husky (Node.js projects) or pre-commit (Python projects) — these store hook configs in files that ARE committed.' }
        ]}
      ]},
      { id: 'sec6', title: 'GitHub & Collaboration', lessons: [
        { id: 'l17', title: 'What is GitHub?', duration: '5 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'GitHub is a cloud-based platform for hosting Git repositories. It adds collaboration features on top of Git: pull requests, issue tracking, CI/CD (GitHub Actions), project boards, wikis, and more. Git is the engine. GitHub is the dashboard.' },
          { type: 'diagram', title: 'Git vs GitHub', content: 'Git (Local Tool)              GitHub (Cloud Platform)\n────────────────              ───────────────────────\n• Tracks history              • Hosts repositories\n• Branching/merging           • Pull requests & code review\n• Commits                     • Issues & project boards\n• Runs on your machine        • GitHub Actions (CI/CD)\n• No internet required        • Access control & permissions\n• Free & open source          • GitHub Pages (hosting)' },
          { type: 'concept', body: 'Alternatives: GitLab (self-hostable, built-in CI/CD), Bitbucket (popular with Jira users), Gitea (lightweight self-hosted). GitHub has the largest open-source community.' }
        ]},
        { id: 'l18', title: 'Connecting to GitHub', duration: '8 min', difficulty: 'Beginner', content: [
          { type: 'code', language: 'bash', code: '# ─── Connect existing local repo to GitHub ───\n\n# Step 1: Create a repo on GitHub (click "New repository")\n# Step 2: Add GitHub as remote\ngit remote add origin https://github.com/username/my-project.git\n\n# Verify remotes\ngit remote -v\n\n# Step 3: Push and set upstream tracking\ngit push -u origin main\n\n# ─── Clone an existing repo ───\ngit clone https://github.com/username/project.git\ngit clone https://github.com/username/project.git my-folder-name\n\n# ─── Sync with remote ───\ngit pull origin main          # fetch + merge\ngit fetch origin              # fetch only\ngit push origin main          # push your commits' },
          { type: 'code', language: 'bash', code: '# ─── SSH Setup (recommended for regular use) ───\n\n# Generate SSH key pair\nssh-keygen -t ed25519 -C "you@example.com"\n\n# Copy your PUBLIC key\ncat ~/.ssh/id_ed25519.pub\n\n# Add to GitHub: Settings → SSH and GPG keys → New SSH key → Paste\n\n# Test the connection\nssh -T git@github.com\n# Hi username! You\'ve successfully authenticated.\n\n# Use SSH URL instead of HTTPS:\ngit remote add origin git@github.com:username/project.git' },
          { type: 'callout', variant: 'tip', body: 'SSH is preferred for daily use — no password prompts. HTTPS is fine for one-time clones or public repos. For corporate environments, check if SSH is allowed through the firewall.' }
        ]},
        { id: 'l19', title: 'Pull Requests', duration: '8 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'A Pull Request (PR) is a formal request to merge your branch into another branch. It\'s the primary collaboration mechanism on GitHub — it triggers code review, automated checks, and discussion before any change touches main.' },
          { type: 'diagram', title: 'PR Workflow', content: 'PR Workflow:\n──────────────────────────────────────────────────────\n1. Create branch:    git switch -c feature/payment\n2. Make commits:     git commit -m "feat: add Stripe integration"\n3. Push branch:      git push origin feature/payment\n4. Open PR on GitHub: base: main ← compare: feature/payment\n5. Request reviewers, write description, link issues\n6. Automated checks run (CI, linting, tests)\n7. Reviewers leave comments, request changes\n8. Address feedback, push new commits to same branch\n9. Approval received → Merge PR\n10. Delete branch (cleanup)' },
          { type: 'concept', body: 'Merge Strategies: Merge commit — preserves full history. Squash and merge — combines all PR commits into one. Clean history on main. Rebase and merge — replays commits linearly. No merge commit.' },
          { type: 'callout', variant: 'tip', body: 'PR best practices: Keep PRs small (< 400 lines changed), write a clear description explaining WHY (not just what), link related issues (Fixes #123), request specific reviewers who know the code.' }
        ]},
        { id: 'l20', title: 'Branch Protection Rules', duration: '5 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'Branch protection rules prevent direct pushes to important branches (like main) and enforce quality gates before code can be merged.' },
          { type: 'diagram', title: 'Protection Rules', content: 'GitHub Branch Protection Rules for \'main\':\n──────────────────────────────────────────\n☑ Require a pull request before merging\n  ☑ Require 1 approving review\n  ☑ Dismiss stale approvals when new commits are pushed\n☑ Require status checks to pass before merging\n  ☑ CI / tests must pass\n  ☑ Linting must pass\n☑ Require branches to be up to date before merging\n☑ Do not allow bypassing the above settings\n☑ Restrict who can push to matching branches' },
          { type: 'callout', variant: 'tip', body: 'Even on solo projects, enable branch protection on main. It forces you to use PRs, which creates a record of your work and prevents accidental direct pushes that skip your CI pipeline.' }
        ]},
        { id: 'l21', title: 'Open Source Contribution Flow', duration: '10 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'Contributing to open source follows a specific workflow built around the concept of forking — creating your own copy of the repository, since you don\'t have write access to the original.' },
          { type: 'diagram', title: 'Fork & PR Flow', content: 'Open Source Contribution Flow:\n──────────────────────────────────────────────────────────\n[Original Repo]          [Your Fork on GitHub]    [Your Local Machine]\n   upstream    ────fork────►    origin        ────clone────►   local\n                                                                  │\n                                                             git switch -c fix/...\n                                                             (make changes, commit)\n                                                                  │\n                                                             git push origin fix/...\n                                                                  │\n[Original Repo] ◄───── Pull Request ─────── [Your Fork on GitHub]' },
          { type: 'code', language: 'bash', code: '# ─── Step 1: Fork on GitHub (click Fork button) ───\n\n# ─── Step 2: Clone YOUR fork ───\ngit clone https://github.com/YOUR-USERNAME/project.git\ncd project\n\n# ─── Step 3: Add the original repo as \'upstream\' ───\ngit remote add upstream https://github.com/ORIGINAL-OWNER/project.git\n\n# ─── Step 4: Create a branch for your change ───\ngit switch -c fix/typo-in-readme\n\n# ─── Step 5: Make changes, then commit ───\ngit add README.md\ngit commit -m "fix: correct typo in installation instructions"\n\n# ─── Step 6: Push to YOUR fork ───\ngit push origin fix/typo-in-readme\n\n# ─── Step 7: Open PR on GitHub ───\n# Go to github.com/YOUR-USERNAME/project\n# GitHub will show a banner: "Compare & pull request"\n\n# ─── Step 8: Keep your fork in sync with upstream ───\ngit fetch upstream\ngit switch main\ngit merge upstream/main\ngit push origin main' },
          { type: 'callout', variant: 'tip', body: 'Always sync your fork before starting new work. Stale forks lead to conflicts. Make it a habit: git fetch upstream && git merge upstream/main before every new branch.' },
          { type: 'callout', variant: 'tip', body: 'Read the project\'s CONTRIBUTING.md file before opening a PR. Most established projects have specific requirements: coding style, test requirements, commit message format, issue linking.' }
        ]}
      ]}
    ]
  },
  cicd: {
    id: 'cicd', title: 'CI/CD Pipelines', description: 'From first pipeline to automated deployments', icon: '⚙️',
    badges: [
      { label: 'Pipelines', variant: 'beginner' },
      { label: 'GitHub Actions', variant: 'intermediate' },
      { label: 'DevOps', variant: 'advanced' }
    ],
    sections: [
      { id: 'sec1_cicd_core', title: 'The Core Philosophy', lessons: [
        { id: 'l_cicd_intro', title: 'Introduction to CI/CD', duration: '10 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'CI/CD (Continuous Integration, Continuous Delivery, and Continuous Deployment) is the practice of automating the entire software release lifecycle. In the old days, software was released every few months; today, top companies like Amazon and Netflix deploy thousands of times a day using CI/CD.' },
          { type: 'analogy', body: 'Imagine an automated restaurant. Instead of a chef manually carrying each plate, checking the temperature, and walking it to the table, there\'s a conveyor belt. The belt automatically checks the food quality, spices it, and delivers it to the customer. This conveyor belt is your "Pipeline".' },
          { type: 'diagram', title: 'The Manual vs Automated Life', content: 'MANUAL WAY (Slow & Risky):\nWrite Code ➔ Email Zip ➔ Manual Tests ➔ SSH to Server ➔ Drag & Drop ➔ Hope it works 🙏\n\nCI/CD WAY (Fast & Secure):\nWrite Code ➔ Push to Git ➔ Automated Tests ➔ Automated Build ➔ Automated Deploy ➔ Profit! 🚀' },
          { type: 'concept', body: 'The goal of CI/CD is simple: make software releases boring. When everything is automated, a release is no longer a stressful event — it is just another minute in the developer\'s day.' },
          { type: 'callout', variant: 'tip', body: 'CI/CD bridges the "it works on my machine" gap by ensuring code is tested and built in a neutral environment before it ever touches production.' },
          { type: 'code', language: 'bash', code: '# In the manual world, you might do this (BAD!):\nscp -r ./dist user@1.2.3.4:/var/www/html\n\n# In the CI/CD world, you just do this:\ngit push origin main\n# ... and the automation handles the rest.' },
          { type: 'summary', points: ['CI/CD automates testing, building, and deployment', 'Replaces slow manual steps with rapid "Pipelines"', 'Enables high-frequency releases (multiple times a day)', 'Increases reliability by removing human error'] }
        ]},
        { id: 'l_cicd_ci', title: 'What is Continuous Integration', duration: '10 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'Continuous Integration (CI) is the practice of merging all developer code changes into a shared "main" branch multiple times a day. Each merge is automatically verified by a "build" and "test" sequence.' },
          { type: 'concept', body: 'Why multiple times a day? Because the longer you wait to merge, the harder it becomes. This is called "Integration Hell" where code conflicts are so complex they take days to fix.' },
          { type: 'diagram', title: 'The CI Feedback Loop', content: '1. Developer creates a branch\n2. Commits small changes\n3. Pushes to Git (GitHub/GitLab)\n4. CI Server detects push ➔ runs "npm install" + "npm test"\n5. Result: ✅ Success (Merge allowed) or ❌ Failure (Block merge)' },
          { type: 'callout', variant: 'note', body: 'CI is not about tools; it\'s a habit. If you push code once a week, you aren\'t doing Continuous Integration, even if you have a Jenkins server running.' },
          { type: 'concept', body: 'A typical CI process includes: Linting (checking code style), Unit Tests (checking logic), and Integration Tests (checking how parts work together).' },
          { type: 'code', language: 'bash', code: '# Standard CI commands in a Node.js project:\nnpm ci        # Clean Install (guarantees exact dependency versions)\nnpm run lint  # Ensure code follows style guidelines\nnpm test      # Run all automated tests' },
          { type: 'callout', variant: 'mistake', body: 'Common Mistake: Having a "red" (failing) build and ignoring it. The rule of CI is: The build is sacrosanct. If it breaks, stop everything and fix it immediately.' },
          { type: 'summary', points: ['Integrate code daily to avoid merge conflicts', 'Automate builds and tests to catch bugs early', 'The CI server provides immediate feedback to developers', 'Never merge failing code into the main branch'] }
        ]},
        { id: 'l_cicd_cd', title: 'What is Continuous Deployment', duration: '12 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'After CI confirms the code is healthy, CD (Continuous Delivery or Deployment) ensures it reaches the user. While they sound similar, there is a critical distinction between "Delivery" and "Deployment".' },
          { type: 'diagram', title: 'Delivery vs Deployment', content: 'CONTINUOUS DELIVERY:\nCode ➔ Test ➔ Build ➔ [ HUMAN APPROVAL ] ➔ Production\n(Safe for sensitive industries like Banking/Healthcare)\n\nCONTINUOUS DEPLOYMENT:\nCode ➔ Test ➔ Build ➔ Production (Fully Automated)\n(Standard for high-speed SaaS companies)' },
          { type: 'concept', body: 'Step-by-step: First, the application is packaged (e.g., into a Docker image or a ZIP file). Next, it is sent to a staging environment (a copy of the real site). Finally, it moves to the production environment where real users see it.' },
          { type: 'analogy', body: 'Think of Delivery like a delivery driver bringing a package to your door but waiting for you to sign before leaving it. Deployment is the driver dropping it in your mailbox — it\'s delivered the moment it arrives.' },
          { type: 'concept', body: 'Real-world example: At Netflix, when a developer fixes a UI bug in the "Sign Up" page, the code is automatically deployed to millions of users globally within minutes of their peer-review being approved.' },
          { type: 'callout', variant: 'warning', body: 'Continuous Deployment requires "Bulletproof Tests". If your tests are weak, you will automatically deploy bugs to 100% of your users.' },
          { type: 'summary', points: ['CD bridges the gap between healthy code and working software', 'Delivery requires manual approval; Deployment is fully automatic', 'CD reduces the risk of deployment by making them small and frequent', 'Requires high trust in the automated testing suite'] }
        ]},
        { id: 'l_cicd_pipeline', title: 'CI/CD Pipeline Explained', duration: '12 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'A CI/CD Pipeline is the "road" your code travels to reach the user. It is composed of discrete phases called "Stages". If any stage fails, the pipeline stops — ensuring broken code never moves forward.' },
          { type: 'diagram', title: 'Standard Pipeline Stages', content: '1. SOURCE: Detect code change (git push)\n2. BUILD: Compile code, install dependencies (npm install)\n3. TEST: Run Unit and Integration tests\n4. STAGING: Deploy to an internal test site\n5. PRODUCTION: Deploy to the live site' },
          { type: 'concept', body: 'Pipelines use "Artifacts". For example, the BUILD stage might create a "dist" folder. Instead of the STAGING stage rebuilding it, it uses the "Artifact" created earlier. This ensures the exact same code tested is the one deployed.' },
          { type: 'callout', variant: 'tip', body: '"Fail Fast": Put the fastest, cheapest tests (like Linting) at the very start of the pipeline. If they fail, you save time and server costs by not running the heavy, slow integration tests.' },
          { type: 'code', language: 'yaml', code: '# Logical representation of pipeline stages\nstages:\n  - build\n  - test\n  - deploy_staging\n  - deploy_prod' },
          { type: 'concept', body: 'Pipelines run in "Runners" — temporary, virtualized computers that live only for as long as your pipeline needs them. This ensures every build starts with a perfectly clean slate.' },
          { type: 'summary', points: ['Pipelines are divided into logical stages (Build, Test, Deploy)', 'Artifacts ensure consistency between stages', '"Fail Fast" philosophy saves time and resources', 'Runners provide clean, isolated environments for every run'] }
        ]},
        { id: 'l_cicd_importance', title: 'Why CI/CD is Important', duration: '8 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'Why go through all this trouble? Because CI/CD is the difference between a software company and a "software-enabled" company. It transforms development from a slow, artisan craft into a reliable, high-speed engineering process.' },
          { type: 'concept', body: 'Business Value: Companies with high-performing CI/CD pipelines have 208x more frequent deployments and 2604x faster lead time from commit to deploy than those without (State of DevOps Report).' },
          { type: 'concept', body: 'Real-world scenario: An e-commerce site has a critical bug where the "Buy" button is hidden on iPhones. Without CI/CD, a fix might take days to move through "approval boards". With CI/CD, the fix can be live in 10 minutes, saving thousands in lost sales.' },
          { type: 'callout', variant: 'tip', body: 'Deployment frequency is highly correlated with software quality. The more you deploy, the better you get at it, and the smaller your mistakes become.' },
          { type: 'summary', points: ['Reduces "Deployment Anxiety"', 'Eliminates human error from the release process', 'Forces better coding habits through automated testing', 'Is a prerequisite for modern Cloud/Microservices architectures'] }
        ]}
      ]},
      { id: 'sec2_cicd_tools', title: 'Tools & Actionable Workflows', lessons: [
        { id: 'l_cicd_tools', title: 'Tools Overview', duration: '10 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'The CI/CD market is huge. While every tool accomplishes the same goal — automating your code flow — they differ in how they are hosted, their cost, and their complexity.' },
          { type: 'diagram', title: 'The "Big Four" of CI/CD', content: '1. GITHUB ACTIONS: Best for GitHub users. Easy, cloud-hosted, YAML-based.\n2. JENKINS: The "Grandfather". Open-source, self-hosted, extremely powerful but complex.\n3. GITLAB CI/CD: Built-in to GitLab. Excellent for enterprise teams.\n4. CIRCLECI: Fast, cloud-native, great for startups.' },
          { type: 'concept', body: 'When choosing a tool, consider: Where is your code? (If GitHub ➔ use GitHub Actions). Who will maintain it? (Jenkins requires a dedicated server admin). What is your budget? (Most have free tiers for public repos).' },
          { type: 'callout', variant: 'tip', body: 'In 2024, GitHub Actions has become the industry standard for new projects because it requires zero server setup. You just commit a file, and it works.' },
          { type: 'summary', points: ['GitHub Actions is the modern leader for ease-of-use', 'Jenkins is best for highly custom, on-premise needs', 'GitLab CI is the best all-in-one platform', 'Most modern tools use YAML for configuration'] }
        ]},
        { id: 'l_cicd_gca', title: 'GitHub Actions Basics', duration: '12 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'GitHub Actions is an event-driven automation platform. This means it waits for something to happen (an event) and then runs a sequence of commands (a workflow).' },
          { type: 'diagram', title: 'The GitHub Actions Hierarchy', content: 'WORKFLOW: The entire process (e.g., "Build and Deploy")\n  └── EVENT: What triggers it (e.g., "push", "pull_request")\n      └── JOBS: Groups of tasks (e.g., "test", "build")\n          └── STEPS: Individual commands (e.g., "npm test")' },
          { type: 'concept', body: 'Workflows are defined in YAML files inside the `.github/workflows/` directory of your repository. GitHub automatically detects these files and runs them.' },
          { type: 'code', language: 'yaml', code: '# The skeleton of a GitHub Action\nname: My First Workflow\non: [push]\njobs:\n  check-version:\n    runs-on: ubuntu-latest\n    steps:\n      - run: node -v' },
          { type: 'callout', variant: 'note', body: '`runs-on: ubuntu-latest` tells GitHub to spin up a fresh Linux virtual machine for your job. You can also use `windows-latest` or `macos-latest` if needed.' },
          { type: 'summary', points: ['Workflows live in .github/workflows/*.yml', 'Events (on:) trigger the automation', 'Jobs run on Runners (virtual machines)', 'YAML is space-sensitive — use 2 spaces for indentation!'] }
        ]},
        { id: 'l_cicd_first_workflow', title: 'Writing Your First Workflow', duration: '15 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'Let\'s build a real-world workflow for a Node.js app. This workflow will run every time code is pushed to the "main" branch, ensuring the code actually works.' },
          { type: 'code', language: 'yaml', code: 'name: NodeJS CI\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout Code\n        uses: actions/checkout@v4\n\n      - name: Setup Node\n        uses: actions/setup-node@v4\n        with:\n          node-version: "20"\n\n      - name: Install & Test\n        run: |\n          npm ci\n          npm test' },
          { type: 'concept', body: 'Breakdown of the steps:\n1. `actions/checkout`: This "Action" (a plugin) copies your code from GitHub onto the runner.\n2. `actions/setup-node`: This installs the specific version of Node.js you need.\n3. `run: npm ci`: This installs your project dependencies securely.' },
          { type: 'callout', variant: 'tip', body: 'Use `actions/checkout@v4` instead of typing `git clone`. GitHub provides a vast marketplace of these pre-made actions to save you time.' },
          { type: 'concept', body: 'Once you commit this file to your repo, go to the "Actions" tab on GitHub. You will see a yellow spinning circle — that\'s your pipeline running in the cloud!' },
          { type: 'summary', points: ['The "on" block defines the trigger branch', 'The "uses" keyword pulls in pre-made community actions', 'The "run" keyword executes standard terminal commands', 'Check the "Actions" tab on GitHub to see live logs'] }
        ]},
        { id: 'l_cicd_stages', title: 'Build, Test, Deploy Stages', duration: '12 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'In a professional pipeline, we don\'t just run everything in one big list. We separate concerns into multiple "Jobs" for better organization and speed.' },
          { type: 'diagram', title: 'Multi-Job Workflow', content: '[ Job: Test ] ➔ [ Job: Build ] ➔ [ Job: Deploy ]\n\nIf Test fails, Build never starts.\nIf Build fails, Deploy never starts.' },
          { type: 'concept', body: 'By default, GitHub Jobs run in **parallel** (at the same time). To make them run sequentially, we use the `needs` keyword. This tells Job B to wait for Job A to finish successfully.' },
          { type: 'code', language: 'yaml', code: 'jobs:\n  test:\n    runs-on: ubuntu-latest\n    steps: [...] \n\n  build:\n    needs: test # Wait for tests to pass!\n    runs-on: ubuntu-latest\n    steps: [...]' },
          { type: 'callout', variant: 'mistake', body: 'Forgetting `needs` is a common mistake. Without it, your "Deploy" job might start before your "Test" job finishes, potentially deploying broken code.' },
          { type: 'concept', body: 'Separating jobs also allows for "Conditional Execution". For example: "Only run the Deploy job IF the branch is main".' },
          { type: 'summary', points: ['Separate tasks into Jobs for better log organization', 'Use "needs" to create a sequence of stages', 'Jobs run on separate, clean runners by default', 'Conditionals (if:) can control when specific jobs run'] }
        ]}
      ]},
      { id: 'sec3_cicd_sec', title: 'Professional Configuration & Security', lessons: [
        { id: 'l_cicd_env', title: 'Environment Variables & Secrets', duration: '12 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'Your code often needs sensitive data (API keys, Database passwords) to run. However, you must NEVER commit these directly into your code or your YAML files. If you do, anyone with access to your repo can steal them.' },
          { type: 'diagram', title: 'The flow of a Secret', content: '1. You save a secret in GitHub Settings ➔ Secrets ➔ Actions\n2. GitHub encrypts it securely\n3. During a run, GitHub injects it into the Runner\n4. Your code reads it as an Environment Variable' },
          { type: 'code', language: 'yaml', code: '# How to use a secret in a workflow\nsteps:\n  - name: Deploy to Vercel\n    env:\n      VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}\n    run: vercel --token $VERCEL_TOKEN' },
          { type: 'callout', variant: 'warning', body: 'Even if a secret is printed to the logs, GitHub Actions will try to mask it with `***`. But it\'s still best practice to never intentionally log sensitive data.' },
          { type: 'concept', body: 'Secrets are "Write-Only" in GitHub. Once you save them, you can never see them again — you can only update or delete them. This protects you even if your GitHub account is semi-compromised.' },
          { type: 'summary', points: ['Never commit sensitive data to Git', 'Use GitHub Secrets for API keys and passwords', 'Inject secrets using the ${{ secrets.NAME }} syntax', 'Secrets are masked in logs for added protection'] }
        ]},
        { id: 'l_cicd_security', title: 'CI/CD Security Best Practices', duration: '10 min', difficulty: 'Advanced', content: [
          { type: 'concept', body: 'In a "Supply Chain Attack", hackers target your CI/CD pipeline to inject malicious code into your production app. Securing your pipeline is just as important as securing your app.' },
          { type: 'summary', points: ['LEAST PRIVILEGE: Give your pipeline only the permissions it needs (e.g., if it only needs to read code, don\'t give it write access).', 'ACTION PINNING: Use exact version hashes (e.g., @a1b2c3d) instead of tags (@v4). Tags can be moved by hackers; hashes cannot.', 'BRANCH PROTECTION: Require status checks (your CI tests) to pass before code can be merged into main.'] },
          { type: 'callout', variant: 'tip', body: 'Use tools like "Dependabot" or "Snyk" in your CI to automatically scan your dependencies for known vulnerabilities before you build your app.' },
          { type: 'code', language: 'yaml', code: '# Example of pinning an action to a specific hash for max security\n- uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4.1.1' },
          { type: 'concept', body: 'Always assume your runner could be compromised. Don\'t let one job access secrets meant for another job (use Environment Secrets in GitHub for this).' },
          { type: 'summary', points: ['Pin actions to specific Git hashes', 'Enforce branch protection on your main branch', 'Scan for vulnerabilities during the CI phase', 'Limit the scope of secret access'] }
        ]},
        { id: 'l_cicd_debug', title: 'Debugging CI/CD Pipelines', duration: '12 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'Pipelines fail. It\'s part of the process. Debugging a pipeline is different from debugging locally because you can\'t easily "touch" the remote server.' },
          { type: 'diagram', title: 'The Debugging Workflow', content: 'Step 1: Check GitHub Actions logs (look for the Red X)\nStep 2: Read the error message at the bottom of the log\nStep 3: Try to reproduce the error LOCALLY\nStep 4: Use "Debug Logging" (set ACTIONS_STEP_DEBUG to true)' },
          { type: 'callout', variant: 'tip', body: 'Pro Tip: Use the "action-tmate" action to pause your pipeline and get an SSH terminal into the GitHub Runner. You can then poke around the file system to see exactly why it\'s failing!' },
          { type: 'code', language: 'bash', code: '# If it works locally but fails in CI, it\'s usually:\n1. Missing Environment Variable\n2. Different Node/OS version\n3. Cache corruption (try clearing it)\n4. Network restrictions' },
          { type: 'concept', body: 'Always check if you forgot to include a file in `.gitignore` that your app needs, or if your local dev environment has a database that the CI server doesn\'t have access to.' },
          { type: 'summary', points: ['Read the logs carefully from bottom to top', 'Match your local environment to the CI environment', 'Use SSH debugging actions for complex issues', 'Enable debug logging for more verbose output'] }
        ]}
      ]},
      { id: 'sec4_cicd_adv', title: 'Advanced Scenarios & Optimization', lessons: [
        { id: 'l_cicd_docker', title: 'CI/CD with Docker', duration: '15 min', difficulty: 'Advanced', content: [
          { type: 'concept', body: 'Docker and CI/CD are a match made in heaven. Instead of deploying raw code, your CI pipeline builds a "Docker Image" which contains the OS, the runtime, and your app all in one package.' },
          { type: 'diagram', title: 'The Docker CI Flow', content: '1. CI builds image: "docker build -t myapp:latest ."\n2. CI tests the image: "docker run myapp npm test"\n3. CI pushes to Registry: "docker push myuser/myapp:v1.0"\n4. Production pulls image: "docker pull myuser/myapp:v1.0"' },
          { type: 'code', language: 'yaml', code: '# GitHub Action to build and push to Docker Hub\n- name: Build and Push\n  uses: docker/build-push-action@v5\n  with:\n    push: true\n    tags: user/app:latest' },
          { type: 'callout', variant: 'note', body: 'This eliminates "It works on my machine" entirely. If the Docker container works in CI, it WILL work in Production because they are the exact same files and OS.' },
          { type: 'summary', points: ['Use Docker to package your entire runtime environment', 'Push images to a Registry (Docker Hub, AWS ECR)', 'Production servers pull and run standardized containers', 'Guarantees environment parity between Dev and Prod'] }
        ]},
        { id: 'l_cicd_realworld', title: 'Real-world CI/CD Example', duration: '15 min', difficulty: 'Advanced', content: [
          { type: 'concept', body: 'What does a professional "Enterprise" pipeline look like? It often involves multiple environments, security gates, and automated notifications.' },
          { type: 'diagram', title: 'An Enterprise Pipeline', content: 'DEV PUSH ➔ LINT ➔ TEST ➔ BUILD ➔\n  DEPLOY TO STAGING ➔ E2E TESTS ➔\n    MANUAL SIGN-OFF ➔ DEPLOY TO PROD ➔\n      SLACK NOTIFICATION 🔔' },
          { type: 'concept', body: 'In the real world, you might use "Deployment Strategies" like Blue/Green (running two identical versions and swapping traffic) or Canary (deploying to 5% of users first to check for errors).' },
          { type: 'callout', variant: 'tip', body: 'Real-world pipelines also handle "Rollbacks". If the new version crashes, the pipeline should be able to automatically revert to the previous working version in seconds.' },
          { type: 'summary', points: ['Multi-environment flows (Dev ➔ Staging ➔ Prod)', 'Advanced deployment patterns (Canary, Blue/Green)', 'Automated rollback mechanisms for stability', 'Integration with communication tools like Slack/Discord'] }
        ]},
        { id: 'l_cicd_optimize', title: 'Best Practices & Optimization', duration: '12 min', difficulty: 'Advanced', content: [
          { type: 'concept', body: 'If your pipeline takes 30 minutes to run, developers will hate it. A fast pipeline (under 5 minutes) is essential for high productivity.' },
          { type: 'summary', points: ['CACHING: Store your node_modules between runs so you don\'t have to re-download them every time.', 'PARALLELISM: Run your Unit tests and Linting at the same time on different runners.', 'MATRIX BUILDS: Run your tests on Node 18, 20, and 22 simultaneously.'] },
          { type: 'code', language: 'yaml', code: '# Example of caching node_modules in GitHub Actions\n- name: Cache dependencies\n  uses: actions/cache@v4\n  with:\n    path: ~/.npm\n    key: ${{ runner.os }}-node-${{ hashFiles(\'**/package-lock.json\') }}' },
          { type: 'callout', variant: 'tip', body: 'A well-optimized pipeline uses "Partial Builds" — only rebuilding the parts of the app that actually changed.' },
          { type: 'summary', points: ['Shave minutes off your build with effective caching', 'Use Matrix strategies to test multiple versions at once', 'Keep your pipeline "Lean" — only run what is necessary', 'A fast feedback loop is the heart of DevOps'] }
        ]}
      ]}
    ]
  },
  docker: {
    id: 'docker', title: 'Docker & Containers', description: 'Build, ship, and run anywhere', icon: '🐳',
    badges: [
      { label: 'Docker', variant: 'beginner' },
      { label: 'Containers', variant: 'intermediate' },
      { label: 'Environments', variant: 'intermediate' }
    ],
    sections: [
      { id: 'sec1_docker', title: 'Introduction to Containers', lessons: [
        { id: 'l_docker1', title: 'What are Containers?', duration: '8 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.' },
          { type: 'analogy', body: 'Think of shipping containers. Before they existed, merchants had to manually load sacks of rice, barrels of oil, and boxes of clothing into the hold of a ship. If they didn\'t fit perfectly, it was chaos. The shipping container standardized everything — as long as it\'s in the box, it fits on any ship, any crane, and any truck globally. Software containers do the exact same thing for your code.' },
          { type: 'concept', body: 'Containers provide **Process Isolation**. This means your "App A" can run in its own little box, completely unaware that "App B" is running on the same computer. They don\'t conflict, and they don\'t share internal files.' },
          { type: 'diagram', title: 'Container Isolation', content: '┌─────────────────────────────────────────────────────┐\n│               Operating System (Host)               │\n│  ┌──────────┐      ┌──────────┐      ┌──────────┐  │\n│  │ Container│      │ Container│      │ Container│  │\n│  │ (App A)  │      │ (App B)  │      │ (App C)  │  │\n│  └──────────┘      └──────────┘      └──────────┘  │\n└─────────────────────────────────────────────────────┘' },
          { type: 'callout', variant: 'tip', body: 'Docker is the engine that manages these boxes. It allows you to build, run, and share containers easily without worrying about the underlying hardware.' },
          { type: 'summary', points: ['Containers package code + dependencies into a single unit', 'They provide isolation using OS-level virtualization', 'Solves the "it works on my machine" problem', 'Highly portable — run exactly the same everywhere'] }
        ]},
        { id: 'l_docker2', title: 'Docker vs Virtual Machines', duration: '10 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'Beginners often confuse Containers with Virtual Machines (VMs). While they both provide isolation, they do it at completely different levels.' },
          { type: 'concept', body: 'A Virtual Machine (VM) includes the application, the necessary binaries and libraries, and an **entire Guest Operating System**. This makes them heavy (gigabytes) and slow to start (minutes).' },
          { type: 'concept', body: 'A Docker Container includes only the application and its dependencies. It **shares the kernel** of the host operating system with other containers. This makes them extremely lightweight (megabytes) and fast to start (milliseconds).' },
          { type: 'diagram', title: 'VM vs Container Architecture', content: 'VIRTUAL MACHINE:                  DOCKER CONTAINER:\n[ APP 1 ] [ APP 2 ]              [ APP 1 ] [ APP 2 ]\n[ LIBS  ] [ LIBS  ]              [ LIBS  ] [ LIBS  ]\n[ GUEST OS ] [ GUEST OS ]        [   DOCKER ENGINE  ]\n[   HYPERVISOR    ]              [   HOST OS KERNEL  ]\n[     HARDWARE    ]              [     HARDWARE      ]' },
          { type: 'callout', variant: 'note', body: 'Because containers share the host kernel, they use significantly fewer resources. You can run hundreds of containers on a server that might only support three or four VMs.' },
          { type: 'summary', points: ['VMs virtualize hardware; Containers virtualize the OS', 'VMs have full Guest OS; Containers share the host kernel', 'Containers are much smaller and faster than VMs', 'Choose VMs for total isolation; Containers for high-speed delivery'] }
        ]}
      ]},
      { id: 'sec2_docker', title: 'Building with Docker', lessons: [
        { id: 'l_docker3', title: 'Why Docker is Used & Use Cases', duration: '8 min', difficulty: 'Beginner', content: [
          { type: 'concept', body: 'Why did Docker become the industry standard almost overnight? Because it solves the biggest pain points in the software development lifecycle.' },
          { type: 'summary', points: ['ENVIRONMENT PARITY: No more "it worked on my machine but failed in production." The container you test is the exact container you deploy.', 'ISOLATION: Run Node.js 14 and Node.js 20 on the same machine without them ever seeing each other.', 'MICROSERVICES: Docker is the foundation of microservices architecture where apps are broken into tiny, independent pieces.'] },
          { type: 'concept', body: 'Real-world example: A fintech company needs to run a legacy Java 8 app next to a modern Python 3.12 app. Without Docker, this would be a nightmare of conflicting environment variables and Java versions. With Docker, each app lives in its own isolated container.' },
          { type: 'callout', variant: 'tip', body: 'Onboarding is a breeze with Docker. Instead of new developers spending three days installing databases and languages, they just run "docker compose up" and have the full environment in five minutes.' },
          { type: 'summary', points: ['Standardizes the environment across teams', 'Makes microservices manageable', 'Speeds up developer onboarding', 'Integrates perfectly with CI/CD for automated testing'] }
        ]},
        { id: 'l_docker4', title: 'Basic Docker Commands & Dockerfile', duration: '15 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'To use Docker, you need to understand two key things: **Images** and **Containers**. An Image is a read-only blueprint (the recipe). A Container is a running instance of that image (the cake).' },
          { type: 'concept', body: 'You define an image using a **Dockerfile** — a simple text file with instructions on how to build your environment.' },
          { type: 'code', language: 'dockerfile', code: '# ─── Example Dockerfile for Node.js ───\nFROM node:20-alpine          # Base image\nWORKDIR /app                 # Working directory\nCOPY package*.json ./        # Copy dependencies\nRUN npm install              # Install dependencies\nCOPY . .                     # Copy app source code\nEXPOSE 3000                  # Open port 3000\nCMD ["node", "app.js"]       # Command to run the app' },
          { type: 'code', language: 'bash', code: '# ─── Essential CLI Commands ───\n\n# Build an image from a Dockerfile\ndocker build -t my-app:v1 .\n\n# Run a container from an image\n# -d: detached (background), -p: port mapping (host:container)\ndocker run -d -p 8080:3000 --name my-running-app my-app:v1\n\n# List running containers\ndocker ps\n\n# List all images\ndocker images\n\n# Stop a container\ndocker stop my-running-app' },
          { type: 'callout', variant: 'tip', body: 'The port mapping flag `-p 8080:3000` is vital. It tells Docker: "When I visit localhost:8080 on my computer, send that traffic to port 3000 inside the container."' },
          { type: 'summary', points: ['An Image is a blueprint; a Container is a running instance', 'Dockerfile contains the instructions to build an image', 'Use "docker build" to create images', 'Use "docker run" to start containers from images'] }
        ]}
      ]},
      { id: 'sec3_docker', title: 'Docker in DevOps', lessons: [
        { id: 'l_docker5', title: 'How Docker fits into CI/CD', duration: '10 min', difficulty: 'Intermediate', content: [
          { type: 'concept', body: 'In modern CI/CD, Docker is the ultimate delivery vehicle. Instead of moving raw code, we move standardized images. This ensures the exact same bits tested in CI are the ones running in Production.' },
          { type: 'diagram', title: 'Docker Build-Push-Pull Workflow', content: '1. DEV: Pushes code to GitHub\n2. CI: Runs "docker build" and "docker test"\n3. REGISTRY: CI pushes image to Docker Hub or AWS ECR\n4. PROD: Server runs "docker pull" and restarts the container' },
          { type: 'concept', body: 'This "Immutable Infrastructure" means we never fix things on the server. If there\'s a bug, we fix the code, build a new image, and replace the old container. This makes deployments predictable and rollback-friendly.' },
          { type: 'callout', variant: 'note', body: 'Because the Docker image is self-contained, the production server doesn\'t even need Node.js or Python installed — it only needs Docker.' },
          { type: 'summary', points: ['Images are pushed to a Registry (like Docker Hub) for storage', 'CI/CD pipelines automate the building and pushing of images', 'Production servers pull the latest image and run it as a container', 'Guarantees 100% environment parity between testing and live'] }
        ]}
      ]}
    ]
  },
  kubernetes: {
    id: 'kubernetes', title: 'Kubernetes', description: 'Orchestrate containers at scale', icon: '☸️',
    badges: [
      { label: 'K8s', variant: 'intermediate' },
      { label: 'Orchestration', variant: 'intermediate' },
      { label: 'Scaling', variant: 'advanced' }
    ],
    sections: [
      {
        id: 'sec1_k8s', title: 'Kubernetes Foundations', lessons: [
          {
            id: 'l_k8s_intro', title: 'Introduction to Kubernetes', duration: '10 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'Kubernetes (K8s) is an open-source system for automating deployment, scaling, and management of containerized applications. It was originally designed by Google and is now maintained by the Cloud Native Computing Foundation (CNCF).' },
              { type: 'analogy', body: 'If Docker is the "Shipping Container", then Kubernetes is the "Giant Container Port". A port needs cranes, trucks, schedules, and systems to manage thousands of containers arriving and leaving. Kubernetes is the brain that manages all those containers, making sure they land in the right spot, get electricity, and are replaced if they break.' },
              { type: 'diagram', title: 'From Individual Containers to Orchestration', content: 'SINGLE DOCKER HOST: [ App A ] [ App B ]  ➔ Manual control\n\nKUBERNETES CLUSTER:\n[ Master Plane ] ➔ Controls scheduling\n  └── [ Node 1 ] [ Node 2 ] [ Node 3 ]\n      └── [ Pods ] [ Pods ] [ Pods ] ➔ Automated scaling' },
              { type: 'callout', variant: 'note', body: 'The name Kubernetes comes from Greek, meaning "helmsman" or "pilot". The "K8s" abbreviation refers to the 8 letters between the "K" and the "s".' },
              { type: 'summary', points: ['K8s is the brain that manages hundreds/thousands of containers', 'Handles self-healing (restarts failed containers)', 'Provides service discovery and load balancing', 'Open-source and used by virtually every tech giant'] }
            ]
          },
          {
            id: 'l_k8s_why', title: 'Why Kubernetes is Needed', duration: '8 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'In the early days of microservices, we could manage 5 or 10 Docker containers manually. But what happens when you have 500? Or when a server goes down at 3 AM? Manual management becomes impossible.' },
              { type: 'summary', points: ['HIGH AVAILABILITY: K8s ensures your app stays up even if physical servers fail.', 'SCALABILITY: If traffic spikes, K8s automatically spins up more instances of your app.', 'ZERO DOWNTIME: Update your app while it\'s running — K8s rolls out the new version one container at a time.'] },
              { type: 'callout', variant: 'tip', body: 'Without Kubernetes, if a container crashes, it stays crashed. With Kubernetes, it notices the crash and automatically restarts a new one within seconds.' },
              { type: 'diagram', title: 'The Self-Healing Lifecycle', content: '1. App crashes ➔ 2. K8s checks "Desired State" ➔ 3. K8s sees 0 running (wants 3) ➔ 4. K8s starts a fresh container immediately ➔ 5. Service restored! ✅' },
              { type: 'open_question', question: 'Based on what you\'ve learned, why is "Self-Healing" such a game-changer for DevOps teams who previously had to fix server crashes manually at 3 AM?', placeholder: 'Describe the impact on team morale and system reliability...' }
            ]
          }
        ]
      },
      {
        id: 'sec2_k8s', title: 'Kubernetes Architecture', lessons: [
          {
            id: 'l_k8s_arch', title: 'Kubernetes Architecture Basics', duration: '12 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'A Kubernetes cluster consists of two types of resources: The **Control Plane** (the brain) and **Nodes** (the workers).' },
              { type: 'diagram', title: 'The Cluster Brain & Body', content: 'CONTROL PLANE (Master):\n- API Server (Gateway)\n- etcd (Database of cluster state)\n- Scheduler (Decides where pods work)\n- Controller Manager (Maintains desired state)\n\nWORKER NODES:\n- Kubelet (Agent running on node)\n- Kube Proxy (Networking)\n- Container Runtime (e.g., Docker or containerd)' },
              { type: 'callout', variant: 'note', body: 'The etcd database is the single source of truth. If it dies, the cluster loses its memory. That\'s why it\'s always backed up and run in high-availability mode.' },
              { type: 'summary', points: ['Control Plane manages the cluster state', 'Worker Nodes run the actual application containers', 'Kubelet is the "manager" on each node that talks to the brain', 'Communication happens via the API Server'] }
            ]
          },
          {
            id: 'l_k8s_pods', title: 'Core Objects: Pods', duration: '8 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'A Pod is the smallest deployable unit in Kubernetes. It is a wrapper around one or more containers. You never run a container directly in K8s — you run a Pod.' },
              { type: 'analogy', body: 'Think of a Pod as a "Pea Pod". The peas inside are the containers. Usually, there\'s only one pea (container) in a pod, but sometimes you have a "Sidecar" container (like a helper logger) in the same pod.' },
              { type: 'code', language: 'yaml', code: '# ─── A Simple Pod Definition ───\napiVersion: v1\nkind: Pod\nmetadata:\n  name: my-webapp\nspec:\n  containers:\n  - name: frontend\n    image: nginx:latest' },
              { type: 'callout', variant: 'tip', body: 'Containers in the same pod share the same network IP and storage volumes. They can talk to each other using "localhost".' },
              { type: 'summary', points: ['Pod = Wrapper for one or more containers', 'Smallest unit K8s can manage', 'Pods are ephemeral (they die and get replaced)', 'Usually 1 container per pod, plus optional helpers'] }
            ]
          },
          {
            id: 'l_k8s_svc', title: 'Core Objects: Services', duration: '10 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'Because Pods are "ephemeral" (they get deleted and re-created with new IP addresses), you can\'t rely on a Pod\'s IP. A **Service** provides a stable, permanent IP address and DNS name for a group of Pods.' },
              { type: 'diagram', title: 'Service Load Balancing', content: '[ User ] ➔ [ Service: Stable IP ]\n             │\n             ├──➔ [ Pod A: 10.0.1.5 ]\n             └──➔ [ Pod B: 10.0.1.9 ]\n             (Service routes traffic to healthy pods only)' },
              { type: 'summary', points: ['ClusterIP: Internal-only access (default)', 'NodePort: Opens a port on every node for external access', 'LoadBalancer: Automatically creates a cloud load balancer (AWS/GCP/Azure)', 'Services provide name resolution (e.g., "db-service" talks to your database)'] }
            ]
          },
          {
            id: 'l_k8s_deploy', title: 'Core Objects: Deployments', duration: '12 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'A Deployment is a high-level object that manages Pods. You tell the Deployment: "I want 3 copies of this app running," and it makes it happen. If a Pod vanishes, the Deployment replaces it.' },
              { type: 'code', language: 'yaml', code: '# ─── A Deployment with 3 Replicas ───\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web-deploy\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.21' },
              { type: 'callout', variant: 'note', body: 'Deployments handle "Rolling Updates". When you change the version, it starts a new pod before killing an old one, ensuring zero downtime for your users.' },
              { type: 'summary', points: ['Manages desired state (e.g., "Run 5 pods")', 'Handles automated Rollouts and Rollbacks', 'The most common way to deploy apps in Kubernetes', 'Built on top of "ReplicaSets"'] }
            ]
          }
        ]
      },
      {
        id: 'sec3_k8s', title: 'Kubernetes in Action', lessons: [
          {
            id: 'l_k8s_kubectl', title: 'kubectl Basics', duration: '15 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: '`kubectl` is the command-line interface for communicating with your Kubernetes cluster. It converts your commands into API calls that the Master Node understands.' },
              { type: 'code', language: 'bash', code: '# ─── Essential Commands ───\n\n# See what\'s running\nkubectl get pods\nkubectl get services\nkubectl get nodes\n\n# Detail view of an object\nkubectl describe pod my-pod-name\n\n# Create/Update from a file (Most common!)\nkubectl apply -f deployment.yaml\n\n# View logs\nkubectl logs my-pod-name\n\n# Execute a command inside a pod\nkubectl exec -it my-pod-name -- /bin/bash' },
              { type: 'callout', variant: 'tip', body: 'Pro tip: Use `alias k=kubectl` to save time typing. Most Kubernetes engineers do this within their first week!' },
              { type: 'summary', points: ['apply -f: The universal command for deploying anything', 'get: Used to sanity-check the cluster state', 'describe: The first step when something is broken', 'logs: Vital for seeing app errors'] }
            ]
          },
          {
            id: 'l_k8s_scaling', title: 'Scaling and Load Balancing', duration: '10 min', difficulty: 'Advanced', content: [
              { type: 'concept', body: 'Scaling in Kubernetes can be **Manual** (cmd line) or **Automatic** (Horizontal Pod Autoscaler). K8s can monitor CPU/Memory and add pods if the load gets too high.' },
              { type: 'code', language: 'bash', code: '# Manual scaling to 10 replicas\nkubectl scale deployment my-web --replicas=10' },
              { type: 'concept', body: 'The Horizontal Pod Autoscaler (HPA) works like a thermostat. You set a target (e.g., 50% CPU), and K8s adds or removes pods to stay at that level.' },
              { type: 'summary', points: ['Scaling is nearly instant (seconds)', 'HPA automates scaling based on traffic/load', 'Cluster Autoscaler can even add new physical servers if needed', 'No more manual server provisioning during sales events'] }
            ]
          },
          {
            id: 'l_k8s_vs_docker', title: 'Kubernetes vs Docker', duration: '8 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'It\'s not "Docker vs Kubernetes". It\'s usually "Docker **and** Kubernetes". Docker packages the application. Kubernetes runs it across a cluster of servers.' },
              { type: 'diagram', title: 'Working Together', content: '1. Build Image (Docker)\n   │\n2. Push to Registry (Docker Hub)\n   │\n3. Write Deployment (Kubernetes YAML)\n   │\n4. Orchestrate (Kubernetes Cluster)' },
              { type: 'summary', points: ['Docker = The Container Maker', 'Kubernetes = The Container Manager', 'You use Docker on your laptop, K8s in the Production Data Center', 'They are complementary tools, not competitors'] }
            ]
          },
          {
            id: 'l_k8s_realworld', title: 'Real-world Use Cases', duration: '10 min', difficulty: 'Advanced', content: [
              { type: 'concept', body: 'How do the world\'s largest apps use K8s? Examples include Pokémon GO (scaled to 50x its expected traffic on launch day), Spotify (thousands of microservices), and Airbnb.' },
              { type: 'summary', points: ['HYBRID CLOUD: Run some apps on AWS and others on your own servers — K8s makes them look the same.', 'MICROSERVICES: Managing 200 tiny apps without K8s would require a massive army of humans.', 'BATCH PROCESSING: K8s can spin up thousands of pods to calculate data, then delete them all to save money.'] },
              { type: 'callout', variant: 'tip', body: 'Managing K8s is hard. That\'s why most companies use "Managed Kubernetes" like Amazon EKS, Google GKE, or Azure AKS where the cloud provider manages the master nodes for you.' }
            ]
          }
        ]
      }
    ]
  },
  monitoring: {
    id: 'monitoring', title: 'Monitoring & Observability', description: 'Prometheus, Grafana, and alerting', icon: '📊',
    badges: [
      { label: 'Prometheus', variant: 'intermediate' },
      { label: 'Grafana', variant: 'intermediate' },
      { label: 'Observability', variant: 'advanced' }
    ],
    sections: [
      {
        id: 'sec1_mon', title: 'Monitoring Foundations', lessons: [
          {
            id: 'l_mon_intro', title: 'Introduction to Monitoring', duration: '8 min', difficulty: 'Beginner', content: [
              { type: 'concept', body: 'Monitoring is the process of collecting, analyzing, and using information to track the health and performance of your applications and infrastructure. Observability is a higher level: it means you can understand the *internal* state of your system just by looking at the *external* data it produces.' },
              { type: 'analogy', body: 'Monitoring is like the dashboard in your car. It tells you your speed, how much fuel you have, and if the engine is overheating. Observability is like having a black box flight recorder that can tell you *why* the engine overheated by analyzing thousands of sensor data points.' },
              { type: 'summary', points: ['Monitoring answers: "Is the system healthy?"', 'Observability answers: "Why is it behaving this way?"', 'Telemetry = Logs, Metrics, and Traces', 'Crucial for maintaining High Availability'] },
              { type: 'open_question', question: 'Think of an app you use daily (like Spotify or Instagram). If it starts running slowly, what is one metric you would check first to see if it\'s "healthy"?', placeholder: 'e.g., CPU usage, network latency, database errors...' }
            ]
          },
          {
            id: 'l_mon_metrics_logs', title: 'Logs vs Metrics', duration: '10 min', difficulty: 'Beginner', content: [
              { type: 'concept', body: 'Logs and Metrics are the two most common types of telemetry. They serve different purposes and choosing the right one saves storage and time.' },
              { type: 'diagram', title: 'Telemetry Comparison', content: 'METRICS (Numbers): \n- Temp: 98.6°F, CPU: 45%\n- Fast, cheap to store, great for alerting.\n\nLOGS (Text): \n- "User Jane logged in at 10:00 AM"\n- Heavy, expensive, great for debugging specific events.' },
              { type: 'callout', variant: 'tip', body: 'If you want to know "How many people are on my site right now?", use a Metric. If you want to know "Why did this specific user fail to check out?", use a Log.' },
              { type: 'summary', points: ['Metrics are numeric measurements over time', 'Logs are detailed records of discrete events', 'Use metrics for dashboards/alerts', 'Use logs for deep-dive troubleshooting'] }
            ]
          }
        ]
      },
      {
        id: 'sec2_mon', title: 'Prometheus & Grafana', lessons: [
          {
            id: 'l_mon_prom_arch', title: 'Prometheus Basics', duration: '12 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'Prometheus is the de-facto standard for monitoring cloud-native apps. Unlike most systems that "Push" data to a server, Prometheus "Pulls" (scrapes) metrics from your applications.' },
              { type: 'diagram', title: 'Prometheus Architecture', content: '[ Your App ] ➔ exposes /metrics endpoint\n       ↑\n[ Prometheus ] ➔ Scrapes /metrics every 15s\n       ↓\n[ TSDB ] ➔ Stores data as Time Series' },
              { type: 'callout', variant: 'note', body: 'To let Prometheus see your app, you use an "Exporter" or a client library that opens a simple web page (usually at /metrics) showing plain text numbers.' },
              { type: 'summary', points: ['Prometheus uses a "Pull" model for reliability', 'Stores data in a Time Series Database (TSDB)', 'Highly compatible with Kubernetes', 'Can handle millions of data points'] }
            ]
          },
          {
            id: 'l_mon_prom_metrics', title: 'Prometheus Metrics Types', duration: '10 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'Prometheus understands four main types of metrics. Using the right type ensures your math and graphs are correct.' },
              { type: 'summary', points: ['COUNTER: A value that only goes UP (e.g., total requests). Never goes down unless the app restarts.', 'GAUGE: A value that can go up and down (e.g., current memory usage, temperature).', 'HISTOGRAM: Samples observations (like request duration) and counts them in buckets.', 'SUMMARY: Similar to histogram but calculates quantiles (like 95th percentile) app-side.'] },
              { type: 'callout', variant: 'tip', body: 'Use a Counter for "Total Sales" and a Gauge for "Current Active Users".' }
            ]
          },
          {
            id: 'l_mon_promql', title: 'PromQL Basics', duration: '15 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'PromQL (Prometheus Query Language) is how you ask questions about your data. It is powerful and designed specifically for time-series math.' },
              { type: 'code', language: 'promql', code: '# Get total requests per second over the last 5 minutes\nrate(http_requests_total[5m])\n\n# Get memory usage higher than 1GB\nnode_memory_usage_bytes > 1073741824\n\n# Calculate error rate percentage\nsum(rate(http_requests_total{status="500"}[5m])) \n/ \nsum(rate(http_requests_total[5m])) * 100' },
              { type: 'summary', points: ['PromQL works on labels (e.g., {env="prod"})', 'rate() and irate() are the most common functions', 'Used for both Dashboards and Alerts'] }
            ]
          },
          {
            id: 'l_mon_grafana', title: 'Grafana Dashboards', duration: '10 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'While Prometheus stores the data, Grafana visualizes it. It is the "beautiful face" of your monitoring system.' },
              { type: 'analogy', body: 'If Prometheus is the "Database", Grafana is the "Front-end". It connects to Prometheus (as a data source) and turns numbers into beautiful charts, gauges, and world maps.' },
              { type: 'callout', variant: 'tip', body: 'Most teams use Grafana to create "NOC Dashboards" — big screens in the office that show the literal heart rate of the entire company\'s infrastructure.' },
              { type: 'summary', points: ['Grafana is tool-agnostic (works with Prometheus, SQL, etc.)', 'Supports variables to switch between "Dev" and "Prod" views', 'Essential for cross-team visibility'] }
            ]
          }
        ]
      },
      {
        id: 'sec3_mon', title: 'Alerting & Operations', lessons: [
          {
            id: 'l_mon_alerting', title: 'Alerting System', duration: '10 min', difficulty: 'Advanced', content: [
              { type: 'concept', body: 'Monitoring is useless if no one looks at it. Alerting ensures that when a metric crosses a critical threshold, the right people are notified.' },
              { type: 'diagram', title: 'Alerting Pipeline', content: '[ Prometheus ] ➔ Detects Error ➔ [ Alertmanager ] ➔ [ Slack/PagerDuty ]\n(Checks rules every minute)' },
              { type: 'callout', variant: 'warning', body: 'Beware of "Alert Fatigue". If your system sends 100 emails a day, humans will start ignoring them. Only alert on things that are "Actionable" and "Urgent".' },
              { type: 'summary', points: ['Define thresholds using PromQL', 'Use Alertmanager to group and route alerts', 'Integrate with Slack, Discord, or Email', 'Critical for 24/7 reliability'] }
            ]
          },
          {
            id: 'l_mon_setup', title: 'Real-world Monitoring Setup', duration: '12 min', difficulty: 'Advanced', content: [
              { type: 'concept', body: 'A professional setup often uses the "Golden Signals" of monitoring: Latency, Traffic, Errors, and Saturation.' },
              { type: 'summary', points: ['LATENCY: The time it takes to service a request.', 'TRAFFIC: A measure of how much demand is being placed on your system.', 'ERRORS: The rate of requests that fail.', 'SATURATION: How "full" your service is (e.g., CPU/Disk limits).'] },
              { type: 'callout', variant: 'tip', body: 'The "Four Golden Signals" were developed by Google\'s SRE team. If you monitor these four, you can catch almost any structural failure in your app.' }
            ]
          }
        ]
      }
    ]
  },
  devsecops: {
    id: 'devsecops', title: 'DevSecOps', description: 'Security in every pipeline', icon: '🔐',
    badges: [
      { label: 'Security', variant: 'beginner' },
      { label: 'Automation', variant: 'intermediate' },
      { label: 'Compliance', variant: 'advanced' }
    ],
    sections: [
      {
        id: 'sec1_sec', title: 'The Shift Left Movement', lessons: [
          {
            id: 'l_sec_intro', title: 'Introduction to DevSecOps', duration: '8 min', difficulty: 'Beginner', content: [
              { type: 'concept', body: 'DevSecOps is the practice of integrating security into every single part of the DevOps lifecycle. Instead of a security check happening at the very end, we "Shift Left" and check for security vulnerabilities from the very first line of code.' },
              { type: 'analogy', body: 'Think of building a car. Traditional security is a "Safety Inspector" standing at the end of the factory line checking the brakes. DevSecOps is having safety sensors and checklists at every station — from the engine assembly to the paint shop.' },
              { type: 'summary', points: ['Security is a shared responsibility, not just one team\'s job', '"Shift Left" = Find bugs early when they are cheap to fix', 'Continuous Security, not just once a year audits'] },
              { type: 'open_question', question: 'Why is it much cheaper to fix a security flaw during the "Shift Left" (coding) phase than it is to fix it once the application is already live?', placeholder: 'Consider the cost of data breaches, downtime, and developer hours...' }
            ]
          },
          {
            id: 'l_sec_why', title: 'Why Security in DevOps?', duration: '10 min', difficulty: 'Beginner', content: [
              { type: 'concept', body: 'In the fast-paced world of DevOps, manual security can\'t keep up. If you deploy 10 times a day but your security team takes 2 weeks to audit a release, security becomes a bottleneck.' },
              { type: 'summary', points: ['Automated security keeps up with automated deployments', 'Prevents data breaches and costly outages', 'Reduces legal and compliance risks'] },
              { type: 'callout', variant: 'warning', body: 'The average cost of a data breach is over $4 million. Investing in automated security early is significantly cheaper than fixing a headline-grabbing hack later.' }
            ]
          }
        ]
      },
      {
        id: 'sec2_sec', title: 'Secure Pipelines', lessons: [
          {
            id: 'l_sec_pipeline', title: 'Secure CI/CD Pipeline', duration: '12 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'A Secure Pipeline adds "Security Gates" to your automated workflow. If a piece of code is insecure, the pipeline fails and it is never allowed to reach Production.' },
              { type: 'diagram', title: 'The Security Gates', content: 'Code ➔ [ Lint ] ➔ [ SAST ] ➔ [ SCA ] ➔ [ Container Scan ] ➔ Deploy\n(Each bracket is a security check)' },
              { type: 'summary', points: ['SAST: Static Analysis (scanning your source code)', 'SCA: Software Composition Analysis (scanning your dependencies)', 'Container Scanning: Looking for vulnerabilities in your Docker images'] }
            ]
          },
          {
            id: 'l_sec_secrets', title: 'Secrets Management', duration: '10 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'Secrets are things like API keys, database passwords, and SSH keys. You must NEVER store these in your source code. If you do, a single "git push" could expose your entire company to the world.' },
              { type: 'callout', variant: 'mistake', body: 'Hardcoding secrets in code is the #1 cause of major cloud hacks. Even if a repo is private, it\'s still a huge risk.' },
              { type: 'summary', points: ['Use Environment Variables for secrets', 'Use Secret Vaults (HashiCorp Vault, AWS Secrets Manager)', 'Use "git-secrets" to prevent accidental pushes of keys', 'Rotate secrets regularly'] }
            ]
          }
        ]
      },
      {
        id: 'sec3_sec', title: 'Tools of the Trade', lessons: [
          {
            id: 'l_sec_trivy', title: 'Vulnerability Scanning (Trivy)', duration: '12 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'Trivy is a popular, open-source tool for scanning container images. It looks for outdated libraries or known vulnerabilities (CVEs) inside your Docker images.' },
              { type: 'code', language: 'bash', code: '# ─── Scanning a local image ───\ntrivy image my-app:latest\n\n# ─── High-severity only ───\ntrivy image --severity HIGH,CRITICAL my-app:latest' },
              { type: 'callout', variant: 'tip', body: 'Add Trivy to your CI pipeline. If it finds a "CRITICAL" vulnerability, stop the build immediately.' }
            ]
          },
          {
            id: 'l_sec_snyk', title: 'Vulnerability Scanning (Snyk)', duration: '12 min', difficulty: 'Intermediate', content: [
              { type: 'concept', body: 'Snyk is a powerful platform that scans your application code (`package.json`, `requirements.txt`) for insecure dependencies. It even suggests the exact version to upgrade to to fix the bug.' },
              { type: 'summary', points: ['Scans open-source dependencies in 50+ languages', 'Integrates with GitHub to comment on Pull Requests', 'Identifies license compliance issues (unwanted legal risks)'] }
            ]
          },
          {
            id: 'l_sec_iac', title: 'IaC Security (Checkov)', duration: '10 min', difficulty: 'Advanced', content: [
              { type: 'concept', body: 'If you use Terraform or CloudFormation to build your servers, you can have "Insecure Infrastructure" (like an open S3 bucket). IaC Security tools scan your code *before* you build the servers.' },
              { type: 'code', language: 'bash', code: '# ─── Scanning Terraform code ───\ncheckov -d ./terraform-folder' },
              { type: 'summary', points: ['Prevents misconfigured cloud resources', 'Enforces best practices (e.g., "Must have encryption enabled")', 'Cheaper to fix code than to fix a running database'] }
            ]
          },
          {
            id: 'l_sec_best', title: 'Best Practices', duration: '8 min', difficulty: 'Advanced', content: [
              { type: 'concept', body: 'DevSecOps is not just tools — it\'s a set of principles that keep your company safe while moving fast.' },
              { type: 'summary', points: ['LEAST PRIVILEGE: Everyone (and every service) should have the minimum access needed.', 'ZERO TRUST: Never assume something inside your network is safe.', 'IMMUTABLE INFRASTRUCTURE: Never fix things on a running server — build a new secure one instead.'] }
            ]
          }
        ]
      }
    ]
  }
};

export const allLessons = Object.values(modules).flatMap(mod => mod.sections.flatMap(s => s.lessons));
export const totalLessons = allLessons.length;

