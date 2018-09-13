const weekArray = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

function  getWeek(date){
  return weekArray[new Date(date).getDay()]
}

export default {
  getWeek
}