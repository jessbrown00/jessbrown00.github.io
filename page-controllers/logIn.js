//Imports----------------------------
import { App } from './../components/App.js';
import { Auth } from './../components/Auth.js';

//Page Controller-------------------
function logInPageController(){
    
    App.loadPage('Log In', 'template-page-log-in', {}, () => {
        //get log in form 
        let logInForm = document.querySelector('#form-log-in');
        //submit event 
        logInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            //e stores the submit event so we can call it 
            //prevent form from default behaviour (reload page)
            //get form data and store as object
            let formData = new FormData(logInForm);
            //loop through each formData entry and add to an object
            let formDataObj = {};
            for(var field of formData.entries()){
                formDataObj[field[0]] = field[1];
            }
            //send object to the Auth.logIn() component (Auth.js)
            Auth.logIn(formDataObj);

        });
    });
}

//Export---------------------
export { logInPageController }