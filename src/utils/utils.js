export function evaluate({currentOperand, previousOperand, operation}) {
  const current = parseFloat(currentOperand)
  const prev = parseFloat(previousOperand)
  if(isNaN(current) || isNaN(prev)) return ""

  let computation = ''
  switch (operation) {
    case '+' :
      computation = prev + current
      break
    case '-' :
      computation = prev - current
      break
    case '*' :
      computation = prev * current
      break
    case '/' :
      computation= prev / current
      break
    default:
     return ''
  }
  return computation.toString()
}



export function formatOperand (operand) {
  let formatter = new Intl.NumberFormat("ru", {
    maximumFractionDigits: 2
  })

  if(operand == null) return
  const [integer, decimal] = operand.split('.')
  if(decimal == null) return formatter.format(integer)
  return `${formatter.format(integer)}.${decimal}`
}