//Imports----------------------------
import { App } from './../components/App.js';
import { Notify } from './../components/Notify.js';
import { Modal } from './../components/Modal.js';
import { Auth } from './../components/Auth.js';

//Page Controller-------------------
function homePageController(){
    // create data variable and define data to go into template 
    let data = {
        description: 'All your outfits in one place. Never lose track of a clothing item in your wardrobe again.'
    }
    // define paramaters 
    if(Auth.authenticated){
        App.loadPage('Home', 'template-page-home', data, () => {
        //callbacks 
        //find button and store in variable testNotificationBtn
        //const testNotificationBtn = document.querySelector('.test-notification-btn');
        //Add event listenter and run Notify.show if clicked 
        //testNotificationBtn.addEventListener('click', () => {
        //   Notify.show('test');
        //});

        const testModalBtn = document.querySelector('.test-modal-btn');
        //Add event listenter and run Modal.show if clicked 
        //testModalBtn.addEventListener('click', () => {
       //     Modal.show('<h1>Modal test</h1><p>content here</p>');
        //});
    });
}else{
    //redriect to logIn page 
    location.hash = "#logIn";


}
}

//Export---------------------
export{ homePageController }