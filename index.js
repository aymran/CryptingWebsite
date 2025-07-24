let bar = document.getElementById("mainBar");
let val = document.getElementsByClassName("size")[0];
let case1 = document.getElementById("Upcase");
let case2 = document.getElementById("Lowcase");
let case3 = document.getElementById("Smbl");
let case4 = document.getElementById("Num");
let ref = document.getElementsByClassName("refresh")[0];
let copy = document.getElementsByClassName("copy")[0];
let secure = document.getElementsByClassName("secure")[0];
let Size = document.getElementsByClassName("length")[0];
let plus = document.getElementsByClassName("plus")[0];
let minus = document.getElementsByClassName("minus")[0];

let enbtn = document.querySelector("#encrypt-btn");
let inputErea = document.querySelector("#text-to-encrypt");
let outputErea = document.querySelector("#text-of-encrypt");
let inputErea1 = document.querySelector("#text-to-decrypt");
let outputErea1 = document.querySelector("#text-of-decrypt");
let swap = document.querySelector(".next");
let debtn = document.querySelector("#decrypt-btn");
let Decry = document.querySelector(".Decrypt");
let Encry = document.querySelector(".Encrypt");
let cut1 = document.querySelectorAll(".cut")[0];
let cut2 = document.querySelectorAll(".cut")[1];
let tabl=[(case1.checked)?1:0,(case2.checked)?1:0,(case3.checked)?1:0,(case4.checked)?1:0];
bar.innerHTML=GeneratePassWord(val.value);
//   Encrypting and Decrypting variables //
const code = 100;

// Compute d (modular inverse of e mod r)

// --------------------------------------//
Size.textContent = val.value;
cut1.addEventListener('click',()=>{
    cut1.textContent = "✔"
    cut1.style.backgroundColor="#70e000";
    setTimeout(() => {
        cut1.textContent = "copy";
        cut1.style.backgroundColor="#0F172A"
    }, 2000);
    outputErea.select();
    document.execCommand('copy');
    outputErea.blur();
    
})
cut2.addEventListener('click',()=>{
    cut2.textContent = "✔"
    cut2.style.backgroundColor="#70e000";
    setTimeout(() => {
        cut2.textContent = "copy";
        cut2.style.backgroundColor="#0F172A"
    }, 2000);
    outputErea1.select();
    document.execCommand('copy');
    outputErea1.blur();
    
})
copy.addEventListener('mouseover',()=>{
    setTimeout(()=>{
    copy.textContent = "copy";
    },300) 
})
copy.addEventListener('mouseout',()=>{
    setTimeout(()=>{
    copy.textContent = "";
    },300) 
})
// copy.addEventListener('click',()=>{
//     copy.textContent = "copied!"
//     bar.select();
//     document.execCommand('copy');
//     bar.blur();

    
// })

// Just replace your copy event listener with this:

