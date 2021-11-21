import { AnimatePresence } from "framer-motion";
import CustomCursor from "../components/CustomCursor";
import { CursorProvider } from "../hooks/useCursorContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CursorProvider>
      <AnimatePresence exitBeforeEnter>
        <CustomCursor />
        <Component {...pageProps} />
      </AnimatePresence>
    </CursorProvider>
  );
}

export default MyApp;
