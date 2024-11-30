const setLocalStorage = (key,value) => {
    localStorage.setItem(key, JSON.stringify(value))
    return
}

const getLocalStorage = (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}
module.exports = {
  setLocalStorage,
  getLocalStorage,
};