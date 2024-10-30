import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "../../utils/cn"; // Make sure this utility function is defined
import { motion, useAnimation } from "framer-motion";

export const SparklesCore = ({
  id,
  className,
  background = "#0d47a1",
  minSize = 1,
  maxSize = 3,
  speed = 4,
  particleColor = "#ffffff",
  particleDensity = 120,
}) => {
  const [init, setInit] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const initializeParticles = async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      setInit(true);
    };
    initializeParticles();
  }, []);

  const particlesLoaded = (container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || "sparkles-core"}
          className={cn("h-full w-full")}
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: background,
              },
            },
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              number: {
                value: particleDensity,
                density: {
                  enable: true,
                  width: 400,
                  height: 400,
                },
              },
              color: {
                value: particleColor,
              },
              size: {
                value: { min: minSize, max: maxSize },
              },
              move: {
                enable: true,
                speed: { min: 0.1, max: 1 },
                direction: "none",
              },
              opacity: {
                value: { min: 0.1, max: 1 },
                animation: {
                  enable: true,
                  speed: speed,
                  startValue: "random",
                  destroy: "none",
                },
              },
              // Other particle options can be added here based on your requirements.
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};
