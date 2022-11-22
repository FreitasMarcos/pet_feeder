import axios from "axios"

const api = axios.create({
  baseURL: 'https://apcqybxoeysonelnumux.supabase.co/'
})

export default api;