function formatter(num) {
   return num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
   })
}

export default class {
   static getTime(date) {
      date = new Date(date);

      return `${formatter(date.getHours())}:${formatter(date.getMinutes())}`
   }
}
