import axios from "axios"


axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.withCredentials = true

console.log("DEBUG ENV:", process.env.REACT_APP_API_BASE_URL)

const client = axios.create(
  {
    baseURL: process.env.REACT_APP_APIII_BASE_URL
  }
)


export function useApiClient() {
  return client
}