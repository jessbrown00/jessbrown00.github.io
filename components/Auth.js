//Imports
import { App } from "./App.js";
import { Notify } from "./Notify.js";
import { User } from "./User.js";

//Object
const Auth = {
    authenticated: false,


    logIn: (userData) => {
        // send userData to backend API using fecth - POST
        fetch('http://localhost:8081/api/auth/login', {
        method: 'post',
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(userData)
    })
    .then(res => {
        if(res.status != 200){
            //problem logging in
            res.json().then(res => {
                Notify.show(res.message);
            });
            
        }else{
            //logIn success
            res.json().then(res => {
                //save token to localStorage
                //local storgae is javascript storing info in browser
                localStorage.setItem('token', res.token);

                //set Auth.authenticated to true
                Auth.authenticated = true;

                //set user info in User Object 
                User.firstName = res.user.first_name;
                User.lastName = res.user.last_name;
                User.screenName = res.user.screen_name;
                User.email = res.user.email;
                User.id= res.user._id;

                //redriect to home page
                location.hash = '#';
                //welcome notification
                Notify.show(`Welcome ${User.firstName}`);
            })
        }
    })
    .catch(err => {
        console.log(err);
        Notify.show('Problem signing in');
    })
    },

     
    check: (callback) => {
        //check if token (jwt) exists in local storage
        if( localStorage.getItem('token') ){
            //validate token using backend API - make a fetch request GET
            fetch('http://localhost:8081/api/auth/validate', {
                headers: { "Authorization" : `Bearer ${localStorage.token}` }
            })
            .then(res => {
                if(res.status !=200){
                    //problem authorising, token validation failed
                    //set Auth.authenticated to false
                    Auth.authenticated = false;
                    //remove local token 
                    localStorage.removeItem('token');
                    //redriect to signIn page 
                    location.hash = "#logIn";
                    Notify.show('Invalid token. Please log in');
                    if( typeof callback == 'function'){
                        callback();
                    }
                }else{
                    //token valid
                    res.json().then(res => {
                        console.log("user authorised");
                        //set Auth.authenticated to true
                        Auth.authenticated = true;
                        //set user info (res.user)
                        User.firstName = res.user.first_name;
                        User.lastName = res.user.last_name;
                        User.screenName = res.user.screen_name;
                        User.email = res.user.email;
                        User.id = res.user._id;
                        //run callback
                        if( typeof callback == 'function'){
                            callback();
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
                Notify.show("Problem authorising");
                if( typeof callback == 'function'){
                    callback();
                }
            })

        }else{
        //no local token, redirect to sign in page
        Notify.show("no local token, please log in");
        location.hash = '#logIn'
        //run callback
        if( typeof callback == 'function'){
            callback();
        }
        }
    },

    logOut: () => {
        //remove local token 
        localStorage.removeItem('token');
        //set Auth.authenticted to false 
        Auth.authenticated = false;
        //redirect to signIn page 
        location.hash = "#logIn";
        Notify.show("You have been logged out");
    }

}

//Export
export { Auth }