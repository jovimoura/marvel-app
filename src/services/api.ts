import axios from "axios";
const baseURL = "https://gateway.marvel.com:443";

export const API_PUBLIC_KEY = "f2a209b33a36f686869ac7142a4ef9cb";
export const API_PRIVATE_KEY = "65f618a639f513c17fce7451fbcb3a5327f26721";
export const API_HASH_KEY = "595f6e2e93d78f830a7a9932d57b3102";

export const api = axios.create({
  baseURL,
});
