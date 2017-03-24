;(function () {
    "use strict";

    const pathToRegex = function (pathname) {
        const keyNames = [];
        const parts = pathname
            .split("/")
            .filter(part => part)
            .map(part => {
                if (/^:/.exec(part)) {
                    keyNames.push(part.slice(1));
                    return new RegExp("^/([^/]+)", "ig");
                }
                return new RegExp("^/${part}", "ig");
            });


        return function (path) {
            const keys = [];
            let length = parts.length;
            const check = parts.every((regexp, step) => {
                const tmp = regexp.exec(path);
                if (!tmp) {
                    return false;
                }
                if (length === 1) {
                    if (path === tmp[0] || path[regexp.lastIndex] === "/") {
                        if (path[regexp.lastIndex + 1] === undefined) {
                            if (tmp.length === 2) {
                                keys.push(tmp[1]);
                            }
                            path = path.replace(regexp, "");
                            return true;
                        }
                    }
                } else if (path[regexp.lastIndex] === "/" || path.substring(regexp.lastIndex, tmp[0].length) === tmp[0]) {
                    if (tmp.length === 2) {
                        keys.push(tmp[1]);
                    }
                    path = path.replace(regexp, "");
                    --length;
                    return true;
                }
                return false;
            });

            if (check) {
                return keys.reduce((prev, curr, pos) => {
                    prev[keyNames[pos]] = curr;
                    return prev;
                }, {});
            }
            return null;
        };
    };

    window.pathToRegex = pathToRegex;
})();
