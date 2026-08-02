# Fleet OS agent prompt recipes

Paste or adapt these prompts in Codex from the Fleet OS repository root.

## 1. Orient to the repository

> Read `AGENTS.md` and `docs/00-START-HERE.md`. Use `fleet_architect` to map the current runtime, data-loading path, routing, and service-worker update flow. Do not edit files. Return a concise current-state map with file and symbol references and flag any differences between code and documentation.

## 2. Turn a feature request into a safe plan

> For this request: **[describe request]**. Spawn `fleet_product_guardian` and `fleet_architect` in parallel. Have the product agent define scope and acceptance criteria, and the architect identify the smallest safe implementation path, migration impact, and test plan. Wait for both, then synthesize one implementation plan. Do not edit yet.

## 3. Implement a UI feature

> Implement **[feature]**. First use `fleet_product_guardian` to confirm acceptance criteria and `fleet_architect` to map the owning code. If the feature displays or interprets bicycle specifications, compatibility, geometry, fit guidance, or measurement diagrams, also use `fleet_bike_domain_expert` to validate the underlying facts, definitions, and anchors. Then have `fleet_ui_engineer` make the smallest scoped change. Have `fleet_test_engineer` add or update regression coverage without changing product behavior. Wait for both, run all applicable checks, then use `fleet_reviewer` for a final read-only review. Summarize changed files, test results, and remaining manual checks.

## 4. Change persistence or the data model

> Implement **[data change]**. Use `fleet_architect` to document the current shape and migration path. Have `fleet_data_engineer` implement an idempotent backward-compatible migration that preserves `fleet-os-v1-data` and existing user fields. Have `fleet_test_engineer` add old-version, current-version, malformed-import, merge, and replace fixtures. Finish with `fleet_reviewer`. Do not deploy or reset browser data.

## 5. Debug a live UI or cache regression

> Investigate **[symptom]** without changing production first. Use `fleet_architect` to trace routing, asset loading, version references, and service-worker behavior. Use `fleet_test_engineer` to reproduce the failure locally and create a regression test. Once the failure mode is proven, use the appropriate implementation agent for the smallest fix. Finish with `fleet_reviewer` and list Safari/private-window/manual checks.

## 6. Review a branch before release

> Review this branch against `main`. Spawn `fleet_product_guardian` to check PRD acceptance criteria and scope, `fleet_test_engineer` to run the test and release checklist, and `fleet_reviewer` to assess correctness, data safety, service-worker/cache risk, accessibility, and documentation drift. When the branch changes bike specifications, compatibility, geometry, fit guidance, measurement diagrams, or seed data, also spawn `fleet_bike_domain_expert` for a source-backed domain review. Wait for all agents and return blocking findings first, then non-blocking risks and exact release checks.

## 7. First recommended Fleet OS engineering PR

> Prepare the PR described in the handover as “Add baseline tests and release-version tooling.” Use `fleet_architect` to confirm the current release/version drift and test seams. Have `fleet_test_engineer` add the minimal Node/Playwright harness and route, persistence, migration, Geometry & Fit, and version-consistency smoke tests. Have `fleet_data_engineer` add the smallest release-version tooling needed to make all version references deterministic. Avoid broad refactoring. Finish with `fleet_reviewer` and provide the proposed PR description.


## 8. Validate bike technology, compatibility, geometry, or fit guidance

> Evaluate **[claim, rule, seed data, diagram, or guidance]**. Spawn `fleet_bike_domain_expert` and `fleet_architect` in parallel. Have the domain expert verify model-year and configuration-specific facts from primary sources, distinguish manufacturer geometry from measured fit and rider baseline, assess compatibility criterion by criterion, validate measurement definitions and fit safety language, and label unknowns and confidence. Have the architect map how the current repository stores and renders the affected information and identify the smallest safe change surface. Wait for both, then synthesize product implications, acceptance criteria, implementation ownership, tests, and remaining physical or documentary verification. Do not edit files yet.

## 9. Audit measurement-guide illustrations

> Audit the Fleet OS measurement-guide illustration for **[measurement]**. Use `fleet_bike_domain_expert` to verify the reference points, sign convention, category-specific meaning, and agreement between the visual, field label, written definition, and fit logic. Use `fleet_ui_engineer` only after the corrected measurement specification is approved. Have `fleet_test_engineer` cover selector changes and rendering regressions. Finish with `fleet_reviewer`.

## 10. Audit component or bike seed data

> Audit the repository seed data for **[bike/component]**. Use `fleet_bike_domain_expert` to verify model year, size, configuration, standards, and source provenance, marking unsupported fields unknown. Use `fleet_data_engineer` to implement only the approved data corrections without changing user-entered local data. Use `fleet_test_engineer` to validate migration and seed-merge behavior. Finish with `fleet_reviewer`.
