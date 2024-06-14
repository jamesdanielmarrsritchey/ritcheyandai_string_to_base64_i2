function stringToBase64(str) {
    // Define the base64 characters
    const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    // Convert the input string to a binary string
    let binaryString = '';
    for (let i = 0; i < str.length; i++) {
        let binaryChar = str.charCodeAt(i).toString(2);
        // Pad the binaryChar to make sure it's 8 bits long
        while (binaryChar.length < 8) {
            binaryChar = '0' + binaryChar;
        }
        binaryString += binaryChar;
    }

    // Process the binary string 24 bits (3 bytes) at a time
    let base64Result = '';
    for (let i = 0; i < binaryString.length; i += 24) {
        // Extract 24 bits chunk from the binary string
        const chunk = binaryString.substring(i, i + 24);

        // Process each 6 bits to get one base64 character
        for (let j = 0; j < 24; j += 6) {
            const sixBitChunk = chunk.substring(j, j + 6);
            if (sixBitChunk.length === 0) {
                break;
            }
            // Convert the sixBitChunk to an integer
            const index = parseInt(sixBitChunk, 2);
            // If the chunk is less than 6 bits, pad it with zeros
            if (sixBitChunk.length < 6) {
                base64Result += '=';
            } else {
                base64Result += base64Chars[index];
            }
        }
    }

    // Handling padding for base64 encoding
    const paddingLength = (3 - (str.length % 3)) % 3;
    for (let i = 0; i < paddingLength; i++) {
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