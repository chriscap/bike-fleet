# Fleet OS multi-agent work protocol

## 1. Main-thread responsibilities

The main Codex thread must retain:

- The user’s current request and constraints
- Final acceptance criteria
- Decisions that cross product, data, UI, and release concerns
- Assignment of non-overlapping tasks
- Integration of subagent findings and patches
- Final validation and communication

Do not delegate the entire task with a vague prompt. Give each agent one bounded question or deliverable.

## 2. Safe parallelism

Good parallel combinations:

- `fleet_product_guardian` + `fleet_architect`
- `fleet_product_guardian` + `fleet_bike_domain_expert` for domain-sensitive requirements
- `fleet_architect` + `fleet_bike_domain_expert` for specifications, compatibility, geometry, fit, or measurement-guide analysis
- `fleet_architect` + `fleet_test_engineer` when the tester only reproduces or writes isolated tests
- `fleet_product_guardian` + `fleet_reviewer` during final review

Use `fleet_bike_domain_expert` before implementation when a task changes bicycle facts, compatibility status, fit calculations or copy, measurement definitions, measurement anchors, or seed data. It is an evidence and review agent, not an implementation agent.

Avoid:

- `fleet_ui_engineer` and `fleet_data_engineer` editing the same areas of `assets/app.js` concurrently
- Two agents changing release/version strings simultaneously
- Any agent deploying while another agent is still editing

## 3. Handoff format

Ask every agent to return:

1. Scope completed
2. Evidence or files inspected
3. Files changed, if any
4. Commands and tests run
5. Findings or implementation summary
6. Risks, assumptions, and unresolved questions
7. Recommended next action

## 4. Branch and worktree policy

For small tasks, one branch and coordinated subagents are sufficient.

For independent write-heavy tasks, use separate Codex worktree chats and branches. Examples:

- Test harness and release tooling
- Geometry/fit UI redesign
- Component compatibility or bike-data audits
- Data-model modularization

Merge only after each branch has its own tests and review.

## 5. Release boundary

Agents may prepare a release, but production deployment remains a separate explicit user-authorized step. Before deployment:

- Export live JSON data
- Confirm the commit and version
- Confirm a clean Git state
- Run automated and manual checks
- Validate in a private/clean browser session
- Pull the exact reviewed commit on DreamHost
- Confirm production and repository hashes match
