const BASE_URL = "https://fandom-k-api.vercel.app/14-1"; //HTTP 요청을 보내는 기본 URL입니다
const defaultGetOption = {
  cursor: "",
  pageSize: 10,
  priorityIdolIds: [123, 344],
};

export const fetchGetDonations = async (options = defaultGetOption) => {
  const { cursor, pageSize, priorityIdolIds } = options;
  const params = new URLSearchParams();

  if (cursor) params.append("cursor", cursor);
  if (pageSize) params.append("pageSize", pageSize);
  if (priorityIdolIds) {
    priorityIdolIds.forEach(
      (priorityIdolId) => params.append("priorityIdolIds", priorityIdolId) //우선순위 아이돌들의 id값을 받아서 params에 배열로 추가함
    );
  }

  const queryString = params.toString();
  const url = `${BASE_URL}/donations?${queryString ? `${queryString}` : ""}`;

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
    console.error("Donations GET요청 실패", error);
  }
};

const demoDonation = {
  deadline: "2025-03-15T02:27:24.536Z",
  targetDonation: 100000,
  subtitle: "지하철 광고",
  title: "뉴진스 다니엘",
  idolId: 4610,
};

export const fetchPostDonation = async (newDonation = demoDonation) => {
  const url = `${BASE_URL}/donations`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newDonation),
    });

    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Donations POST요청 실패", error);
  }
};

const demoPutDonation = {
  deadline: "2025-03-13T02:27:24.536Z",
  targetDonation: 300000,
  subtitle: "전광판 광고",
  title: "뉴진스 하니",
  idolId: 0,
};

export const fetchPutDonation = async (
  id,
  updateDonation = demoPutDonation
) => {
  const url = `${BASE_URL}/donations/${id}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateDonation),
    });

    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Donations PUT요청 실패", error);
  }
};

export const fetchDeleteDonation = async (id) => {
  const url = `${BASE_URL}/donations/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
  } catch (error) {
    console.error("Donations 삭제 요청 실패", error);
  }
};

const CONTRIBUTE_CREDIT = 10000;

export const fetchPutDonationContribute = async (id) => {
  const url = `${BASE_URL}/donations/${id}/contribute`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ amount: CONTRIBUTE_CREDIT }),
    });

    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Donations PUT요청 실패", error);
  }
};
