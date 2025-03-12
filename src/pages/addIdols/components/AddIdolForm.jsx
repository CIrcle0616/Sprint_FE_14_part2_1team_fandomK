import { styled, ThemeProvider } from "styled-components";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

import theme from "../../../styles/theme";
import { fetchPostImg } from "../../../utils/idolImgApi";
import { fetchPostIdol } from "../../../utils/idolApi";
import AddIdolConfirmModal from "./AddIdolConfirmModal";

import plusIcon from "../../../assets/icon/ic_plus.png";

const AddForm = styled.form`
  width: 327px;
  margin: 120px auto;

  div {
    color: ${({ theme }) => theme.colors.whiteColor};
    font-size: ${({ theme }) => theme.fontSize.medium};
    font-weight: 500;
  }
`;

const FormImg = styled.img`
  width: 115px;
  height: 115px;
  background-color: ${({ theme }) => theme.colors.grayColor4};
  opacity: 0.7;
  border-radius: 50%;
`;

const FormButton = styled.button`
  width: 295px;
  height: 42px;
  border-radius: 3px;
  margin: 50px 0;
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 600;
  background: linear-gradient(
    to left,
    ${({ theme }) => theme.colors.brandColor2} 0%,
    ${({ theme }) => theme.colors.brandColor1} 100%
  );
`;

const InputIdolInfo = styled.input`
  width: 295px;
  height: 58px;
  border-radius: 8px;
  background-color: #272f3d;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.whiteColor};
  padding: 16px;
  margin: 24px 0;
`;

const DisableInputEmpty = styled.div`
  display: ${(props) => (props.disabled ? "block" : "none")};
`;

const ImgContainer = styled.div`
  width: 128px;
  height: 128px;
  border: solid 1px ${({ theme }) => theme.colors.brandColor1};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
`;

const Require = styled.span`
  color: ${({ theme }) => theme.colors.brandColor2};
`;

const RadioSection = styled.div`
  margin: 24px 0;

  input {
    margin-right: 10px;
  }

  label {
    font-size: ${({ theme }) => theme.fontSize.small};
    margin-right: 50px;
  }
`;

export default function AddIdolForm() {
  const [img, setImg] = useState(null); // 대표사진
  const [imgUrl, setImgUrl] = useState(""); // 대표사진 URL
  const [inputNameValue, setInputNameValue] = useState(""); // 인풋에 입력한 아이돌 이름
  const [inputGroupValue, setInputGroupValue] = useState(""); // 인풋에 입력한 그룹 이름
  const [gender, setGender] = useState(""); // 성별별
  const [conFirmModalOpen, setConfirmModalOpen] = useState(false); // 확인 모달
  const [isNameEmpty, setIsNameEmpty] = useState(false); // 인풋에 이름이 비어있는지 여부
  const [isGroupEmpty, setIsGroupEmpty] = useState(false); // 인풋에 그룹이 비어있는지 여부

  // 대표사진 업로드
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    // 파일명을 UUID로 바꿔주기 -> 한글로된 파일명이 업로드되지 않는 것 해결
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidV4()}.${fileExtension}`;
    const renamedFile = new File([file], fileName, { type: file.type });

    setImg(renamedFile);

    const data = await fetchPostImg(renamedFile);
    setImgUrl(data.url);
  };

  // 아이돌 정보 POST -> 확인 모달에서 작동
  const handleAddIdol = async (e) => {
    e.preventDefault();
    const newIdol = {
      name: inputNameValue,
      group: inputGroupValue,
      profilePicture: imgUrl ? imgUrl : "https://example.com/profile.jpg",
      gender: gender,
    };
    await fetchPostIdol(newIdol);

    // 입력한 아이돌 정보 초기화
    setInputNameValue("");
    setInputGroupValue("");
    setImg(null);
    setImgUrl("");
    setGender("female");

    setConfirmModalOpen(false);
  };

  const handleShowModal = () => {
    setConfirmModalOpen(true);
  };

  // 이름 입력 인풋에서 focus가 나갔을 때 비어있으면 경고 div 출력
  const handleIsNameEmpty = (event) => {
    if (!event.target.value) {
      setIsNameEmpty(true);
    } else {
      setIsNameEmpty(false);
    }
  };

  // 그룹 입력 인풋에서 focus가 나갔을 때 비어있으면 경고 div 출력
  const handleIsGroupEmpty = (event) => {
    if (!event.target.value) {
      setIsGroupEmpty(true);
    } else {
      setIsGroupEmpty(false);
    }
  };

  // x 버튼 누르면 모달 닫힘
  const handleAddIdolClose = () => {
    setConfirmModalOpen(false);
  };

  // 확인 버튼을 누르면 '필수 입력항목입니다' 뜨게 구현...

  return (
    <ThemeProvider theme={theme}>
      <AddForm>
        <div>아이돌 대표 이미지</div>
        <ImgContainer>
          <label htmlFor="idolImg">
            <FormImg src={imgUrl || plusIcon}></FormImg>
          </label>
          <input
            id="idolImg"
            type="file"
            accept=".png,.jpeg,.jpg"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </ImgContainer>

        <div>
          아이돌 이름 <Require>*</Require>
        </div>
        <InputIdolInfo
          name="name"
          value={inputNameValue}
          onChange={(e) => setInputNameValue(e.target.value)}
          onBlur={handleIsNameEmpty}
          placeholder="이름을 입력해주세요"
        />
        <DisableInputEmpty disabled={isNameEmpty}>
          필수 입력 항목입니다.
        </DisableInputEmpty>
        <div>
          그룹명 <Require>*</Require>
        </div>
        <InputIdolInfo
          name="group"
          value={inputGroupValue}
          onChange={(e) => setInputGroupValue(e.target.value)}
          onBlur={handleIsGroupEmpty}
          placeholder="그룹을 입력해주세요"
        />
        <DisableInputEmpty disabled={isGroupEmpty}>
          필수 입력 항목입니다.
        </DisableInputEmpty>
        <div>성별</div>
        <RadioSection>
          <input
            id="female"
            type="radio"
            value="female"
            name="gender"
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="female">여성</label>
          <input
            id="male"
            type="radio"
            value="male"
            name="gender"
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="male">남성</label>
        </RadioSection>
        <FormButton
          disabled={
            isNameEmpty ||
            isGroupEmpty ||
            !Boolean(inputNameValue) ||
            !Boolean(inputGroupValue)
          }
          type="button"
          onClick={handleShowModal}
        >
          확인
        </FormButton>
        <AddIdolConfirmModal
          isOpenP={conFirmModalOpen}
          onClose={handleAddIdolClose}
          img={imgUrl}
          name={inputNameValue}
          group={inputGroupValue}
          onSubmit={handleAddIdol}
        />
      </AddForm>
    </ThemeProvider>
  );
}
