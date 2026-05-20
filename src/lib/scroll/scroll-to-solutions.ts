import type Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap/register";
import { sceneScrollStore } from "@/lib/scene/scene-scroll-store";
import { SERVICES } from "@/lib/services/data";

const SERVICES_SCROLL_TRIGGER_ID = "services-core";

export function getServicesScrollTrigger() {
  return ScrollTrigger.getById(SERVICES_SCROLL_TRIGGER_ID);
}

function revealAllServiceCards() {
  const cards = document.querySelectorAll<HTMLElement>("[data-service-card]");
  cards.forEach((card, index) => {
    gsap.set(card, {
      opacity: 1,
      rotateX: 0,
      z: 0,
      scale: 1,
      force3D: true,
    });
    card.dataset.active = index === SERVICES.length - 1 ? "true" : "false";
  });

  const progressBar = document.querySelector<HTMLElement>(
    ".services-section__progress-bar",
  );
  if (progressBar) {
    progressBar.style.width = "100%";
  }

  sceneScrollStore.setState({
    isInServices: true,
    servicesProgress: 1,
    activeServiceIndex: SERVICES.length - 1,
  });
}

function scrollToY(targetY: number, lenis: Lenis | null) {
  const y = Math.max(0, targetY);

  return new Promise<void>((resolve) => {
    if (lenis) {
      lenis.scrollTo(y, {
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        onComplete: () => resolve(),
      });
      return;
    }

    window.scrollTo({ top: y, behavior: "smooth" });
    window.setTimeout(resolve, 450);
  });
}

/** Scroll so all service cards are on screen (or revealed on desktop pin). */
export async function scrollToSolutionsAllVisible(lenis: Lenis | null = null) {
  const section = document.getElementById("solutions");
  if (!section) return;

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const pinTrigger = getServicesScrollTrigger();

  ScrollTrigger.refresh();

  if (!isMobile && pinTrigger) {
    const target = pinTrigger.end - window.innerHeight * 0.1;
    await scrollToY(target, lenis);
    revealAllServiceCards();
    return;
  }

  const grid = section.querySelector(".services-section__grid");
  const scrollTarget = grid ?? section;
  const rect = scrollTarget.getBoundingClientRect();
  const absoluteTop = rect.top + window.scrollY;
  const target = absoluteTop - 96;

  await scrollToY(target, lenis);

  const sectionBottom =
    section.getBoundingClientRect().bottom + window.scrollY - window.innerHeight * 0.92;

  if (sectionBottom > window.scrollY + 80) {
    await scrollToY(sectionBottom, lenis);
  }

  revealAllServiceCards();
}

export { SERVICES_SCROLL_TRIGGER_ID };
