import { styled, ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

import theme from "../../../styles/theme";
import { fetchPostImg } from "../../../utils/idolImgApi";
import { fetchPostIdol } from "../../../utils/idolApi";
import AddIdolConfirmModal from "./AddIdolConfirmModal";
import media from "../../../utils/mediaHelper";

import plusIcon from "../../../assets/icon/ic_plus.png";
import checkedRadioIcon from "../../../assets/icon/ic_radio_checked.png";
import radioIcon from "../../../assets/icon/ic_radio.png";
import creditIcon from "../../../assets/icon/ic_credit.svg";
import removeIcon from "../../../assets/images/ic_item_remove.png";

const AddForm = styled.form`
  width: 360px;
  margin: 60px auto;
  background-color: ${({ theme }) => theme.colors.blackColor2};
  border-radius: 8px;
  padding: 10px 0;

  ${media.tablet`
    padding: 30px 0;
      width:700px;
    `}

  ${media.desktop`
    padding: 50px 0;
      width:1200px;`}
`;

const FormTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.colors.whiteColor};
  font-weight: 600;
  display: flex;
  gap: 5px;
  align-items: center;

  ${media.desktop`
    font-size: 30px;
    `}
`;

const FormHr = styled.hr`
  width: 100%;
  border: 0;
`;

const CreditIcon = styled.img`
  width: 30px;
  height: 50px;

  ${media.desktop`
    width: 40px;
  height: 60px;
    `}
`;
const FormDiv = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: 500;
  margin-top: 24px;

  ${media.desktop`
    margin-top: 30px;
    font-size: ${({ theme }) => theme.fontSize.large}`}
`;
const FormContainer = styled.div`
  width: min-content;
  margin: 0 auto;
`;

const FormImg = styled.img`
  width: 105px;
  height: 105px;
  background-color: ${({ theme }) => theme.colors.grayColor4};
  opacity: 0.7;
  border-radius: 50%;
  object-fit: cover;

  ${media.desktop`
    width: 143px;
  height: 143px;`}
`;

const RemoveIcon = styled.img`
  position: absolute;
  top: 0;
  right: 5px;
  width: 30px;
  height: 30px;
  opacity: 0.8;
  display: ${({ $imgUrl }) => ($imgUrl ? "block" : "none")};
`;

const FormButton = styled.button`
  width: 295px;
  height: 42px;
  border-radius: 3px;
  margin: 50px 0;
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 600;
  background: ${({ $btnDisabled }) =>
    $btnDisabled
      ? "#828282"
      : "linear-gradient(to left, #fe5493 0%, #f86f65 100%)"};
  cursor: ${({ $btnDisabled }) => ($btnDisabled ? "auto" : "pointer")};

  ${media.tablet`
    width:600px;
  `}

  ${media.desktop`
    font-size: ${({ theme }) => theme.fontSize.medium}`}
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
  margin-top: 24px;
  border: solid 1px #ffffff;

  &:focus {
    border: solid 1px #f86f65;
    outline: none;
  }

  ${media.tablet`
    width:600px;
  `}
`;

const DisableInputEmpty = styled.div`
  display: ${(props) => (props.disabled ? "block" : "none")};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.brandColor1};
  margin-top: 5px;
`;

const ImgContainer = styled.div`
  width: 113px;
  height: 113px;
  border: solid 1px ${({ theme }) => theme.colors.brandColor1};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
  position: relative;

  ${media.desktop`
    width: 158px;
  height: 158px;`}
`;

const Require = styled.span`
  color: ${({ theme }) => theme.colors.brandColor2};
`;

const RadioSection = styled.div`
  width: 295px;
  margin: 24px 0;
  display: flex;
  gap: 50px;
  align-items: center;
  padding: 0 7px;
`;
const RadioOption = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: ${({ theme }) => theme.fontSize.small};

  img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }

  ${media.desktop`
    font-size: ${({ theme }) => theme.fontSize.medium}`}
