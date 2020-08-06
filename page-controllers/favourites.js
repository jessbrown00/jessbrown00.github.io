//Imports--------------------------------------
import { App } from './../components/App.js';
import { Notify } from '../components/Notify.js';
import { User } from '../components/User.js';
import { Item } from '../components/Item.js';

//Page Controller--------------------------------------
function favouritesPageController(){
    //load page and defines title, template, data (empty) and callback
    App.loadPage('Favourites', 'template-page-favourites', {}, () => {
        //get div #items-list
        const itemsListDiv = document.querySelector('#items-list');

        //check if user has favourites

        //
        if(User.favItems.length>0){
            Item.getByIds(User.favItems)
        .then(items => {
             // loop through items array 
             items.forEach(item => {
                // run createItemObj which creates itemObj then returns it to itemObj variable
                const itemObj = Item.createItemObj(item);
                // put itemObj.el into itemListDiv
                itemsListDiv.appendChild(itemObj.el);
            })
            
        })
        .catch(err => {
            console.log(err);
            Notify.show("Problem getting clothes!")
        });
        }else{
            //user has no favs 
            itemsListDiv.innerHTML = '<p> No favourites yet </p>';
        }
    });
   
}

//Export--------------------------------------
export { favouritesPageController }