const getUsernameFromEmail = (str) => {
  const position = str.indexOf('@')
  return str.slice(0,position)
}

export default getUsernameFromEmail;