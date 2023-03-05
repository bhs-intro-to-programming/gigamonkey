const lengthOfNames = (array) => {
  return array.filter((n) => n[0] === n[0].toUpperCase() ).map((n)=> n.length)
} 