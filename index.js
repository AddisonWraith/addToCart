
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-d302e-default-rtdb.firebaseio.com/"
}

const shoppinglistEl = document.getElementById("shopping-list")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")



const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shopping-list")

function clearInput() {
return " "
}

function clearShoppingListEl(){
    shoppinglistEl.innerHTML = ""
}
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value  
    push(shoppingListInDB, inputValue)
    inputFieldEl.value = clearInput()


})

onValue(shoppingListInDB, function(snapshot){
   
    if (snapshot.exists() === true){
   
        let snapshotArr = []
      
        snapshotArr = Object.entries(snapshot.val())

   
   
        clearShoppingListEl()

        for (let i = 0; i < snapshotArr.length; i++){
            let currentItem = snapshotArr[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            toList(currentItem)
         }
    }
    else {
        shoppinglistEl.innerHTML = "No items here.. yet"
    }
    }
)

function toList(item){
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue= item[1]
    let newEl = document.createElement("li")
  
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database,`shopping-list/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppinglistEl.append(newEl)
}

