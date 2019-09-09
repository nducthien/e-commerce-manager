import axios from 'axios';
import history from 'history';

/*
*   Create by anhnt2
*   4/6/2019
 */

export function checkToken(props) {
    if (localStorage.getItem("token") == null) {
        props.history.push("/");
    }
    axios({
        method: 'get',
        url: 'users/secured',
        headers: { token: localStorage.getItem("token") }
    }).then(response => {
        if (response.data.active == 401) props.history.push("/");

    }).catch(res => {
        props.history.push("/");
    });
}
