export default class SwLoader {

    static register(path) {
        if (typeof path !== 'string' && path.length === 0) {
            console.error('SwLoader.register argument must be a not empty string.');
            return;
        }
        if (path[0] !== '/') {
            console.error('SwLoader.register argument must starts with "/".');
            return;
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(path)
                .then(function (registration) {
                    console.log('ServiceWorker registration', registration);
                })
                .catch(function (err) {
                    console.error(err);
                });
        }
    }

}
