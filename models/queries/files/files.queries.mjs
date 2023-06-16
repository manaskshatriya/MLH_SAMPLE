function filesQueries(tableName) {
    const checkFile = (columns) => `SELECT ${columns} FROM ${tableName} WHERE email = ?;`

    const insertFile = `INSERT INTO ${tableName} (email, file_name, size, file) VALUES (?, ?, ?, ?);`

    const editFile = (column) => `UPDATE ${tableName} SET ${column} = ? WHERE email = ?;`

    return {
        checkFile,
        insertFile,
        editFile
    }
}

export { filesQueries }