// lib/belvo.js

import axios from "axios";

const belvo = axios.create({
  baseURL: "https://sandbox.belvo.com/api",
  auth: {
    username: process.env.BELVO_SECRET_ID,
    password: process.env.BELVO_SECRET_PASSWORD,
  },
});

export default belvo;