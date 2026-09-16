/**
 * Build-time feature flags.
 *
 * Flip a value here and rebuild. Nothing reads `import.meta.env`, deliberately:
 * every route is prerendered to static HTML at build time, so a runtime-only
 * flag would let the prerendered markup and the hydrated client disagree.
 */
export const features = {
  /**
   * Contributor avatar rows on project and demonstration cards
   * (`components/common/ProjectPeople.jsx`).
   *
   * Off since 2026-09-17 — hidden on request. The `slugs` props at the call
   * sites are left in place, so setting this back to `true` restores every row
   * with no other edit.
   */
  showProjectPeople: false,
}

export default features
