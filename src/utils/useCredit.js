// localStorage가 변경되면 모든 모달에서 동기화되도록 만든 customHook

import { useEffect, useState } from "react";

const useCredit = () => {
  const [localCredit, setLocalCredit] = useState(
    parseInt(localStorage.getItem("credit")) || 0
  );

  useEffect(() => {
    const updateCredit = () => {
      setLocalCredit(parseInt(localStorage.getItem("credit")) || 0);
    };
    // 커스텀 이벤트 리스너,
    // 컴포넌트 마운트시 리스너가 등록되어 이후 creditUpdate 이벤트가 발생할 때마다 상태가 업데이트 됨
    window.addEventListener("creditUpdate", updateCredit);
    //클린업
    return () => window.removeEventListener("creditUpdate", updateCredit);
  }, []);

  const setNewCredit = (newCredit) => {
    localStorage.setItem("credit", newCredit.toString());
    setLocalCredit(newCredit);
    window.dispatchEvent(new Event("creditUpdate"));
  };

  return [localCredit, setNewCredit];
};

export default useCredit;
