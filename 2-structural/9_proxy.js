function networkFetch (url) {
    return`${url} - From server`;
}

const cache = new Set();
const proiedFetch = new Proxy(networkFetch, {
    apply(target, thisArg, argArray) {
        const url = argArray[0];
        if (cache.has(url)){
            return `${url} - From cache`;
        } else {
            cache.add (url);
            return Reflect.apply(target, thisArg, argArray)
        }
    }
})


console.log(proiedFetch('angular.io'));
console.log(proiedFetch('react.io'));
console.log(proiedFetch('angular.io'));