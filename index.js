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
let browser = document.getElementById("browserlist")
let opt = document.querySelectorAll("option");
let tabl=[(case1.checked)?1:0,(case2.checked)?1:0,(case3.checked)?1:0,(case4.checked)?1:0];
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
copy.addEventListener('click',()=>{
    copy.textContent = "copied!"
    bar.select();
    document.execCommand('copy');
    bar.blur();
    
})
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
    console.log(password.length);
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
    console.log(strength);
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

let optInput = document.getElementById("Opt");
optInput.addEventListener('input', () => {
    console.log("Option selected:", optInput.value);
    // Add your logic here for what should happen when an option is selected
});
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
