import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useCursorContext } from "../hooks/useCursorContext";
import styles from "../styles/Cursor.module.css";

const variants = {
  solid: {
    backgroundColor: "#9921e8",
    backgroundimage: "linear-gradient(315deg, #9921e8 0%, #5f72be 74%)",
    border: "1px solid #9921e8",
    opacity: 1,
  },
  solidBlack: {
    backgroundColor: "#485461",
    backgroundimage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
    border: "1px solid #9921e8",
    opacity: 1,
  },
  hollowPurple: {
    border: "1px solid #9921e8",
    opacity: 1,
    scale: 5,
    transform: { duration: 0.5 },
  },
  hollowWhite: {
    border: "1px solid white",
    opacity: 1,
    scale: 3,
  },
  hollowBlue: {
    border: "1px solid #09c6f9",
    opacity: 1,
    scale: 3,
  },
  hidden: {
    opacity: 0,
  },
};

const asPixels = (val) => `${val}px`;

export default function CustomCursor() {
  const { state } = useCursorContext();
  const cursorRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (event) => {
      cursorRef.current.style.left = asPixels(event.clientX);
      cursorRef.current.style.top = asPixels(event.clientY);
    };
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <motion.div
      animate={state.type}
      variants={variants}
      className={styles.cursorParent}
      ref={cursorRef}
    />
  );
}
