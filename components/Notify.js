//Imports ---------------------------------------
import { App } from './App.js';
import anime from './../node_modules/animejs/lib/anime.es.js';

//Notify Object --------------------------------
const Notify = {
    //object properties
    // dynamic variable for length of time notification shows
    showDuration: 2000,
    //div will be created and placed in this variable in init method
    container: null,

    //object methods
    init: () =>  {
        //grab container property and create div with id=notifcations
        Notify.container = document.createElement('div');
        Notify.container.setAttribute('id', 'notifications'); 
        //append container to document body (not #app div becuase notifications on top)
        document.body.appendChild(Notify.container);
    }, 

    show: (message) => {
        //create notificationEntryDiv and set class
        const notificationEntryDiv = document.createElement('div');
        notificationEntryDiv.className = 'notification-entry';
        //set innerHTML of notificationEntryDiv to message (from paramter)
        notificationEntryDiv.innerHTML = message;
        //append notifcationEntryDiv to container div 
        Notify.container.appendChild(notificationEntryDiv);
        //Animate notificationEntryDiv to fade in using anime keyframes
        //wait for number of seconds then fade out using anime keyframes
        //remove div after fade out 
        anime({
            targets: notificationEntryDiv,
            keyframes: [
                // start transparent and fade in 
                {opacity: 0, translateY: -50, duration:0},
                // fade in and wait length of showDuration property until next keyframe
                {opacity: 1, translateY: 0, duration: 300, easing: 'linear', endDelay: Notify.showDuration},
                // fade out
                {opacity: 0, translateY: 50, duration: 300, easing:'linear'}
            ],
            // use complete function to remove notificationEntyryDiv
            complete: () => {
                notificationEntryDiv.remove();
            }
        })
    }
}


//Export ---------------------------------------
export { Notify }