let _map = null;

function getMap() {
    if (!_map) {
        _map = new Map();
    }
    return _map;
}

export function get(...args) {
    const key = JSON.stringify(args);
    const map = getMap();
    if (map.has(key)) {
        return map.get(key);
    }  
}

export function set(value, ...args) {
    const key = JSON.stringify(args);
    const map = getMap();
    map.delete(key);
    map.set(key, value);
}

export function del(...args) {
    const key = JSON.stringify(args);
    const map = getMap();
    map.delete(key);
}
