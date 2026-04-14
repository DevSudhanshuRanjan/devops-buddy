# DEVOPS BUDDY

![CI/CD
Pipeline](https://github.com/USERNAME/REPO/actions/workflows/ci.yml/badge.svg)
## Problem Statement
[Short paragraph: What does this project do? What problem does it solve?
Ask your partner for the project description.]
## Architecture Diagram
![Architecture Diagram](docs/architecture.png)
## CI/CD Pipeline Explanation
This project uses GitHub Actions for automated CI/CD.
### Pipeline Stages:
| Stage | Description | Trigger |
|--------|------------------------------------------|-----------------|
| Build | Install dependencies, compile project | Every push/PR |
| Test | Run tests and lint checks | After build |
| Deploy | Notify deployment (Vercel auto-deploys) | Only on main |
### Pipeline Triggers:
- Runs on every push to `main` branch
- Runs on every Pull Request targeting `main`
## Git Workflow
- `main` branch: production-ready code only
- `feature/*` branches: development work
- All changes merged via Pull Requests
- Minimum 5 commits with meaningful messages
## Tools Used
| Tool | Purpose |
|----------------|----------------------------|
| GitHub Actions | CI/CD automation |
| Vercel | Frontend deployment |
| Node.js | Runtime environment |
| Git | Version control |
| GitHub Secrets | Secure credential storage |
## Screenshots
### Pipeline Success
![Pipeline Success](docs/pipeline-success.png)
### Deployment Output
Live URL: [https://your-vercel-url.vercel.app]
![Deployment](docs/deployment-screenshot.png)
## Challenges Faced
1. **[Challenge 1]**: [Description and how you solved it]
2. **[Challenge 2]**: [Description and how you solved it]
3. **[Challenge 3]**: [Description and how you solved it]
## Team
- Sudhanshu Ranjan — Frontend & Backend Development, Deployment
- Vaishnavi Joshi — CI/CD Pipeline, GitHub Actions, Documentation