copy.addEventListener('click', () => {
    // Get only the text, ignore HTML tags
    const passwordText = bar.textContent;
    
    // Create temporary input to copy from
    const tempInput = document.createElement('input');
    tempInput.value = passwordText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    copy.textContent = "copied!";
    setTimeout(() => {
        copy.textContent = "copy";
    }, 300);
});
case1.addEventListener('click',()=>{
    ref.click();
})
case2.addEventListener('click',()=>{
    ref.click();
})
case3.addEventListener('click',()=>{
    ref.click();
})
case4.addEventListener('click',()=>{
    ref.click();
})
function Random(a, b) {
    // Use Math.floor instead of Math.round for even distribution
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function getPasswordStrength(password) {
    if (!password || password.length<8) return 0;
    
    // Deduct points for common passwords
    const commonPasswords = ["password", "123456", "qwerty", "letmein", "admin"];
    if (commonPasswords.includes(password.toLowerCase())) {
        return 0; // Weak
    }
    
    let strength = 0;
    const length = password.length;
    
    // Length points
     
    if (length >= 8 && length < 12) {
        strength = 1; // Fair
    } else if (length >= 12 && length < 16) {
        strength = 2; // Strong
    } else {
        strength = 3; // Very Strong (length >= 16)
    }
    
    // Character diversity
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    
    const typeCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    
    // Adjust strength based on character types
    if (typeCount === 1 && strength > 0) strength -= 1; // Downgrade if only one type
    if (typeCount >= 3 && strength < 3) strength += 1; // Upgrade if multiple types
    
    // Ensure strength is between 0-3
    strength = Math.max(0, Math.min(3, strength));
    
    return strength;
}

// Returns 0-100 (0=weakest, 100=strongest)
function GeneratePassWord(len) {
    // Define character ranges (ASCII codes)
    tabl=[(case1.checked)?1:0,(case2.checked)?1:0,(case3.checked)?1:0,(case4.checked)?1:0];
    let ranges = [
        [65, 90],  // Uppercase A-Z
        [97, 122] , // Lowercase a-z
        [33, 47],  // Special chars ! to /
        [48, 57]  // Numbers 0-9
    ];
    let Rang=[];
    for(j = 0;j<tabl.length;j++){
        if(tabl[j]) Rang.push(ranges[j]);
    }
    let password = "";
    let pw;
    // Add missing variable declaration
    let strpass = "";
    for (let i = 0; i < len; i++) {
        // Select a random range
        let rangeIndex = Random(0, Rang.length - 1);
        switch(Rang[rangeIndex][0]){
            case 65: pw =String.fromCharCode(Random(Rang[rangeIndex][0], Rang[rangeIndex][1]))
                break;
            case 97: pw =String.fromCharCode(Random(Rang[rangeIndex][0], Rang[rangeIndex][1]))
                break;
            case 33: pw = '<span class="spc">'+String.fromCharCode(Random(Rang[rangeIndex][0], Rang[rangeIndex][1]))+'</span>'
                
                break;
            case 48: pw = '<span class="number">'+String.fromCharCode(Random(Rang[rangeIndex][0], Rang[rangeIndex][1]))+'</span>'
                break;
        }
        strpass+=String.fromCharCode(Random(Rang[rangeIndex][0], Rang[rangeIndex][1]));
        // Get a random character from the selected range
        password += pw;
    }
    let strength = getPasswordStrength(strpass);
    
    if (strength==0 ) {
        secure.textContent = 'weak'
        secure.classList.add('weak');
        secure.classList.remove('medium','strong')
    } else if (strength == 1) {
        secure.textContent = 'medium'
        secure.classList.add( 'medium');
        secure.classList.remove('weak','strong')
    } else {
        secure.textContent = 'strong'
        secure.classList.add('strong');
        secure.classList.remove('medium','weak')
    }
    return password;
}
function EncryptingText(text, shiftKey) {
    let encrypted = "";
    for (let i = 0; i < text.length; i++) {
        // Shift the character code and wrap around 127
        let shifted = ((text.charCodeAt(i) - 32 + shiftKey) % 95) + 32;
        encrypted += String.fromCharCode(shifted);
    }
    return encrypted;
}

function DecryptingText(encryptedText, shiftKey) {
    let decrypted = "";
    for (let i = 0; i < encryptedText.length; i++) {
        // Reverse the shift and wrap around 127
        let shifted = ((encryptedText.charCodeAt(i) - 32 - shiftKey) % 95) 
         shifted = (shifted + 95) % 95; // Force positive (0-94)
        shifted += 32;
        decrypted += String.fromCharCode(shifted);
    }
    return decrypted;
}

plus.addEventListener('click',()=>{
    val.value++;
    Size.textContent = val.value;
    ref.click();

})
minus.addEventListener('click',()=>{
    val.value--;
    Size.textContent = val.value;
    ref.click();
})
ref.addEventListener('click',()=>{
    bar.innerHTML=GeneratePassWord(val.value);
})
val.addEventListener('change',()=>{
    bar.innerHTML=GeneratePassWord(val.value);
    Size.textContent = val.value;
});
enbtn.addEventListener('click',()=>{
    outputErea.value = EncryptingText(inputErea.value,code);
})
debtn.addEventListener('click',()=>{
    outputErea1.value = DecryptingText(inputErea1.value,code);
})
swap.addEventListener('click',()=>{
    Decry.classList.toggle("hide");
    Encry.classList.toggle("hide");
    outputErea1.value = "";
    outputErea.value = "";
    inputErea.value = "";
    inputErea1.value = "";
})
