export const capitalize = (word: string) =>
  word.split('').map((l, i) => i === 0 ? l.toUpperCase() : l).join('')
