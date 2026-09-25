import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({ children, immediate = false }: { children: ReactNode; immediate?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const html = document.documentElement;
    if (!html.hasAttribute("data-anim")) {
      root.classList.add("rv-in");
      return;
    }

    (window as unknown as { __rvReady?: boolean }).__rvReady = true;

    const show = () => root.classList.add("rv-in");
    if (immediate) {
      requestAnimationFrame(() => requestAnimationFrame(show));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" },
    );
    requestAnimationFrame(() => io.observe(root));
    return () => {
      io.disconnect();
    };
  }, [immediate]);

  return (
    <div ref={ref} data-reveal="" className={immediate ? "rv-in" : undefined}>
      {children}
    </div>
  );
}
