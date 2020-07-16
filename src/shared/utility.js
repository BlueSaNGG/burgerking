export const updateObejct=(oldObject,updatedProperties)=>{
    return {
        ...oldObject,
        ...updatedProperties
    };
};


export const checkValidity=(value, rules)=>{
    let isValid= true;
    if(rules.required&&isValid){
        isValid= value.trim()!=='';   //.trim()可以可以防止空格
    }

    if(rules.minLength&&isValid){
        isValid= value.length>=rules.minLength;
    }

    if(rules.maxLength&&isValid){
        isValid= value.length<=rules.maxLength;
    };

    return isValid;
};