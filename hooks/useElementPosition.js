import { useEffect, useState } from "react";

function getValX(element) {
  const boundingRect = element.getBoundingClientRect();
  return (
    boundingRect.left +
    document.documentElement.scrollLeft +
    element.offsetWidth() / 2
  );
}

function getValY(element) {
  const boundingRect = element.getBoundingClientRect();
  return (
    boundingRect.top +
    document.documentElement.scrollTop +
    element.offsetHeight() / 2
  );
}

/**
 *
 * @param {Element} el
 */
export default function useElementPosition(el) {
  const [pos, setPos] = useState(null);
  useEffect(() => {
    setPos({
      x: getValX(el),
      y: getValY(el),
    });
  }, [el]);

  return pos;
}
