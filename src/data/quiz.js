export const quizQuestions = [
  {
    id: 1,
    question: "What does `git reset --hard HEAD~1` do?",
    options: ["A) Creates a new revert commit", "B) Unstages the last commit's changes", "C) Permanently deletes the last commit and its changes", "D) Moves changes to the stash"],
    correct: "C",
    explanation: "`--hard` discards all changes in working directory and staging area. This is destructive and unrecoverable without reflog."
  },
  {
    id: 2,
    question: "Which command creates AND switches to a new branch simultaneously?",
    options: ["A) git branch new-branch", "B) git switch -c new-branch", "C) git checkout new-branch", "D) git merge new-branch"],
    correct: "B",
    explanation: "`git switch -c` creates and switches in one step. `git checkout -b` is the older equivalent."
  },
  {
    id: 3,
    question: "What is the key difference between `git merge` and `git rebase`?",
    options: ["A) Merge is faster than rebase", "B) Rebase creates a merge commit, merge does not", "C) Rebase rewrites commit history for a linear timeline; merge preserves branch history", "D) They are identical in outcome"],
    correct: "C",
    explanation: "Rebase replays commits on top of another branch creating a linear history. Merge joins branches with a merge commit preserving the full history."
  },
  {
    id: 4,
    question: "In Git's three-area model, what is the Staging Area also called?",
    options: ["A) The Buffer", "B) The Index", "C) The Cache", "D) The HEAD"],
    correct: "B",
    explanation: "The Staging Area is officially called the Index in Git's internals. `git add` moves changes from the working directory into the Index."
  },
  {
    id: 5,
    question: "What does `git stash pop` do differently from `git stash apply`?",
    options: ["A) pop applies the stash and removes it from the stash list; apply keeps it", "B) apply applies the stash and removes it; pop keeps it", "C) They are identical", "D) pop only works on the newest stash; apply works on any"],
    correct: "A",
    explanation: "`git stash pop` = apply + drop. It applies the stash then removes it from the list. `git stash apply` applies it but keeps it in the stash list."
  },
  {
    id: 6,
    question: "Which merge conflict marker indicates the incoming change from the branch being merged?",
    options: ["A) <<<<<<< HEAD", "B) =======", "C) >>>>>>> branch-name", "D) ||||||| base"],
    correct: "C",
    explanation: "`<<<<<<< HEAD` marks YOUR changes. `=======` is the divider. `>>>>>>> branch-name` marks the INCOMING changes from the branch you're merging."
  },
  {
    id: 7,
    question: "What is the Golden Rule of Git Rebase?",
    options: ["A) Always squash before rebasing", "B) Never rebase commits that have been pushed to a shared branch", "C) Always rebase instead of merge for a cleaner history", "D) Rebase requires a clean working directory"],
    correct: "B",
    explanation: "Rebasing rewrites commit history. If others have based work on those commits, rewriting them creates inconsistency and painful conflicts."
  },
  {
    id: 8,
    question: "When contributing to open source, what is the correct order of steps?",
    options: ["A) Clone → Fork → Branch → PR", "B) Fork → Clone → Branch → Commit → Push → PR", "C) Branch → Fork → Clone → PR", "D) Clone → Branch → Fork → PR"],
    correct: "B",
    explanation: "You Fork the repo to your account, Clone YOUR fork locally, create a Branch, make commits, push to your fork, then open a PR to the upstream repo."
  },
  {
    id: 9,
    question: "What is an annotated Git tag and why is it preferred for releases?",
    options: ["A) A tag that points to a branch instead of a commit", "B) A tag stored as a full Git object with tagger, date, and message — preferred for releases because it contains metadata", "C) A tag that automatically triggers CI/CD pipelines", "D) A tag that cannot be deleted once pushed"],
    correct: "B",
    explanation: "Annotated tags (`git tag -a`) are stored as full objects in the Git database with message, author, and date. Lightweight tags are just pointers — no metadata."
  },
  {
    id: 10,
    question: "What is the purpose of `git cherry-pick`?",
    options: ["A) To select which files to include in a commit", "B) To apply a specific commit from one branch onto another branch", "C) To interactively choose lines when resolving conflicts", "D) To pick a branch to merge into main"],
    correct: "B",
    explanation: "`git cherry-pick <hash>` takes a specific commit and applies its changes onto the current branch, creating a new commit with the same changes."
  }
];
