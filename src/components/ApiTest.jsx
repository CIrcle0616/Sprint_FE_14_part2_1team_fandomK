import { useEffect, useState } from "react";
import { fetchGetIdols, fetchPostIdol } from "../utils/apiUtil";

export default function ApiTest() {
  const [idols, setIdols] = useState([]);
  console.log(idols);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchGetIdols();
      setIdols(data);
      // const postData = await fetchPostIdol();
      // console.log(postData);
    }
    fetchData();
  }, []);
  return <div>{idols}</div>;
}
