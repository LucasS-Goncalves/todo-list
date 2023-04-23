let listOfItems = [];

const form = document.getElementById('form');
const retriveListOfItems = localStorage.getItem('tasks');

if(retriveListOfItems) {
    listOfItems = JSON.parse(retriveListOfItems);
    showItems();
}else {
    listOfItems = [];
}

form.addEventListener('submit', (e) => {

    e.preventDefault();
    addItemsToListOfItems();
    showItems();
})

function addItemsToListOfItems() {

    const taskInput = document.getElementById('task');
    const timeInput = document.getElementById('time');
    const itemExists = listOfItems.some(item => item.task === taskInput.value && item.time === timeInput.value);

    if(itemExists) {
        alert('This task has already been added to the ToDo List');      
    } else {
        listOfItems.push({
            task: taskInput.value,
            time: timeInput.value,
            isChecked: false
        })
    }

    taskInput.value = '';
    timeInput.value = '';
    taskInput.focus(); 
}

function showItems() {

    const ul = document.getElementById('list');
    ul.innerHTML = '';

    listOfItems.forEach((item, index) => {

        if(item.isChecked){
            
            ul.innerHTML += `
                <li class="checked_item" data-value="${index}">${item.task}<strong>${item.time}</strong>
                    <button class="delete_button">🗑️</button>
                    <label class="label_checkbox" for="checkbox">\u2705</label>
                    <input type="checkbox" id="checkbox"></input>
                </li>`;
                    
        } else {

            ul.innerHTML += `
                <li class="item" data-value="${index}">${item.task}<strong>${item.time}</strong>
                    <button class="delete_button">🗑️</button>
                    <label class="label_checkbox" for="checkbox">\u2705</label>
                    <input type="checkbox" id="checkbox"></input>
                </li>`;

        }
    });

    const labels = document.querySelectorAll('.label_checkbox');   
    labels.forEach(label=> {

        label.addEventListener('click', (e) => {

            const indexCheckedItem = e.target.parentElement.getAttribute('data-value');

            if(listOfItems[indexCheckedItem].isChecked) {
                listOfItems[indexCheckedItem].isChecked = false;

            } else {
                listOfItems[indexCheckedItem].isChecked = true
            }

            showItems();
        })
    });

    const deleteButtons = document.querySelectorAll('.delete_button');
    deleteButtons.forEach(button => {   

        button.addEventListener('click', (e) => {

            const itemToDelete = e.target.parentElement.getAttribute('data-value');
            listOfItems.splice(itemToDelete, 1);
            showItems();
        })
    });

    localStorage.setItem('tasks', JSON.stringify(listOfItems))

}


