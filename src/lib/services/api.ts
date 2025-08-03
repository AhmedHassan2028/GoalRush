/* eslint-disable prettier/prettier */
export const getUserInfo = async () => {
  const response = await fetch('/api/user')
  const data = await response.json()
  console.log('user: ', data)
  return data
}
