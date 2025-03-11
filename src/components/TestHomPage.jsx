function TestHomePage({ openModal }) {
  return (
    <>
      <button onClick={() => openModal("charge", true)}>충전하기</button>
      <button onClick={() => openModal("vote", true)}>투표하기</button>
      <button onClick={() => openModal("donation", true)}>후원하기</button>
      {/* <button onClick={openAlertModal}>경고 모달 열기</button> */}
    </>
  );
}

export default TestHomePage;
