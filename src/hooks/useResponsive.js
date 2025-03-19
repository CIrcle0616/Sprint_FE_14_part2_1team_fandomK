import { useState, useEffect } from "react";

export const useResponsive = (breakpoint = '1440px') => {
  // 초기값을 명시적으로 null로 설정
  const [isDesktop, setIsDesktop] = useState(null);

  useEffect(() => {
    // 컴포넌트 마운트 후 명시적으로 값 설정
    setIsDesktop(window.matchMedia(`(min-width: ${breakpoint})`).matches);
    
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint})`);
    const handleResize = (e) => setIsDesktop(e.matches);
    
    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [breakpoint]);

  // null인 경우 기본값 제공
  return { isDesktop: isDesktop === null ? true : isDesktop };
};

