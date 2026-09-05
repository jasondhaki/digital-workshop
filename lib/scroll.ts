/**
 * scrollToSection: Smooth-scrolls to an in-page section by id, accounting
 * for the fixed Navbar height. Shared by Navbar and Navigation so both
 * stay in sync instead of maintaining duplicate copies.
 */
export function scrollToSection(id: string, offset = 80) {
  const element = document.getElementById(id);
  if (!element) return;

  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
