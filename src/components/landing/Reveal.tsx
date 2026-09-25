import { useEffect, useRef, type ReactNode } from "react";

// Blocks inside a section that fade in one after another.
const ITEM_SELECTOR =
  "h1,h2,h3,p,img,form,details,dl>div,ul>li,ol>li,.grid>*,a[href],button";

export default function Reveal({ children, immediate = false }: { children: ReactNode; immediate?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const html = document.documentElement;
    if (!html.hasAttribute("data-anim")) {
      root.classList.add("rv-ready", "rv-in");
      return;
    }

    // Pick outermost matching blocks only, so nothing animates twice.
    const all = Array.from(root.querySelectorAll<HTMLElement>(ITEM_SELECTOR));
    const items = all.filter((el) => !all.some((o) => o !== el && o.contains(el)));
    items.forEach((el, i) => {
      el.classList.add("rv-item");
      el.style.setProperty("--i", String(Math.min(i, 12)));
    });
    root.classList.add("rv-ready");
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
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => {
      io.disconnect();
    };
  }, [immediate]);

  return (
    <div ref={ref} data-reveal="">
      {children}
    </div>
  );
}
