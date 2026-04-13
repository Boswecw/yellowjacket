# YellowJacket Initial AuthorForge Integration Notes

## Intent

This starter keeps AuthorForge integration thin and bounded.

## Binding Rule

AuthorForge should:
- create a `WorkcellRequest`
- declare input refs
- declare requested outputs
- declare review owner class
- choose an approved trust domain
- hand the request to YellowJacket

AuthorForge should not:
- redefine canonical runtime contracts
- silently grant extra authority
- let app UX become runtime law
- convert candidate output into automatic writeback

## First App-Facing Flow

The first integration target in this scaffold is:

- `scene-continuity-review`

Suggested first shape:
1. Author selects scene/chapter input refs
2. AuthorForge creates a bounded review request
3. YellowJacket plans the workcell
4. YellowJacket produces candidate findings
5. Verification decision and degraded state are attached
6. AuthorForge renders a review packet
7. Human decides what to accept

## Initial AuthorForge Adapter File

See:
- `packages/yellowjacket-app-bindings/src/authorforge.ts`
