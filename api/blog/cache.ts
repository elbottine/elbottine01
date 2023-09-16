let _map = new Map();

function getMap(key) {
    if (!_map.has(key)) {
        _map.set(key, new Map());
    }
    return _map.get(key);
}

function stringify(key) {
    return typeof key === 'string' ? key : JSON.stringify(key);
}

export function get(key1, key2) {
    const map = getMap(key1);
    key2 = stringify(key2);
    if (map.has(key2)) {
        return map.get(key2);
    }  
}

export function set(key1, key2, value) {
    const map = getMap(key1);
    key2 = stringify(key2);
    map.set(key2, value);
}

export function del(key1) {
    _map.delete(key1);
}
