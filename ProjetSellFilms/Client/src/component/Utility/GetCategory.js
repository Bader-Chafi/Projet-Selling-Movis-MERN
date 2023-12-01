import axios from "axios";

const fetchData = (url, setData) => {
  axios
    .get(url)
    .then((response) => {
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error('Data.data is not an array:', response.data.data);
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};



export default fetchData
