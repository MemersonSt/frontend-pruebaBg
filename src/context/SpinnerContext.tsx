import { createContext, useState } from "react";

const SpinnerContext = createContext<{
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  startLoading: () => void;
  stopLoading: () => void;
}>({
  isLoading: false,
  setIsLoading: () => {},
  startLoading: () => {},
  stopLoading: () => {},
});

function SpinnerProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return (
    <SpinnerContext.Provider
      value={{ isLoading, setIsLoading, startLoading, stopLoading }}
    >
      {children}
    </SpinnerContext.Provider>
  );
}

export { SpinnerContext, SpinnerProvider };