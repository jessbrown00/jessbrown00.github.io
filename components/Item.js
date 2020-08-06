//Imports--------------------------
import { Modal } from "./Modal.js"
import { App } from "./App.js"
import { User } from "./User.js"
import { Notify } from "./Notify.js";

//Clothes Object------------------
const Item = {
    //property 
    id: null, 
    //object methods
    get: () => {
        //return new Promise 
        return new Promise ((resolve, reject) => {
            //fetch (GET) items from api 
            fetch('http://localhost:8081/api/items')
            //.then turn response into json format
            .then(res => res.json())          
            //.then send back response as resolve 
            .then(items => {
                resolve(items);
            })
            //.catch send back reject if error occurs
            .catch(err => {
                console.log(err);
                reject(err);
            });
        });
    },

    create: (itemData) => {
        //send to backend API using fetch - POST 
        fetch('http://localhost:8081/api/items', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemData)
        })
        .then(res => {
            if(res.status != 201){
                Notify.show("Problem creating item");
            }else{
            console.log(res.json());
            Notify.show("Clothing item created")
            setTimeout(function(){ location.reload() }, 1000);
    
            }
        })
        .catch(err => {
            console.log(err);
            Notify.show("Problem creating item");
        })
    },

    getCategories: () => {
        //return new Promise 
        return new Promise ((resolve, reject) => {
            //fetch (GET) items from api 
            fetch('http://localhost:8081/api/categories')
            //.then turn response into json format
            .then(res => res.json())
            //.then send back response as resolve 
            .then(categories => {
                resolve(categories);
            })
            //.catch send back reject if error occurs
            .catch(err => {
                console.log(err);
                reject(err);
            });
        });
    },
    
    getByIds: (ids) => {
        //return new Promise
        return new Promise((resolve, reject) => {
            // store URL in object
            let url = new URL ('http://localhost:8081/api/items');
            //create search parameters (ids eqaul to ids passed in from getByIds method)
            let params = { ids: ids };
            //use .search to add paramters onto url/query, then convert to string
            url.search = new URLSearchParams(params).toString();

            //use fetch (GET) to retrieve items from API
            fetch(url)
            // grab response (items matching ids in query) and turn into json
            .then(res => res.json())
            // sends back response as resolve 
            .then(books => {
                resolve(books);
            })
            // sends back reject if error
            .catch(err => {
                console.log(err);
                reject(err);
            });


        })

    },

    getInCategory: (categoryId) => {
        //return new Promise
        return new Promise ((resolve, reject) => {
            // store URL in object
            let url = new URL('http://localhost:8081/api/items');
            //create search parameters (category eqaul to categoryId passed in from getInCategory method)
            let params = { category: categoryId};
            //use .search to add paramters onto url/query, then convert to string
            url.search = new URLSearchParams(params).toString();
            
            fetch(url)
            // grab response and turn into json, returns items
            .then(res => res.json())
            // sends back response as resolve 
            .then(items => {
                resolve(items);
            })
            // sends back reject if error
            .catch(err => {
                console.log(err);
                reject(err);
            });
        })

    },


    createItemObj: (data) => {
        //create empty object and set properties
        const itemObj = {};
        //set data from parameter
        itemObj.data = data; 
        //get template HTML 
        itemObj.template = document.querySelector('#template-item-entry').innerHTML;
        //create div element
        itemObj.el = document.createElement('div');

        //itemObj methods
        //render()
        itemObj.render = () => {
            //set div class name 
            itemObj.el.className = 'item-entry';
            //set item id to data.id
            itemObj.el.setAttribute('id', `book-${itemObj.data._id}`);
            //set id property from data 
            Item.id = itemObj.data._id;
            //if item is in User.favItems add class
            if(User.favItems.includes(itemObj.data._id) ){
                itemObj.el.classList.add('is-favourite');
            }
            //render HTML using mustache template
            itemObj.el.innerHTML = Mustache.render(itemObj.template, itemObj.data);
            // run events() so button clicks are detectes
            itemObj.events();

        }

        //events()
        itemObj.events = () => {
            // get view-item-btn
            const viewItemBtn = itemObj.el.querySelector('.view-item-btn');
            // click
            viewItemBtn.addEventListener('click', () => {
                Item.showModal(itemObj);
            });

            //get delete btn
            const deleteBtn = itemObj.el.querySelector(".delete-btn");
            //click
            deleteBtn.addEventListener('click', () => {
                Item.delete(itemObj.data._id);
            }
            )

            
        }

         // run render()
         itemObj.render();

         // return object to use in page controller
         return itemObj;
    },

    showModal: (itemObj) => {
        //get item modal template 
        const modalTemplate = document.querySelector('#template-item-modal').innerHTML;
        //render modal content and itemObj.data with mustache
        const modalContent = Mustache.render(modalTemplate, itemObj.data);
        //run Modal.show and pass in template and data rendered with Mustache (above)
        Modal.show(modalContent);

        //Changing favourites button between add/remove
        //check if item is in favourites 
        if (User.favItems.includes(itemObj.data._id)){
            //get fav btn
            let favBtn = document.querySelector('.my-modal .fav-btn');
            // change text
            favBtn.innerText = 'Remove from Favourites';
        }

        //get favBtn
        const favBtn = document.querySelector('.my-modal .fav-btn');
        //click event listener on favBtn
        favBtn.addEventListener('click', () => {
            //check if item is already in User.favItems array
            if(User.favItems.includes(itemObj.data._id)){
                //remove from User.favItems with User.removeItemFromFavs
                User.removeItemFromFavs(itemObj.data._id);
                Notify.show(`${itemObj.data.name} removed from favourites`);
            //if not (else) add book to User.favItems with User.addItemToFavs
            }else{
                User.addItemToFavs(itemObj.data._id);
                Notify.show(`${itemObj.data.name} added to favourites`);
        
            }
            //re-render itemObj.el (to show heart when relevant)
            itemObj.render();

            //close modal after click
            Modal.remove();

        })
    },

    delete: (id) => {
       fetch(`http://localhost:8081/api/items/${id}`, {
           method: 'delete'
       })
       .then(res => {
           if(res.status !=200){
               //problem deleting item
               Notify.show ("Problem deleting clothing item")
           }else{
            Notify.show("Item deleted")
            setTimeout(function(){ location.reload() }, 1000);

               
           }
       })
       .catch(err => {
           console.log(err);
           Notify.show("Problem deleting book");
           
       })
    },


}

//Export----------------------------
export { Item }