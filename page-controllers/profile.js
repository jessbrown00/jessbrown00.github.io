//Imports----------------------------
import { App } from './../components/App.js';
import { User } from './../components/User.js';
import { Auth } from './../components/Auth.js';

//Page Controller-------------------
function profilePageController(){
    let data = {
        firstName: User.firstName,
        lastName: User.lastName,
        email: User.email,
        screenName: User.screenName,
    }
    App.loadPage('User Profile', 'template-page-profile', data, () => {
        //get edit button
        let editUserBtn = document.querySelector('#edit-user-button');
      
        //add click event listener 
        editUserBtn.addEventListener('click', () => {
            console.log("clicked");
            //get existing details and clear 
            const userDetails = document.querySelector("#user-details");
            userDetails.innerHTML = '';
            //get update user form
            const updateUserForm = document.querySelector("#update-user-form");
            //apend update user form to userDetails div
            userDetails.append(updateUserForm);

            //click event listener on submit button
            updateUserForm.addEventListener('submit', (e) => {
                //create form data object
                e.preventDefault();
                //e stores the submit event so we can call it 
                //prevent form from default behaviour (reload page)
                //get form data and store as object
                let formData = new FormData(updateUserForm);
                //loop through each formData entry and add to an object
                let formDataObj = {};
                for(var field of formData.entries()){
                formDataObj[field[0]] = field[1];
                };
                
                //send object to the User.update() component (User.js)
                User.update(formDataObj);
            });
                

            //get cancel button from form 
            const cancelButton = document.querySelector("#cancel-button");
            //click event listener on cancel button
            cancelButton.addEventListener('click', (e) => {
                //reload page
                location.reload();
            });

        })
       


});
}

//Export---------------------
export { profilePageController }