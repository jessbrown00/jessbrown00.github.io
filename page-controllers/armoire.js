//Imports----------------------------
import { App } from './../components/App.js';
import { Item } from './../components/Item.js';
import { Notify } from '../components/Notify.js';
import { User } from '../components/User.js';
import { Modal } from '../components/Modal.js';

//Page Controller-------------------
function armoirePageController(){
    // create data variable and define data to go into template 
    let data = {
        Tops: '5ecd0ed1e401ce15076456ff',
        Bottoms: '5ecd0ee893c347a12606ee86',
        Dresses: '5ecd0ef093c347a12606ee87',
       

    }
    // define paramaters 
    App.loadPage('Armoire', 'template-page-armoire', data, () => {
        //get favs button 
        const favsFilterBtn = document.querySelector("#filter-btn-favourites");
        //click event listener
        favsFilterBtn.addEventListener('click', ()=> {
            if(User.favItems.length>0){
                itemsListDiv.innerHTML = '';
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
                itemsListDiv.innerHTML = '<p id="no-favs-yet-message"> No favourites yet </p>';
            }
        })
        
        
        //get divs #items-list
        const itemsListDiv = document.querySelector('#items-list');

        //get div #items-list-categories
        const itemsListCategoriesDiv = document.querySelector("#items-list-categories");

        //render categories buttons
        Item.getCategories()
        .then(categories => {
            //loop through categories and create button for each
            categories.forEach(category => {
                //create button 
                let categoryBtn = document.createElement('button');
                categoryBtn.className = ' filter-btn';
                categoryBtn.innerText = category.name;
                itemsListCategoriesDiv.append(categoryBtn);

                //click event listeners
                categoryBtn.addEventListener('click',() => {
                    let allCategoryBtns = document.querySelectorAll('.filter-btn');
                    allCategoryBtns.forEach(btn => {
                        btn.classList.remove('is-active');
                });
                    //make current button active 
                    categoryBtn.classList.add('is-active')
                    //clear current items
                    itemsListDiv.innerHTML = '';
                    //backend API call - get items from category
                    Item.getInCategory(category._id)
                    .then(items => {
                        // loop throuhg items array and create item object for each using method from item component 
                        items.forEach(item => {
                            // run createItemObj which creates itemObj then returns it to itemObj variable
                            const itemObj = Item.createItemObj(item);
                            // put itemObj.el into items-list div
                            itemsListDiv.appendChild(itemObj.el);
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        Notify.show("Problem getting clothes!")
                    });
                })
                })
        })
        .catch(err => {
            console.log(err);
        });

        //create a "all categories" button
        let allCategoriesBtn = document.createElement('button');
        allCategoriesBtn.className = 'filter-btn';
        allCategoriesBtn.innerText = "All";
        itemsListCategoriesDiv.appendChild(allCategoriesBtn);
        //click event 
        allCategoriesBtn.addEventListener('click', () => {
            //remove .is-active from all other buttons
            let allCategoryBtns = document.querySelectorAll('.filter-btn');
            allCategoryBtns.forEach(btn => {
                btn.classList.remove('is-active');
            });
            //make current button active 
            allCategoriesBtn.classList.add('is-active')
            //clear current items
            itemsListDiv.innerHTML = '';
            getAllItems();
        });

        //run Item.get as callback function to get all clothes items 
        //wrap in function so we can call it when allCategoriesBtn is clicked
        function getAllItems(){
            Item.get()
            .then(items => {
                 // loop through clothes items array and create itemObj for each item using Item.createItemObj
                 items.forEach(item => {
                    // run createItemObj which creates itemObj then returns it to itemObj variable
                    const itemObj = Item.createItemObj(item);
                    // put itemObj.el into items-list div 
                    itemsListDiv.appendChild(itemObj.el);
                 });
            })
            //if not successful log error and notify user with notification 
            .catch(err => {
                console.log(err);
                Notify.show('Problem loading Clothes');
            });
        }
        getAllItems();

        //get add item button
        const addItemBtn = document.querySelector(".add-item-btn")
        //click event listener
        addItemBtn.addEventListener('click', () => {
        //get add itemListDiv and clear inner HTML
        const itemsListDiv = document.querySelector("#items-list");
        itemsListDiv.innerHTML = '';
        //find add-item form and appen to itemsListDiv
        const addItemForm = document.querySelector("#add-item-form");
        itemsListDiv.append(addItemForm);
        addItemForm.classList.remove("hidden");
        const addItemFormAppended = document.querySelector("#items-list #add-item-form");
        addItemFormAppended.addEventListener('submit', (e) => {
            e.preventDefault();
            //e stores the submit event so we can call it 
            //prevent form from default behaviour (reload page)
            //get form data and store as object
            let formData = new FormData(addItemFormAppended);
            //loop through each formData entry and add to an object
            let formDataObj = {};
            for(var field of formData.entries()){
                formDataObj[field[0]] = field[1];
            }
            //create book
            Item.create(formDataObj);
        })
        
        
        //change button to cancel and reload page on second click
        addItemBtn.innerText = 'CANCEL';
        addItemBtn.classList.add("cancel");
        addItemBtn.addEventListener('click', () => {
            location.reload();
        })            
    
    })
       
    });
}

//Export---------------------
export{ armoirePageController }