//Imports----------------------------
import { App } from './../components/App.js';
import { User } from './../components/User.js';

//Page Controller-------------------
function createAccountPageController(){
    
    App.loadPage('Create Account', 'template-page-create-account', {}, () => {
        //get create account form 
        let createAccountForm = document.querySelector('#form-create-account');
        //submit event 
        createAccountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            //e stores the submit event so we can call it 
            //prevent form from default behaviour (reload page)
            //get form data and store as object
            let formData = new FormData(createAccountForm);
            //loop through each formData entry and add to an object
            let formDataObj = {};
            for(var field of formData.entries()){
                formDataObj[field[0]] = field[1];
            }
            //send object to the User.create() component (User.js)
            User.create(formDataObj);

        });
    });
}

//Export---------------------
export{ createAccountPageController }