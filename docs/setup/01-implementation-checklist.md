# YellowJacket Implementation Checklist

## Start Gate Checklist

- [ ] Governance and doctrine accepted
- [ ] Runtime architecture accepted
- [ ] Security and trust-boundary posture accepted
- [ ] Shared artifact taxonomy reviewed
- [ ] Shared run-state vocabulary reviewed
- [ ] Trust domains reviewed
- [ ] Permission envelope shape reviewed
- [ ] Checkpoint/resume shape reviewed
- [ ] Scene Continuity Review baseline identified
- [ ] First proving fixture set expanded beyond sample data

## Contracts Package

- [ ] Confirm all major artifact classes exist
- [ ] Confirm schema version is present in every schema
- [ ] Confirm provenance is required where needed
- [ ] Confirm degraded status remains first-class data
- [ ] Confirm checkpoint and resume artifacts remain explicit
- [ ] Confirm app code does not redefine canonical contracts

## Core Runtime

- [ ] Enforce allowed state transitions
- [ ] Enforce stop conditions
- [ ] Enforce permission envelope presence
- [ ] Emit dependency manifest at planning
- [ ] Emit run trace events
- [ ] Surface degraded state upward

## Workcells

- [ ] Registry remains explicit
- [ ] Every workcell has a baseline comparator id
- [ ] Every workcell declares trust domain
- [ ] Every workcell declares checkpoint eligibility
- [ ] Every workcell declares output classes
- [ ] Every workcell declares stop conditions

## Verification

- [ ] Schema validation test exists
- [ ] State machine test exists
- [ ] Permission-envelope test exists
- [ ] Degraded-state test exists
- [ ] Replay test starter exists
- [ ] Checkpoint/resume test starter exists
- [ ] Baseline comparison starter exists
- [ ] Drift comparison starter exists

## AuthorForge Integration

- [ ] Binding converts app request into WorkcellRequest
- [ ] Binding does not redefine contracts
- [ ] Binding keeps review surfaces separate from authority
- [ ] Binding preserves candidate-vs-authority posture
