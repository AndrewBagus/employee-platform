# workflow
- Always use plan mode when the prompt contains "create plan" or describes multiple steps. Confidence: 0.85
- When creating plan/task documents, write high-level step-by-step instructions without code — detailed enough for a junior developer to execute. Confidence: 0.70
- If something goes wrong during implementation, stop and re-plan immediately — do not keep pushing forward. Confidence: 0.70
- Use plan mode for verification and review steps, not just for building features. Confidence: 0.70
- Always ask clarifying questions to get more context before proceeding with implementation. Confidence: 0.65
- Write detailed specifications upfront to reduce ambiguity before coding. Confidence: 0.70
- Always break down tasks with their dependency ordering. Confidence: 0.70
- Always create task planning documents in .commandcode/tasks/<context>/<running-number>.<task-title>.md relative to the worktree directory. Confidence: 0.70
- Follow the agent workflow loop: senior engineer plans → junior engineer implements → code reviewer reviews. Confidence: 0.85
- Code reviewer must write review findings to .commandcode/review-code/<context>/<running-number>.<title>.md relative to the worktree directory. Confidence: 0.85
- After code review, senior engineer reads review-code files and re-plans — iterate up to 3 loops max, then ask for instruction if still unresolved. Confidence: 0.85

# git
- When creating a git worktree, always branch from develop (or dev if develop doesn't exist). Confidence: 0.75
- Always create git worktrees inside .commandcode/worktree/<worktree-name>. Confidence: 0.75
- When a git worktree is created, always create a new branch with the same name as the worktree. Confidence: 0.75
- Do not commit anything until explicitly instructed to do so. Confidence: 0.80
