import { useState, useEffect } from "react";

const useNavigateToExternal = (url: string) => {
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    if (navigate) {
      window.location.href = url;
    }
  }, [navigate, url]);

  const triggerNavigation = () => {
    setNavigate(true);
  };

  return triggerNavigation;
};

export default useNavigateToExternal;
