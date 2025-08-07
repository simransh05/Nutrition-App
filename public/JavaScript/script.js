let addText = document.querySelector('.addText');
let inputBox = document.querySelector('.inputBox');

addText.addEventListener('click', (ev) => {
    ev.preventDefault();
    let li = document.createElement('li');
    let input = document.createElement('input');

    input.type = 'text';
    input.placeholder = 'Enter Item';
    input.name = 'name'; // same name so that req.body.name is an array
    input.required = true;

    li.appendChild(input);
    inputBox.appendChild(li);
});