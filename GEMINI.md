# Antigravity Rules - Mandatory Implementation Plan First

## Core Execution Rule

1. **Always Create Implementation Plan First**:
   - For ANY task, coding request, or modification, the agent MUST ALWAYS research the task and create/update an `implementation_plan.md` artifact FIRST.
   - Set `RequestFeedback: true` and `UserFacing: true` on the artifact metadata.
   - The agent MUST STOP and wait for explicit user review and approval before executing any code modifications or modifying shell commands.

2. **No Unapproved Execution**:
   - DO NOT make source code edits or execute modifying shell commands before the user approves the implementation plan.
