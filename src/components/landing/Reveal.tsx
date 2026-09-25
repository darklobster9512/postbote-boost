import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    (window as unknown as { __rvReady?: boolean }).__rvReady = true;
    const show = () => root.classList.add("rv-in");
    if (!document.documentElement.hasAttribute("data-anim") || !("IntersectionObserver" in window)) {
      show();
      return;
    }
    // Already in view or above (e.g. after anchor jump): show at once, no animation delay
    if (root.getBoundingClientRect().top < window.innerHeight * 0.9) {
      show();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            show();
            io.disconnect();
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal="">
      {children}
    </div>
  );
}
