import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../utils/routes';


export const addWorker = createAction('ADD_WORKER');


export const downloadJson = () => async (dispatch) => {
    try {
        const jsonData = await axios.get(routes.jsonUrl);
        console.log(jsonData.data);
        jsonData.data.map(item => dispatch(addWorker(item)));
    } catch (e) {
        console.log(e);
        throw e;
    }
};