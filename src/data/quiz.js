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
  },
  {
    id: 11,
    question: "What is the primary goal of Continuous Integration (CI)?",
    options: ["A) To deploy code to production once a month", "B) To integrate and test code changes frequently", "C) To replace developers with automated scripts", "D) To store all documentation in Git"],
    correct: "B",
    explanation: "CI is the practice of merging all developer code changes into a shared branch multiple times a day, verified by an automated build/test sequence."
  },
  {
    id: 12,
    question: "What is the key difference between Continuous Delivery and Continuous Deployment?",
    options: ["A) Delivery requires manual approval; Deployment is fully automated", "B) Deployment requires manual approval; Delivery is automated", "C) There is no difference", "D) Delivery is only for staging environments"],
    correct: "A",
    explanation: "Continuous Delivery ensures code is *ready* to deploy but requires a human sign-off; Continuous Deployment pushes every passing build directly to users."
  },
  {
    id: 13,
    question: "In a CI/CD pipeline, what does the 'Fail Fast' principle advocate?",
    options: ["A) Failing builds only after they reach production", "B) Running slow, heavy tests first", "C) Running cheap, fast tests (like linting) at the very start to catch errors early", "D) Ignoring small failures to speed up the pipeline"],
    correct: "C",
    explanation: "Fail Fast saves time and resources by putting the quickest tests at the start. If they fail, you don't waste time running more expensive tests."
  },
  {
    id: 14,
    question: "What role do 'Runners' play in GitHub Actions?",
    options: ["A) They are developers who write YAML files", "B) They are the Git repositories themselves", "C) They are virtual machines or containers that execute the jobs in your workflow", "D) They are tools that scan for security bugs"],
    correct: "C",
    explanation: "Runners provide the computing environment where your pipeline steps actually execute. GitHub provides hosted runners (Linux, Windows, MacOS)."
  },
  {
    id: 15,
    question: "Why is 'Action Pinning' (using an exact Git hash) recommended for security?",
    options: ["A) It makes the pipeline run faster", "B) It prevents supply chain attacks if a tag (like @v4) is maliciously moved", "C) It is required by the YAML syntax", "D) It saves disk space on the runner"],
    correct: "B",
    explanation: "A tag like '@v4' can be updated by the owner to a new version. If their account is hacked, it could point to malicious code. A commit hash cannot be changed."
  },
  {
    id: 16,
    question: "What is the purpose of a Docker Container?",
    options: ["A) To store source code for long-term archiving", "B) To package code and all dependencies into a standard unit that runs anywhere", "C) To replace the need for physical servers entirely", "D) To manage Git branch merges"],
    correct: "B",
    explanation: "Containers standardize the environment, ensuring the application has exactly what it needs to run, regardless of the host machine's settings."
  },
  {
    id: 17,
    question: "How do Docker containers differ from traditional Virtual Machines (VMs)?",
    options: ["A) Containers are larger than VMs", "B) Containers share the host OS kernel; VMs include a full Guest OS", "C) VMs are faster to start than containers", "D) There is no difference"],
    correct: "B",
    explanation: "Because they share the host kernel, containers are significantly lighter (MB vs GB) and start in milliseconds compared to minutes for VMs."
  },
  {
    id: 18,
    question: "Which Dockerfile instruction specifies the command to run when the container starts?",
    options: ["A) RUN", "B) COPY", "C) CMD", "D) FROM"],
    correct: "C",
    explanation: "CMD sets the default command for the container. RUN executes commands *during* the build process to install dependencies."
  },
  {
    id: 19,
    question: "What does the command `docker run -p 8080:3000` accomplish?",
    options: ["A) It maps port 8080 on the host to port 3000 inside the container", "B) It maps port 3000 on the host to port 8080 inside the container", "C) It limits the container to 8080 MB of RAM", "D) It runs the container 3000 times"],
    correct: "A",
    explanation: "The `-p` flag syntax is `host_port:container_port`. Traffic hitting the host at 8080 is routed to the app inside at 3000."
  },
  {
    id: 20,
    question: "What is an 'Image' in Docker terminology?",
    options: ["A) A JPEG snapshot of the UI", "B) A running instance of a container", "C) A read-only blueprint containing the instructions to create a container", "D) A secure encrypted password"],
    correct: "C",
    explanation: "Think of an Image as the 'recipe' and a Container as the 'meal'. You can use one image to start many identical containers."
  },
  {
    id: 21,
    question: "What is a Pod in Kubernetes?",
    options: ["A) A single physical server", "B) The smallest deployable unit that wraps one or more containers", "C) A tool for managing Git branches", "D) A type of networking cable"],
    correct: "B",
    explanation: "Pods are the fundamental building blocks of K8s. They wrap containers, providing them with shared network storage and an IP address."
  },
  {
    id: 22,
    question: "Which component of the Kubernetes Control Plane is the cluster's 'Source of Truth'?",
    options: ["A) API Server", "B) Scheduler", "C) etcd", "D) Kubelet"],
    correct: "C",
    explanation: "etcd is a consistent and highly-available key-value store used as Kubernetes' backing store for all cluster data."
  },
  {
    id: 23,
    question: "What is the primary function of a Kubernetes Service?",
    options: ["A) To restart failed containers", "B) To provide a stable IP and DNS name for a dynamic set of Pods", "C) To build Docker images", "D) To monitor server temperature"],
    correct: "B",
    explanation: "Pods are ephemeral and their IPs change. A Service provides a permanent gateway to reach them, even as individual pods are replaced."
  },
  {
    id: 24,
    question: "What happens if a Pod managed by a Deployment crashes?",
    options: ["A) The entire cluster shuts down", "B) You must manually restart it", "C) The Deployment automatically detects the failure and starts a new Pod", "D) Kubernetes deletes the Deployment"],
    correct: "C",
    explanation: "Deployments manage the 'Desired State'. If you want 3 pods and one dies, K8s will immediately start a 4th to maintain the count."
  },
  {
    id: 25,
    question: "Which `kubectl` command is most commonly used to update a deployment?",
    options: ["A) kubectl create", "B) kubectl apply -f <file>", "C) kubectl delete", "D) kubectl restart"],
    correct: "B",
    explanation: "`kubectl apply` is declarative. It compares the file to the current state and makes only the necessary changes."
  },
  {
    id: 26,
    question: "What is the difference between Monitoring and Observability?",
    options: ["A) Monitoring tells you numbers; Observability is for logs", "B) Monitoring answers 'Is it broken?'; Observability answers 'Why is it broken?'", "C) They are exactly the same", "D) Observability is only for frontend development"],
    correct: "B",
    explanation: "Monitoring tracks known patterns (alerts). Observability allows you to explore unknown patterns by analyzing high-cardinality telemetry data."
  },
  {
    id: 27,
    question: "Which metric type in Prometheus only ever goes up (except for restarts)?",
    options: ["A) Gauge", "B) Summary", "C) Counter", "D) Histogram"],
    correct: "C",
    explanation: "Counters are used for things like 'Total Requests' or 'Total Errors'. If you need a value that can go down (like memory usage), use a Gauge."
  },
  {
    id: 28,
    question: "What is the purpose of Grafana in a DevOps stack?",
    options: ["A) To store log files", "B) To act as a code repository", "C) To visualize metrics data through dashboards and charts", "D) To scan for security vulnerabilities"],
    correct: "C",
    explanation: "Grafana connects to data sources like Prometheus and transforms raw numbers into visual interactive dashboards."
  },
  {
    id: 29,
    question: "Which 'Golden Signal' measures the time it takes to service a request?",
    options: ["A) Traffic", "B) Latency", "C) Saturation", "D) Errors"],
    correct: "B",
    explanation: "Latency is the delay between a request and a response. High latency often indicates performance issues or bottlenecks."
  },
  {
    id: 30,
    question: "What does 'Shift Left' mean in DevSecOps?",
    options: ["A) Moving the servers to a different data center", "B) Integrating security practices early in the development lifecycle", "C) Focusing only on production security", "D) Using Linux instead of Windows"],
    correct: "B",
    explanation: "By 'shifting left', you find and fix security bugs during coding and building, which is much cheaper and safer than finding them after launch."
  },
  {
    id: 31,
    question: "What is the primary use of a tool like Trivy?",
    options: ["A) To write code for you", "B) To scan container images for known vulnerabilities (CVEs)", "C) To monitor website traffic", "D) To manage Kubernetes Pods"],
    correct: "B",
    explanation: "Trivy scans the OS packages and dependencies inside a Docker image to ensure there are no known security holes."
  },
  {
    id: 32,
    question: "Where should sensitive 'Secrets' (like API keys) NEVER be stored?",
    options: ["A) In a Secret Vault", "B) In environment variables", "C) Hardcoded in your source code", "D) In GitHub Secrets"],
    correct: "C",
    explanation: "Hardcoding secrets in code makes them permanent in the Git history. Even if the repo is private, it's a huge security risk."
  },
  {
    id: 33,
    question: "What is the 'Least Privilege' principle?",
    options: ["A) Giving everyone admin access to save time", "B) Giving users/services only the minimum permissions necessary to do their job", "C) Allowing all traffic through the firewall by default", "D) Only checking security once a year"],
    correct: "B",
    explanation: "Least Privilege limits the 'blast radius'. If a service is compromised, the attacker only gains the very limited permissions that service had."
  },
  {
    id: 34,
    question: "What is SAST (Static Application Security Testing)?",
    options: ["A) Testing the app while it is running", "B) Scanning source code for security flaws without executing the code", "C) Hiring hackers to try and break into your site", "D) Checking if the server is physically locked"],
    correct: "B",
    explanation: "SAST tools (like SonarQube or Snyk Code) analyze your code's structure to find patterns that indicate security vulnerabilities."
  }
];

