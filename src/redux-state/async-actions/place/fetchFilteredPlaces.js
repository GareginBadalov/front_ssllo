import {FETCH_URL} from "../../../configs/urls"
import {setPlaces} from "../../reducers/listsReducer"
import {setError} from "../../reducers/errorReducer";


export const fetchFilteredPlaces = (place) => {

    return dispatch => {
        fetch(`${FETCH_URL}/search_address?address=${place}`, {
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
            .then(json => {
                dispatch(setPlaces(json))
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