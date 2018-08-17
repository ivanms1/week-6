
export default (state = { number: 0 }, action) => {
 switch (action.type) {
  case 'SIMPLE_ACTION':
   return state = { ...state, number: state.number + action.payload}
  default:
   return state
 }
}