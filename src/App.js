import { useReducer } from 'react';
import DigitButton from './Buttons/DigitButton'
import OperationButton from './Buttons/OperationButton'
import './styles.css'
import { evaluate, formatOperand } from './utils/utils';

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
          if(state.overwrite) {
            return {
              ...state,
              overwrite: false,          
              currentOperand: payload.digit
            }
          }
          if(payload.digit === '0' && state.currentOperand === '0') {
            return state
          } 
          if (payload.digit === '.' && state.currentOperand == null) {
            return state
          }   
          if (payload.digit === '.' && state.currentOperand.includes('.')) {
            return state
          } 
          return {
            ...state,
            currentOperand: `${state.currentOperand || ""}${payload.digit}`
          } 

    case ACTIONS.DELETE_DIGIT: 
        if(state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentOperand: null
          }
        }
        if(state.currentOperand == null){
          return state
        }
        if(state.currentOperand.length === 1){
          return {...state, currentOperand: null}
        }
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1)
        }

    case ACTIONS.CHOOSE_OPERATION: {     
        if(state.currentOperand == null && state.previousOperand == null ) {
            return state
        }
        if(state.currentOperand == null) {
          return {
            ...state,
            operation: payload.operation
          }
        }
        if(state.previousOperand == null) { 
            return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null
          }
        } 
        return {
          ...state,
          operation: payload.operation,
          previousOperand: evaluate(state),         
          currentOperand: null
        }
    } 
    
    case ACTIONS.EVALUATE:
      if(state.currentOperand == null || state.previousOperand == null || state.operation == null) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }

    case ACTIONS.CLEAR:
        return {} 

    default:
       return state
  }
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
 
  return (
   <div className="calculator-grid">
     <div className="output">
       <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
       <div className="current-operand">{formatOperand(currentOperand)}</div>
     </div>
     <button className="span-two" onClick={()=>dispatch({type: ACTIONS.CLEAR})}>AC</button>
     <button onClick={()=>dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>     
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
     <button className="span-two" onClick={()=>dispatch({type: ACTIONS.EVALUATE})}>=</button>
   </div>
  );
}

export default App;
