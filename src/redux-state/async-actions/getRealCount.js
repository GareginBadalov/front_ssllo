import {FETCH_URL} from "../../configs/urls"
import {setCountBefore} from "../reducers/paymentReducer";


export const getRealCount = (id) => {

    return dispatch => {
        fetch(`${FETCH_URL}/contractDays/${id}`, {
            method: 'GET',
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response.json();
                }
            })
            .then(response => {
                dispatch(setCountBefore(response.days_first))
            })
    }
}