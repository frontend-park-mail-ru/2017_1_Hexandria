export default class SwLoader {

    static register(name) {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(name)
                .then(function (registration) {
                    console.log('ServiceWorker registration', registration);
                })
                .catch(function (err) {
                    console.error(err);
                });
        }
    }

}
