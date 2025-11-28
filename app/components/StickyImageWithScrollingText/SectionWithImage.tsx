"use client";
import type { ReactNode } from "react";
import { easeOut, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface props {
  image: string;
  children?: ReactNode;
  imageFirstDesktop?: boolean;
  imageFirstMobile?: boolean;
  imageClass?: string;
}

const SectionWithImage = ({
  image,
  children,
  imageFirstDesktop = false,
  imageFirstMobile = true,
  imageClass = "object-cover",
}: props) => {
  const [textRef, textInView] = useInView({ threshold: 0.2 });
  const [imgRef, imgInView] = useInView({ threshold: 0.2 });

  const textControls = useAnimation();
  const imgControls = useAnimation();

  useEffect(() => {
    textControls.start(textInView ? "visible" : "hidden");
  }, [textInView]);

  useEffect(() => {
    imgControls.start(imgInView ? "visible" : "hidden");
  }, [imgInView]);

  const fadeInVariant = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: -50,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <div className="w-full h-full rounded-xl p-5 my-10 flex lg:flex-row flex-col gap-4 items-center justify-center">
      {/* Text Block */}
      <motion.div
        ref={textRef}
        variants={fadeInVariant}
        initial="hidden"
        animate={textControls}
        className={`
                    ${imageFirstMobile ? "order-2" : "order-1"} 
                    ${imageFirstDesktop ? "lg:order-2" : "lg:order-1"} 
                    h-full p-10 text-text flex flex-col flex-1/2
                `}
      >
        {children}
      </motion.div>

      {/* Image Block */}
      <motion.div
        ref={imgRef}
        variants={fadeInVariant}
        initial="hidden"
        animate={imgControls}
        className={`
                    ${imageFirstMobile ? "order-1" : "order-2"} 
                    ${imageFirstDesktop ? "lg:order-1" : "lg:order-2"} 
                    lg:h-full flex items-center justify-center flex-1/2
                `}
      >
        <img src={image} alt="" className={`rounded-4xl ${imageClass}`} />
      </motion.div>
    </div>
  );
};

export default SectionWithImage;
