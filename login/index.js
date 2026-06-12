
   

    const authUrl="https://bookat-readings-manager.onrender.com/auth/login";

    let loginForm = document.getElementById('login-form');

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        
        //convert html form to json
        let loginJson =jsonFromForm(loginForm);
         
        //
        if(!(loginJson.username=="" || loginJson.password=="")){
           authenticate(loginJson);
        }else{
            loginUnsuccessuful();//make this function
        }

    

        
    });



    function jsonFromForm(loginForm){
        const formData = new FormData(loginForm);
        const plainObject = Object.fromEntries(formData.entries());
       
        loginJson = JSON.stringify(plainObject);


        return loginJson;
    }


    async function authenticate(loginJson){
        loginJson=validate(loginJson);

         response = await fetch(authUrl,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                    },
                body:loginJson
            }
         );
        if(response.ok){
            //obtem o token da resposta do servidor
            const token =  (await response.json()).token;
            saveTokenCookie(token);
            console.log("✅ Cookie salvo com sucesso!");
            

        }
    }

    function validate(loginJson){
        return loginJson;//placeholder
    }

    function getTokenCookie(){
        const decodedCookie = decodeURIComponent(document.cookie);
        const cArray = decodedCookie.split("; ")[0].split("=");
        const token = cArray[1];
        return token;
    }

    function saveTokenCookie(token){
        const cookieDuration = 1;//hours

        let expireDate = new Date();
        expireDate.setTime(expireDate.getTime()+cookieDuration*60*60*1000);
        let expires = "expires" + expireDate.toUTCString();

        document.cookie = `authToken = ${token};expires=${expires};path=/`;
    }