export const fieldSorter = <T>(field: keyof T, descending?: boolean) => {
  return (a: T, b: T) => {
    if (a[field] > b[field]) {
      return !descending ? 1 : -1
    } else if (a[field] < b[field]) {
      return !descending ? -1 : 1
    } else {
      return 0
    }
  }
}
