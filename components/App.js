//Imports -----------------
import { Notify } from './Notify.js';
import { User } from './User.js';
import { Auth } from './Auth.js';

//App Object --------------
const App = {
    //object properties
    name: 'Armoire',
    version: '1.0.0',
    author: 'Jess Brown',
    rootEl: document.querySelector('#app'),
    routes: {},

    //object methods
    init: () => {
        // run Notify.init to create Notify container 
        Notify.init();
        //run Auth.check to see if user is logged in
        Auth.check(() => {
            // run router
            App.router();
            // listen for hash change and rerun router after every update
            window.addEventListener('hashchange', App.router);
        });
      },

    addRoute: (path, pageController) => {
        // grab routes property and create new entry
        // link to pageController function for that route
        App.routes[path] = {
            controller: pageController
        }
    },

    router: () => {
        // get hash location from browser url (or # if empty)
        const path = location.hash || '#';
        // find route for current path from App.routes property
        const route = App.routes[path];
        // check route exists, if it does run controller (function in App.routes), if not 404
        if(route){
            route.controller();
        }else{
            App.loadPage('404 Page not found', 'template-page-404', {});
        }
    },

    loadPage: (title, templateId, data, callback) => {
        // set document title using parameter 
        document.title = title;
        // find template by templateId and store in template variable (only grab innerHTML, not whole script tag)
        let template = document.querySelector(`#${templateId}`).innerHTML;
        // insert data and template into output variable
        let output = Mustache.render(template, data);
        
        /* SIMPLE WAY insert output HTML into rootEl
        //App.rootEl.innerHTML = output;
        */

        // ANIMATION WAY
        // change root.El class to use CSS transistions of hidden class (fade out)
        App.rootEl.className = 'hidden';
        // run folllowing function after set amount of time (500 ms)
        setTimeout(function(){
            // load in output HTML 
            App.rootEl.innerHTML = output;
            //delete class name from root.El
            App.rootEl.className = '';
            // run loadNav function after content is shown
            App.loadNav();
        // if callback from paramaters is a funciont run it 
        if( typeof callback == 'function' ){
            callback();
        }
    }, 500);
    },

    loadNav: () => {
        //get main-nav html and store in mainNav variable 
        let mainNav = document.querySelector("#main-nav");
        // access inner HTML from mainNav and add links
        if(Auth.authenticated){
            //signed in - show nav items favourites, profile and sign out 
            mainNav.innerHTML += `
            <img src="/assets/logo.png" class= "armoire-logo-nav">
            <a href="#" class=> Home</a>
            <a href="#armoire">Armoire</a>
            <a href="#profile">${User.screenName}
            <img src="/assets/avatar.png" class= "avatar">
            </a>`;
            
        }
        
        // run refreshNav method everytime nav loads
        App.refreshNav();
        //run update favCount everytime nav loads
        User.updateFavsCount();
    },

    refreshNav: () => {
        // get current path from browser url (hash or otherwise # for homepage)
        let currentPath = location.hash || '#';
        // find nav items (direct descendants of main-nav) and store in navItems variable 
        let navItems = document.querySelectorAll("#main-nav > a");
        // loop through nav items (forEach function) to check if statement below
        // navLink is what we are defining items in the loop/variable as 
        navItems.forEach((navLink) => {
            // if href of nav link is equal to current path add class to make 'active' with CSS
            if(navLink.getAttribute('href') == currentPath){
                navLink.classList.add('active');
            }
        });
    }
}

//Export Object --------------
export { App }
