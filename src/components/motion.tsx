import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** EditorialReveal — line-by-line masked text rise */
export function EditorialReveal({ lines, className, delay = 0 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.09 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** InView fade/rise — used for ChapterTransition and StaggeredGallery */
export function Rise({ children, className, delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** MaskedTransition — clip-path wipe for images */
export function MaskedReveal({ children, className, from = "bottom" }: { children: ReactNode; className?: string; from?: "bottom" | "left" }) {
  const reduce = useReducedMotion();
  const hidden = from === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { clipPath: hidden }}
      whileInView={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1.1, ease }}
    >
      {children}
    </motion.div>
  );
}

/** SubtleParallax — few-pixel drift tied to page scroll */
export function useParallax(range = 40): [React.RefObject<HTMLDivElement | null>, MotionValue<number>] {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [range, -range]);
  return [ref, y];
}

export { motion, ease };
