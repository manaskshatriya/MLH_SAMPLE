function adminQueries(tableName) {
  const findAdmin = `SELECT * FROM ${tableName} WHERE username = ?;`

  return {
    findAdmin,
  }
}

export { adminQueries }