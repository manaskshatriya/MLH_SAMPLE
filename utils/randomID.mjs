const { randomBytes } = await import('node:crypto');

function randomID(size) {
    return randomBytes(size)
        .toString('hex')
        .slice(0, size)
}

export default randomID;