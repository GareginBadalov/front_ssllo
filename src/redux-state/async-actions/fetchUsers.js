import {FETCH_URL} from "../../configs/urls"
import {setUsers} from "../reducers/listsReducer"
import {setError} from "../reducers/errorReducer";


export const fetchUsers = (name) => {

    return dispatch => {
        fetch(`${FETCH_URL}/listUsers/?name=${name}`, {
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
                dispatch(setUsers(response))
            })
            .catch((error) => {
                if(typeof error.then === "function") {
                    error
                        .then((error) =>
                            dispatch(setError({open: true, error: error}))
                        )
                }
            })
    }
}