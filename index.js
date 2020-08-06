//Import Components --------------------------------
import { App } from './components/App.js';
import { Auth } from './components/Auth.js';


//Import Page Controllers --------------------------
import { homePageController } from './page-controllers/home.js';
import { logInPageController } from './page-controllers/logIn.js';
import { createAccountPageController } from './page-controllers/createAccount.js';
import { armoirePageController } from './page-controllers/armoire.js';
import { profilePageController } from './page-controllers/profile.js';
import { favouritesPageController } from './page-controllers/favourites.js';


//Routes -------------------------------------------
//#logIn
App.addRoute("#logIn", logInPageController);

//# (home)
App.addRoute("#", homePageController);

//#createAccount
App.addRoute("#createAccount", createAccountPageController);

//#armoire
App.addRoute('#armoire', armoirePageController);

//#favourites
App.addRoute('#favourites', favouritesPageController);

//#profile
App.addRoute("#profile", profilePageController);

//#createAccount
App.addRoute("#createAccount", createAccountPageController);

//#logOut
App.addRoute("#logOut", () => {
    Auth.logOut();
});


//Load App -----------------------------------------
document.addEventListener('DOMContentLoaded', App.init );