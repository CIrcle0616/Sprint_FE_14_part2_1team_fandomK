const BASE_URL = "https://fandom-k-api.vercel.app";

export const fetchPostImg = async (file) => {
  const url = `${BASE_URL}/images/upload`;
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`이미지 업로드 실패 : ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("이미지 POST요청 실패", error);
  }
};
