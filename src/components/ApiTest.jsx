import { useEffect, useState } from "react";
import {
  fetchDeleteIdol,
  fetchGetIdols,
  fetchPostIdol,
  fetchPutIdol,
} from "../utils/apiUtil";

export default function ApiTest() {
  const [idols, setIdols] = useState([]);
  console.log(idols);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchGetIdols();
      setIdols(data);
      // const postData = await fetchPostIdol();
      // console.log(postData);
      // const putData = await fetchPutIdol(4619);
      // await fetchDeleteIdol(4617);
    }
    fetchData();
  }, []);
  return <div>{idols}</div>;
}
