class Storage {
  setItem(key, value) {
    if (value) {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }

  getItem(key) {
    let item = window.localStorage.getItem(key)
    if (item) {
      item = JSON.parse(item)
    }
    return item
  }

  removeItem(key) {
    window.localStorage.removeItem(key)
  }

  clear() {
    window.localStorage.clear()
  }
}

const storage = new Storage()
export default storage
