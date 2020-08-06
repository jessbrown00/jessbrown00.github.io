//Imports --------------------------------
import { App } from './App.js';
import { Notify } from './Notify.js';
import { Auth } from './Auth.js';

//User Object -----------------------------
const User = {
    //object properties
    firstName: null,
    lastName: null,
    screenName: null,
    email: null,
    favItems: [],
    id: null,
    updated: false,

    //object methods 
    create: (userData) => {
        //send to backend API using fetch - POST 
        fetch('http://localhost:8081/api/users', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
        .then(res => {
            if(res.status != 201){
                Notify.show("Problem creating account");
            }else{
            Notify.show("Account created");
            //redirect user to log in page #logIn
            location.hash = '#logIn'
            Notify.show("Please Log In");
            }
        })
        .catch(err => {
            console.log(err);
            Notify.show("Problem creating user");
        })
    },

    update: (updatedUserData) => {
      return new Promise((resolve, reject) => {
          //store URL in object 
          let url = new URL (`http://localhost:8081/api/users/:id`);
          //create search params
          const id = User.id;
          const params = {id: User.id}
          console.log(id);
          //use .search to add paramters onto url/query, then convert to string
          url.search = new URLSearchParams(params).toString();
          console.log(url);
          fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUserData)
        })
        .then(res => {
            if(res.status != 201){
                //problem updating user
                res.json().then(res => {
                    Notify.show("Problem updating user");
                });
            }else{
            res.json().then(res => {
                User.updated = true;
                Notify.show("Account updated, please log in with new details");
            //clear user-details div and set innerHTML to new data

                User.firstName = res.first_name;
                User.lastName = res.last_name;
                User.screenName = res.screen_name;
                User.email = res.email;

                //redirect to log in page to log in with new details 
                //forces refresh of User.proprties for all variables 
                Auth.logOut();
                location.hash = '#logIn';

                
                
                })
            
            }
        })
        .catch(err => {
            console.log(err);
            Notify.show("Problem updating user");
        })
      })
      
      
        //send to backend API using fetch - PUT 
      
},



    addItemToFavs: (id) => {
        //console.log message that item is being added 
        console.log(`adding item id${id} to User.favItems`);
        //add the id to User.favBooks array with push()
        User.favItems.push(id);
        console.log(User.favItems);
        User.updateFavsCount();
    },

    removeItemFromFavs: (id) => {
        //console.log message that item is being removed 
        console.log(`removing item id ${id} from User.favItems`)
        //get the index (number in array) of the id in the User.favItens
        const index = User.favItems.indexOf(id);
        //if index is greater than -1 (aka it's real and in the array), remove 1 item from array with splice()
        if(index > -1) {
            User.favItems.splice(index,1);
        }
        //log remaining items 
        console.log(User.favItems);
        User.updateFavsCount();
    },
    
    updateFavsCount: () => {
        //get the favItems count (number of clothes in array)
        let favCount = User.favItems.length;
        //check if there are favs
        if(favCount > 0){
            //check if favsCountSpan is there first
            let favsCountSpanExisting = document.querySelector('#favs-count');
            if(favsCountSpanExisting){
                favsCountSpanExisting.innerText= favCount;
            }else{
                // span doesn't exist so create it 
            let favsFilterBtn = document.querySelector("#favs-filter-div");
            let favsCountSpan = document.createElement('span');
            favsCountSpan.setAttribute('id', 'favs-count');
            favsCountSpan.innerText = favCount;
            favsFilterBtn.append(favsCountSpan);
        
        }
        } else{
            //remove existing span if it is there 
            let favsCountSpanExisting = document.querySelector('#favs-count');
            if(favsCountSpanExisting){
                favsCountSpanExisting.remove();
            }
        }

    }
}

//Export --------------------------------
export { User }