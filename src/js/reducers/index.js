import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as actions from '../actions';


const workers = handleActions({
    [actions.addWorker](state, { payload: worker }) {
        return {
            byId: { ...state.byId, [worker.id]: worker },
            allIds: [...state.allIds, worker.id],
        }
    },
}, {
        byId: {},
        allIds: [],
    });


export default combineReducers({
    workers,
})