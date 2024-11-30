import axios from "axios";
// let Baseurl = import.meta.env.VITE_API_URL;
let Baseurl='http://localhost:4001/api/admin'
export default async function Axioscall(method, endpoint, datalist, header) {
  try {
    let base_url = Baseurl + endpoint;
    let data;
    let body = {
      method,
      url: base_url,
      data: datalist,
    };
    if (header) {
      const headerauth = {
        Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
      };
      body.headers = headerauth;
    }
    if (method == "get") {
      data = await axios.get(base_url, {
        params: datalist,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
        },
      });
    } else {
      data = await axios(body);
    }

    return data;
  } catch (error) {
    return error
  }
}
