import { useReducer } from 'react';
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
import './styles.css'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      
      if(payload.digit === '0' && state.currentOperand === '0') {
        return state
      } 
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state
      }   
      
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      } 

    case ACTIONS.CHOOSE_OPERATION: {
      console.log(state);  
        if(state.currentOperand === null && state.previousOperand === undefined ) {
            return state
        }
        if(state.previousOperand === undefined) { 
                   
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null
          }
        }
        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null
        }
    } 
    case ACTIONS.CLEAR:
        return {} 
       

    default:
       return state
  }
}

function evaluate(state) {
  
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
 
  return (
   <div className="calculator-grid">
     <div className="output">
       <div className="previous-operand">{previousOperand} {operation}</div>
       <div className="current-operand">{currentOperand}</div>
     </div>
     <button className="span-two" onClick={()=>dispatch({type: ACTIONS.CLEAR})}>AC</button>
     <button>DEL</button>     
     <OperationButton dispatch={dispatch} operation='/' />
     <DigitButton dispatch={dispatch} digit='1' />
     <DigitButton dispatch={dispatch} digit='2' />
     <DigitButton dispatch={dispatch} digit='3' />
     <OperationButton dispatch={dispatch} operation='*' />
     <DigitButton dispatch={dispatch} digit='4' />
     <DigitButton dispatch={dispatch} digit='5' />
     <DigitButton dispatch={dispatch} digit='6' />
     <OperationButton dispatch={dispatch} operation='+' />
     <DigitButton dispatch={dispatch} digit='7' />
     <DigitButton dispatch={dispatch} digit='8' />
     <DigitButton dispatch={dispatch} digit='9' />
     <OperationButton dispatch={dispatch} operation='-' />
     <DigitButton dispatch={dispatch} digit='.' />
     <DigitButton dispatch={dispatch} digit='0' />
     <button className="span-two">=</button>
   </div>
  );
}

export default App;
