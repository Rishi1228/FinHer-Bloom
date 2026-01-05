/// <reference types="vite/client" />

import "framer-motion";

declare module "framer-motion" {
  interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    whileInView?: any;
    whileHover?: any;
    whileTap?: any;
    viewport?: any;
    transition?: any;
    variants?: any;
  }
}
