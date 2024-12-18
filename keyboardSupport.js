window.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
    const key = e.key;
    if(findButton(key)){
        e.preventDefault();
        findButton(key).click();
    }
    else{
        console.log("pressed "+findButton(key));
    }
}

function findButton(key){
    let content;
    switch(key){
        case "Enter":
        case "=":
            content="=";
            break;
        case "Backspace":
            content="DEL";
            break;
        case "Escape":
            content="AC";
            break;
        case '*':
            content="×";
            break;    
        case '/':
            content="÷";
            break;
        default:
            content = key;
            break;
    }
    return Array.from(document.querySelectorAll("button")).find(btn => btn.textContent.trim() === content);
}
