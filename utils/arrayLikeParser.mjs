function arrayLikeParser(arrayLike) {
    if (arrayLike instanceof Array) {
        return arrayLike
    } else if (arrayLike instanceof object) {
        return Array.from(arrayLike)
    } else {
        return []
    }
}

export default arrayLikeParser;