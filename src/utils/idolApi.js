const BASE_URL = "https://fandom-k-api.vercel.app/14-1"; //HTTP 요청을 보내는 기본 URL입니다
const defaultGetOption = { cursor: "", pageSize: 10, keyword: "" };

export const fetchGetIdols = async (options = defaultGetOption) => {
  const { cursor, pageSize, keyword } = options;
  const params = new URLSearchParams();

  if (cursor) params.append("cursor", cursor);
  if (pageSize) params.append("pageSize", pageSize);
  if (keyword) params.append("keyword", keyword);

  const queryString = params.toString();
  const url = `${BASE_URL}/idols?${queryString ? `${queryString}` : ""}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("IDOL GET요청 실패", error);
  }
};

const demoIdol = {
  profilePicture: "https://example.com/profile.jpg",
  group: "뉴진스",
  gender: "female",
  name: "하니",
};

export const fetchPostIdol = async (newIdol = demoIdol) => {
  const url = `${BASE_URL}/idols`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newIdol),
    });

    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("IDOL POST요청 실패", error);
  }
};

export const fetchPutIdol = async (id) => {
  const demoIdol = {
    profilePicture: "https://example.com/profile.jpg",
    group: "뉴진스",
    gender: "female",
    name: "다니엘",
  };
  const url = `${BASE_URL}/idols/${id}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(demoIdol),
    });

    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("IDOL PUT요청 실패", error);
  }
};

export const fetchDeleteIdol = async (id) => {
  const url = `${BASE_URL}/idols/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
  } catch (error) {
    console.error("IDOL 삭제 요청 실패", error);
  }
};

export const fetchChartDataByGender = async (gender, option) => {
  const { cursor, pageSize=10 } = option;
  const params = new URLSearchParams();

  if (cursor) params.append("cursor", cursor);
  if (pageSize) params.append("pageSize", pageSize);

  const queryString = params.toString();
  const url = `${BASE_URL}/charts/{gender}?gender=${gender}&${
    queryString ? `${queryString}` : ""
  }`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP 오류: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("차트 불러오기 실패", error);
  }
};

export const fetchVoteIdol = async (id) => {
  const voteIdol = id;
  const url = `${BASE_URL}/votes`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(voteIdol),
    });
    if (!response.ok) throw new Error(`투표 HTTP 에러: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("투표에 실패했습니다. ", error);
  }
};
