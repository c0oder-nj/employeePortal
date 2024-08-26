const JwtTokenTimeExpire = ()=>{
    const deleteCookie = (cookieName) => {
        console.log(document.cookie);
        const [key, value] = document.cookie.split("=");
        document.cookie = key+"="+value+";expires=22 Aug 1999 12:00:00 UTC;";    
       };
 
       const handleLogout = ()=>{
         deleteCookie('accessToken');
         localStorage.clear();
         window.location.href = '/'; //new login endpoint
       }

       handleLogout();
}

export default JwtTokenTimeExpire ;