`;

export default function AddIdolForm() {
  const [img, setImg] = useState(null); // 대표사진
  const [imgUrl, setImgUrl] = useState(""); // 대표사진 URL
  const [inputNameValue, setInputNameValue] = useState(""); // 인풋에 입력한 아이돌 이름
  const [inputGroupValue, setInputGroupValue] = useState(""); // 인풋에 입력한 그룹 이름
  const [gender, setGender] = useState("female"); // 성별
  const [conFirmModalOpen, setConfirmModalOpen] = useState(false); // 확인 모달
  const [isNameEmpty, setIsNameEmpty] = useState(false); // 인풋에 이름이 비어있는지 여부
  const [isGroupEmpty, setIsGroupEmpty] = useState(false); // 인풋에 그룹이 비어있는지 여부
  const [isDisabled, setIsDisabled] = useState(true);

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
    setIsDisabled(true);
    setIsNameEmpty(false);

    setConfirmModalOpen(false);
  };

  const handleShowModal = () => {
    if (inputNameValue === "") {
      setIsNameEmpty(true);
      setConfirmModalOpen(false);
    } else if (inputGroupValue === "") {
      setIsGroupEmpty(true);
      setConfirmModalOpen(false);
    } else {
      setIsDisabled(false);
      setConfirmModalOpen(true);
    }
  };

  // 이름,그룹 입력 인풋에서 focus가 나갔을 때 비어있으면 경고 div 출력 & 버튼 비활성화
  const handleIsEmpty = () => {
    const isNameEmpty = inputNameValue === "";
    const isGroupEmpty = inputGroupValue === "";

    setIsNameEmpty(isNameEmpty);
    setIsGroupEmpty(isGroupEmpty);
    setIsDisabled(isNameEmpty || isGroupEmpty);
  };
  // x 버튼 누르면 모달 닫힘
  const handleAddIdolClose = () => {
    setConfirmModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AddForm>
        <FormContainer>
          <FormTitle>
            <span>
              <CreditIcon src={creditIcon} />
            </span>
            아이돌 추가하기
          </FormTitle>
          <FormHr></FormHr>
          <FormDiv>아이돌 대표 이미지</FormDiv>
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
            <RemoveIcon
              $imgUrl={imgUrl}
              src={removeIcon}
              onClick={() => setImgUrl("")}
            />
          </ImgContainer>
          <FormDiv>
            아이돌 이름 <Require>*</Require>
          </FormDiv>
          <InputIdolInfo
            name="name"
            value={inputNameValue}
            onChange={(e) => setInputNameValue(e.target.value)}
            onBlur={handleIsEmpty}
            placeholder="이름을 입력해주세요"
          />
          <DisableInputEmpty disabled={isNameEmpty}>
            필수 입력 항목입니다.
          </DisableInputEmpty>
          <FormDiv>
            그룹명 <Require>*</Require>
          </FormDiv>
          <InputIdolInfo
            name="group"
            value={inputGroupValue}
            onChange={(e) => setInputGroupValue(e.target.value)}
            onBlur={handleIsEmpty}
            placeholder="그룹을 입력해주세요"
          />
          <DisableInputEmpty disabled={isGroupEmpty}>
            필수 입력 항목입니다.
          </DisableInputEmpty>
          <FormDiv>성별</FormDiv>
          <RadioSection>
            <RadioOption onClick={() => setGender("female")}>
              <img src={gender === "female" ? checkedRadioIcon : radioIcon} />
              <span>여성</span>
            </RadioOption>
            <RadioOption onClick={() => setGender("male")}>
              <img src={gender === "male" ? checkedRadioIcon : radioIcon} />
              <span>남성</span>
            </RadioOption>
          </RadioSection>
          <FormButton
            $btnDisabled={isDisabled}
            type="button"
            onClick={handleShowModal}
          >
            확인
          </FormButton>
        </FormContainer>
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
