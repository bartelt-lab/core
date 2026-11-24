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

  /**
   * The "Student Testimonials" section on /ai-team-projects
   * (`pages/tuc/AiTeamProjects.jsx`).
   *
   * Off since 2026-11-24, hidden on request. Nothing was deleted: the
   * section's markup, the three videos in `public/videos/testimonials/` and
   * their entries in `data/videos.js` are all still there. To show it again,
   * set this to `true` and put the `testimonials` entry back in the
   * '/ai-team-projects' list of `components/common/RightSidebar.jsx`.
   */
  showStudentTestimonials: false,
}

export default features
