import { styled } from "styled-components";
import plusIcon from "../../../assets/icon/ic_plus.png";
import { fetchPostImg } from "../../../utils/idolImgApi";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { fetchPostIdol } from "../../../utils/idolApi";

const AddForm = styled.form`
  width: 100%;
  margin : 30px; auto;

  div {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }

  input {
    width: 300px;
    margin:10px 0;
  }

  img {
  width:48px;
  height:48px;
    background-color:rgb(172, 42, 42);
    opacity:0.8;
    border-radius:50%;
  }
    label{
        color:#fff;
    }
`;

export default function AddIdolForm() {
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputGroupValue, setInputGroupValue] = useState("");
  const [gender, setGender] = useState("");

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

  // 아이돌 정보 POST
  const handleAddIdol = async (e) => {
    e.preventDefault();

    const newIdol = {
      name: inputNameValue,
      group: inputGroupValue,
      profilePicture: imgUrl ? imgUrl : "https://example.com/profile.jpg",
      gender: gender,
    };

    await fetchPostIdol(newIdol);

    setInputNameValue("");
    setInputGroupValue("");
    setImg(null);
    setImgUrl("");
    setGender("female");
  };

  return (
    <AddForm onSubmit={handleAddIdol}>
      <div>아이돌 대표 이미지</div>
      <div>
        <label htmlFor="idolImg">
          <img src={imgUrl || plusIcon}></img>
        </label>
        <input
          id="idolImg"
          type="file"
          accept=".png,.jpeg,.jpg"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <div>아이돌 이름</div>
      <input
        name="name"
        value={inputNameValue}
        onChange={(e) => setInputNameValue(e.target.value)}
      ></input>
      <div>그룹명</div>
      <input
        name="group"
        value={inputGroupValue}
        onChange={(e) => setInputGroupValue(e.target.value)}
      />
      <div>성별</div>
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
      <button type="submit">확인</button>
    </AddForm>
  );
}
