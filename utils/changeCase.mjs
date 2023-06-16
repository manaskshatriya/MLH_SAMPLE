function changeCase(_case, str) {
    str = str.toUpperCase()

    switch (_case) {
        case "sentence":
            return str.trim().replace(/\b\w/g, function (match) {
                return match.toUpperCase()
            });

        case "pascal":
            return pascalCase(str);
        case "snake":
            return snakeCase(str);
        case "kebab":
            return kebabCase(str);
        default:
            return str;
    }
}

export default changeCase;