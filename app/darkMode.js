const rootElement = document.documentElement;
const darkModeCheckBox = document.querySelector('#btn');

window.onload = function () {
    getThemeFromLocalStorage();
}

const lightTheme = {
    '--background_color': 'rgb(245, 245, 245)',
    '--text_color': '#000000',
    '--text_input_background': '#ffffff',
    '--place_holder_color': '#696969',
    '--add_input_background': '#ececec',
    '--add_input_background_hover': '#cecccc',
    '--box_shadow': '#9c9393',
    '--border': '#000000',
    '--button_hover': '#cecdcd',
    '--edit_button': '#000000',
    '--item_color': 'linear-gradient(#dbdbdb, #ececec)',
    '--item_strong_color': 'linear-gradient(#d6d6d6, #bbbbbb)',
    '--label_icon': 'url("https://cdn-icons-png.flaticon.com/512/46/46181.png?w=740&t=st=1678305581~exp=1678306181~hmac=f4fe102ffc733a492708d90a6f38c3cfe44b915bd9c654c1b027955b26de0d20")',
}

const darkTheme = {
    '--background_color': '#0f0f0f',
    '--text_color': '#ffffff',
    '--text_input_background': '#2c2c2c',
    '--place_holder_color': '#e4e4e4',
    '--add_input_background': '#141414',
    '--add_input_background_hover': '#0a0a0a',
    '--box_shadow': '#000000',
    '--border': '#000000',
    '--button_hover': '#141313',
    '--edit_button': '#ffffff',
    '--item_color': 'linear-gradient(#1f1f1f, #2e2e2e)',
    '--item_strong_color': 'linear-gradient(#2b2b2b, #444444)',
    '--label_icon': 'url("https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/light-bulb-icon.png")',
}


darkModeCheckBox.addEventListener('change', function() {
    const isChecked = darkModeCheckBox.checked;
    
    changeTheme(isChecked ? darkTheme : lightTheme)
})

function changeTheme (theme) { 
    for(let [property, value] of Object.entries(theme)) {
        changeProperty(property, value);
    }
    saveThemeToLocalStorage(theme)
}

function changeProperty (property, value) {
    rootElement.style.setProperty(property, value);
}

function saveThemeToLocalStorage (theme) {
    localStorage.setItem('theme', JSON.stringify(theme))
}

function getThemeFromLocalStorage () {
    const theme = JSON.parse(localStorage.getItem('theme'));
    if(isThemeEqual(lightTheme, darkTheme)) {
        darkModeCheckBox.checked = true;
    }
    changeTheme(theme)
}

function isThemeEqual (firstTheme, secondTheme) {
    for (let prop in firstTheme) {
        if(firstTheme[prop] != secondTheme[prop] ) return false;
    };

    return true;
}