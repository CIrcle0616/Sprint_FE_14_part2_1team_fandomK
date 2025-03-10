// import { useEffect, useState } from "react";
import {
  //   fetchDeleteIdol,
  fetchGetIdols,
  //   fetchPostIdol,
  //   fetchPutIdol,
} from "../utils/idolApi";
// import {
//   fetchGetDonations,
//   fetchDeleteDonation,
//   fetchPostDonation,
//   fetchPutDonationContribute,
//   fetchPutDonation,
// } from "../utils/donationApi";

import { useEffect, useState } from "react";
import IdolHorizontalCard from "./IdolHorizontalCard";

// export default function ApiTest() {
//   const [donations, setDonations] = useState([]);
//   console.log(donations);
//   useEffect(() => {
//     async function fetchData() {
// const data = await fetchPostDonation(); 성공
// const data = await fetchGetDonations();  성공
// const data = await fetchDeleteDonation(714); 성공
// const data = await fetchPutDonationContribute(718);  성공
// const data = await fetchPutDonation(718);  성공
// setDonations(data);
// const postData = await fetchPostIdol();
// console.log(postData);
// const putData = await fetchPutIdol(4619);
// await fetchDeleteIdol(4617);
//   }
//   fetchData();
// }, []);
// return <div>{donations}</div>;
// }

export default function ApiTest() {
  const [idols, setIdols] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchGetIdols();
      setIdols(data.list);
    }
    fetchData();
  }, []);
  return (
    <>
      <h1>API TEST</h1>
      <ul>
        {idols.map((idol, idx) => (
          <li>
            <IdolHorizontalCard idol={idol} flex={"col"} idx={idx} />
          </li>
        ))}
      </ul>
    </>
  );
}
