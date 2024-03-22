export class localStorageAPI {

  static add(key: string, item: projectType) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  static getById(key: string): projectType | null {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        const project: projectType = JSON.parse(item);
        return project;
      } catch (error) {
        console.error("Error parsing project from localStorage:", error);
        return null;
      }
    }
    return null;
  }

  static delete(key: string) {
    localStorage.removeItem(key);
  }

  static getAllItems(): Array<projectType> {
    var list = new Array<projectType>();

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key != null) {
        var value = localStorage.getItem(key);
        if (value != null) {
          var item = JSON.parse(value)
          list.push(item);
        }
      }
    }
    return list;
  }
}