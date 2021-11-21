import { createContext, useContext, useState } from "react";

const CursorContext = createContext();

export function CursorProvider({ children }) {
  const [cursorState, updateCursorState] = useState({ type: "solid", });
  return (
    <CursorContext.Provider
      value={{
        state: cursorState,
        setter: updateCursorState,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext() {
  return useContext(CursorContext);
}
