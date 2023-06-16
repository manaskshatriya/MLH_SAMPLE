function fileToBase64(buffer, mimetype) {
    const data = buffer.toString('base64')
    return `data:${mimetype};base64,${data}`
}

export default fileToBase64;