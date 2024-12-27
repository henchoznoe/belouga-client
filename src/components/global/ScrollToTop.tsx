import { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = (props: PropsWithChildren) => {

  const loc = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loc]);

  return props.children;
}

export default ScrollToTop;
