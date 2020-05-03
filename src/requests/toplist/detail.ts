import { axiosInstance } from '../$axiosInstance'
export const requestToplistDetail = () => {
  return axiosInstance.get(`/toplist/detail`)
}
