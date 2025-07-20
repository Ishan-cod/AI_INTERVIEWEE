import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Button } from "@/components/ui/button";

export function HeroArea() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        <div>
          Fake it, till you code it
        {' '}
        </div>
        <Highlight className="text-black dark:text-white">
          Your friendly AI interviewee
        </Highlight>
        <div>
          <Button className="m-2">GET STARTED</Button>
          <Button className="m-2">SignUp</Button>
        </div>
        
      </motion.h1>
    </HeroHighlight>
  );
}
