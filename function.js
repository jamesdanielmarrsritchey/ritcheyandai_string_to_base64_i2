function stringToBase64(str) {
    const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let binaryString = '';
    for (let i = 0; i < str.length; i++) {
        let binaryChar = str.charCodeAt(i).toString(2).padStart(8, '0');
        binaryString += binaryChar;
    }

    let base64Result = '';
    for (let i = 0; i < binaryString.length; i += 24) {
        const chunk = binaryString.substring(i, i + 24);
        for (let j = 0; j < 24; j += 6) {
            const sixBitChunk = chunk.substring(j, j + 6);
            if (sixBitChunk) {
                const index = parseInt(sixBitChunk.padEnd(6, '0'), 2);
                base64Result += base64Chars[index];
            }
        }
    }

    while (base64Result.length % 4 !== 0) {
        base64Result += '=';
    }

    return base64Result;
}

/*
Example:

window.onload = function() {
    const element = document.querySelector("#myElement");
    if (element) {
        const result = stringToBase64(element.innerHTML);
        element.innerHTML = result;
    }
};

OnClick Example: 

document.querySelector("#myButton").addEventListener("click", function() {
    const element = document.querySelector("#myElement");
    if (element) {
        const result = stringToBase64(element.innerHTML);
        element.innerHTML = result;
    }
});

*/