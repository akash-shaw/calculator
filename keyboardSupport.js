window.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
    const key = e.key;
    const operators = ['+', '-', '*', '/', '%'];

    if (!isNaN(key)) {
        // If the key is a number
        simulateButtonPress(key);
    } else if (operators.includes(key)) {
        // If the key is an operator
        switch(key){
            case '*':
                simulateButtonPress("×");
                break;    
            case '/':
                simulateButtonPress("÷");
                break;
            default:
                simulateButtonPress(key);
                break;
        }
    } else if (key === "Enter" || key === "=") {
        simulateButtonPress("=");
    } else if (key === "Backspace") {
        simulateButtonPress("DEL");
    } else if (key === "Escape") {
        simulateButtonPress("AC");
    } else if (key === ".") {
        simulateButtonPress(".");
    }
}

// Simulate button press
function simulateButtonPress(content) {
    const button = Array.from(document.querySelectorAll("button")).find(btn => btn.textContent.trim() === content);
    if (button) {
        button.click();
    }
}
