//Imports ---------------------------------------
import { App } from './App.js';
import { Item } from './Item.js';
import anime from './../node_modules/animejs/lib/anime.es.js';

//Modal Object --------------------------------
const Modal = {
    //object properties
    //boolean for close button visibility 
    showCloseBtn: true,

    //object methods 
    show: (content) => {
        //create overlayDiv and set class to modal-overlay
        let overlayDiv = document.createElement('div');
        overlayDiv.className = 'modal-overlay';
        //append overlayDiv to rootEl
        App.rootEl.append(overlayDiv);

        //create modalDiv and set class to modal 
        let modalDiv = document.createElement('div');
        modalDiv.className = 'my-modal';

        //create modalContentDiv and set class to modal-content
        let modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        //insert content from paramater into modalContent div
        modalContent.innerHTML = content;

        //create modalCloseBtn and set class to modal-close-btn
        let modalCloseBtn = document.createElement('button');
        modalCloseBtn.className = 'modal-close-btn';
        //use HTML character to set content to an X 
        modalCloseBtn.innerHTML = '&times;';

        //append modalContent to modalDiv
        modalDiv.appendChild(modalContent);
        //if showCloseBtn==true, append close button to modalDiv
        if(Modal.showCloseBtn == true){
            modalDiv.appendChild(modalCloseBtn);
        }

        //append modalDiv (now has content and close button) to rootEl
        App.rootEl.appendChild(modalDiv);

        //animate modalDiv entrance using anime keyframes
        anime({
            targets: modalDiv,
            keyframes: [
                {opacity: 0, duration: 0, top: '60%'},
                {opacity: 1, duration: 900, top:'50%'}

            ]
        })

        //add eventListener to modalCloseButton (pass event though in case we need to get hold of it later)
        modalCloseBtn.addEventListener('click', (event) => {
            Modal.remove();
        });

         //create modalEscKey function which runs Modal.remove() when key is esc (27)
         //function stored in object instead of independent variable (ie. Modal.method insetad of let or const)
         Modal.modalEscKey = (event) => {
            if(event.keyCode == 27){
                Modal.remove();
            }
        },
        //listen for esc keypress
        //on key press run modalEscKey function (need to define seperate function so we can remove key listenter)
        document.addEventListener('keydown', Modal.modalEscKey);
    },

    remove: () => {
        //get overlayDiv
        let overlayDiv = document.querySelector('.modal-overlay');
        //get modalDiv
        let modalDiv = document.querySelector('.my-modal');

        //overlayDiv exit animation
        anime({
            targets: overlayDiv,
            opacity: 0,
            duration: 300,
            easing: 'linear',
            //run complete function (after animation is done) to remove element
            complete: () => {
                overlayDiv.remove();

            }
        }),
        //modalDiv exit animation 
        anime({
            targets: modalDiv,
            opacity: 0,
            duration: 300,
            easing: 'linear',
            top: '60%',
            //run complete function (after animation is done) to remove element
            complete: () => {
                modalDiv.remove();
            }
        })

        //stop listening for esc key 
        //this is where we needed the function defined/named seperatley so we could remove eventListener
        document.removeEventListener('keydown', Modal.modalEscKey);
    }
}

//Export -------------------------------------
export { Modal }