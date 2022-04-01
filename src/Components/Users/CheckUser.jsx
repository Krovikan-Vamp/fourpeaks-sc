import { Outlet } from "react-router-dom";

const CheckUser = () => {
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return undefined;
      }
    const userCookie = getCookie('userCredential');
    const userCredential = sessionStorage.getItem('userCredential');
    if (userCredential !== null && userCookie !== undefined) {
        return null;
    } else {
        window.location.pathname = '/users/login'
    }
}
export { CheckUser }