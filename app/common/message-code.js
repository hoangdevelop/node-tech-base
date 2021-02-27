const responseMessage = code => {
  return { message: code }
}

module.exports = {
  I001: 'Logout successful',
  E001: 'Parameter is not corecd',
  E002: 'User has not been assigned to a company yet',
  E003: 'Page size no larger than 1500',
  E004: 'Username or password incorrect',
  E005: 'E005',
  responseMessage
}
