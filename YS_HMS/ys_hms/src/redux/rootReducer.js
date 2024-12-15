import { combineReducers } from 'redux';
import exampleReducer from './Example/exampleReducer'; // Import your slice reducers
import bedStatusReducer from './bedStatus/bedStatusReducer';
import ipdPatientReducer from './ipdPatinet/ipdPatientReducer';
import ipdBillReducer from './ipdBill/ipdBillReducer';

const rootReducer = combineReducers({
  example: exampleReducer,
  bedStatus: bedStatusReducer,
  ipdPatientReducer: ipdPatientReducer,
  ipdBillReducer: ipdBillReducer
  // Add more reducers here
});

export default rootReducer;
