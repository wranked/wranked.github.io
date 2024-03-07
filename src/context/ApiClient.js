import axios from "axios"


axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.withCredentials = true

const client = axios.create(
  {
    baseURL: `http://localhost:8000`
  }
)


export function useApiClient() {
  return client
}