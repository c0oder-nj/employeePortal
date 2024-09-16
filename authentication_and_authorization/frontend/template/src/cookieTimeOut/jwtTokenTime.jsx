import useAuth from "../hooks/useAuth";

const JwtTokenTimeExpire = ()=>{
  // const {handleLogOut} = useAuth();
    const deleteCookie = (cookieName) => {
        console.log(document.cookie);
        const allCookies = document.cookie.split(';');
        for (let i = 0; i < allCookies.length; i++) {
          let cookie = allCookies[i].trim();
          if (cookie.startsWith(cookieName + '=')) {
            const accesstoken = cookie.split('=')[1];
              document.cookie = cookie.split('=')[0]+ "=" + cookie.split('=')[1]+";expires=22 Aug 1999 12:00:00 UTC;";  
              return;
          }
        }
        // const [key, value] = document.cookie.split("=");
        // document.cookie = key+"="+value+";expires=22 Aug 1999 12:00:00 UTC;";    
       };
 
       const handleLogout = ()=>{
         deleteCookie('accessToken');
         localStorage.clear();
         window.location.href = '/'; //new login endpoint
       }

       handleLogout('accessToken');
}

export default JwtTokenTimeExpire ;