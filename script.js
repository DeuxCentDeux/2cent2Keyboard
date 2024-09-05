document.addEventListener("DOMContentLoaded", function() {
    const screen = document.getElementById('screen');
    let isSpecialKeys = false;
    let isCapsLock = false;
    let isInitialized = false;

    const primaryKeys = {
        row1: ['²', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'é', 'è', 'Backspace'],
        row2: ['Switch', 'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'ê', 'ë', 'Enter'],
        row3: ['⬆️', 'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'à', 'ç', 'Ù'],
        row4: [',', '.', '?', '!', 'W', 'X', 'C', 'V', 'B', 'N', 'ô', 'ï', 'ù', 'û', 'œ'],
        row5: [' ']
    };

    const secondaryKeys = {
        row1: ['~', '&', '+', '"', '\'', '(', '-', '_', 'ç', 'à', ')', '=', '?', 'Backspace'],
        row2: ['Switch', '!', '@', '#', '$', '%', '^', '*', '(', ')', '_', '¬', '/', 'Enter'],
        row3: ['<', '>', '€', '£', '`', '{', '}', '[', ']', '|', '\\', ':', ';', '"', "'"],
        row4: ['¥', '•', '±', '§', '¶', '¿', '©', '®', '™', 'µ', '÷', '×', '¤', '¢', '¶'],
        row5: [' ']
    };

    const rows = ['row1', 'row2', 'row3', 'row4', 'row5'];

    function updateScreen(content) {
        if (!isInitialized) {
            content = content.trim();
            isInitialized = true;
        }
        screen.innerHTML = content + '<span class="cursor"></span>';
    }

    function updateSwitchKey() {
        const switchKey = document.querySelector('.key.switch');
        switchKey.textContent = isSpecialKeys ? '☻' : '☺';
    }

    function updateCapsLockKey() {
        const capsLockKey = document.querySelector('.key.capslock');
        capsLockKey.textContent = `Caps Lock ${isCapsLock ? 'ON' : 'OFF'}`;
    }

    function renderKeyboard(keys) {
        rows.forEach((row, rowIndex) => {
            const rowElement = document.getElementById(`row${rowIndex + 1}`);
            rowElement.innerHTML = '';
            keys[row].forEach(key => {
                const keyElement = document.createElement('div');
                keyElement.classList.add('key');
                if (key === 'Backspace') {
                    keyElement.classList.add('backspace');
                    keyElement.textContent = '←';
                    keyElement.addEventListener('click', () => {
                        const content = screen.textContent.slice(0, -1);
                        updateScreen(content);
                    });
                } else if (key === 'Switch') {
                    keyElement.classList.add('switch');
                    keyElement.textContent = isSpecialKeys ? '☻' : '☺';
                    keyElement.addEventListener('click', () => {
                        isSpecialKeys = !isSpecialKeys;
                        updateSwitchKey();
                        renderKeyboard(isSpecialKeys ? secondaryKeys : primaryKeys);
                    });
                } else if (key === '⬆️') {
                    keyElement.classList.add('capslock');
                    keyElement.textContent = `${isCapsLock ? '■' : '▣'}`;
                    keyElement.addEventListener('click', () => {
                        isCapsLock = !isCapsLock;
                        updateCapsLockKey();
                        renderKeyboard(primaryKeys);
                    });
                } else if (key === 'Enter') {
                    keyElement.classList.add('enter');
                    keyElement.textContent = 'Enter';
                    keyElement.addEventListener('click', () => {
                        const content = screen.textContent + '\n';
                        updateScreen(content);
                    });
                } else if (key === ' ') {
                    keyElement.classList.add('space');
                    keyElement.textContent = 'Space';
                    keyElement.addEventListener('click', () => {
                        const content = screen.textContent + ' ';
                        updateScreen(content);
                    });
                } else {
                    keyElement.textContent = isCapsLock ? key.toUpperCase() : key.toLowerCase();
                    keyElement.addEventListener('click', () => {
                        const content = screen.textContent + keyElement.textContent;
                        updateScreen(content);
                    });
                }
                rowElement.appendChild(keyElement);
            });
        });
    }

    renderKeyboard(primaryKeys);
});
