# Fleet OS custom agents

This directory explains how to use the project-scoped Codex agents defined in `.codex/agents/`.

## Why these agents exist

Fleet OS has several risk domains that benefit from separate context and review:

- Product scope and acceptance criteria
- Local-first architecture and migrations
- Bicycle industry standards, component technology, compatibility evidence, geometry, and fitting semantics
- UI, responsive behavior, accessibility, and measurement illustrations
- Data integrity, compatibility, fit logic, and service-worker releases
- Automated regression testing
- Independent final review

The main Codex thread remains the orchestrator. It owns the user request, chooses which agents to spawn, resolves conflicts, integrates changes, and produces the final summary.

## Agent roster

| Agent | Access | Use for | Do not use for |
|---|---|---|---|
| `fleet_product_guardian` | Read-only | Requirements, acceptance criteria, scope, UX consistency | Editing code |
| `fleet_architect` | Read-only | Code mapping, migrations, architecture, sequencing, risk | Editing files |
| `fleet_bike_domain_expert` | Read-only | Bike-industry standards, technology, geometry, compatibility, measurement definitions, and category-aware fit review | Editing code or making medical diagnoses |
| `fleet_ui_engineer` | Workspace write | HTML/CSS/UI JS, accessibility, responsive behavior, SVG guides | Storage or migration redesign |
| `fleet_data_engineer` | Workspace write | Persistence, migrations, import/export, compatibility, calculations, release tooling | Unscoped visual redesign |
| `fleet_test_engineer` | Workspace write | Test harness, Playwright, fixtures, regressions, release checks | Product behavior changes |
| `fleet_reviewer` | Read-only | Final branch/PR review and release-risk assessment | Implementing fixes |

## Delegation pattern

Use parallel agents for independent analysis. Avoid parallel writes to the same files.

Recommended sequence for a meaningful feature:

1. Spawn `fleet_product_guardian` and `fleet_architect` in parallel.
2. Add `fleet_bike_domain_expert` whenever the feature touches bike specifications, compatibility, geometry, fit guidance, measurement diagrams, or seed data.
3. Wait for the analysis agents and resolve requirements, domain facts, and technical boundaries in the main thread.
4. Spawn one primary implementation agent: `fleet_ui_engineer` or `fleet_data_engineer`.
5. Spawn `fleet_test_engineer` after the change surface is stable, or in parallel only when it works in non-overlapping test files.
6. Spawn `fleet_reviewer` after implementation and tests.
7. Have the main thread integrate fixes and summarize the result.

## Important limitation

Subagents are not a substitute for Git branches or worktrees. For two large, write-heavy efforts, use separate Codex worktree chats instead of allowing multiple write agents to modify overlapping files in one workspace.

## Context boundaries

Agents should use the repository docs and current source. They should not use or reconstruct the earlier bike-buying, shopping, or trail-planning conversation. Seed data may remain in the application, but product decisions must be justified by the PRD and current requirements.

## Bike-domain specialist

See `docs/agents/BIKE-DOMAIN-EXPERT.md` for its evidence hierarchy, compatibility method, fit-review method, boundaries, and example delegation prompts.
