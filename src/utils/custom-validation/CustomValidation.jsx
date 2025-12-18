

export const StringValidationCheck = {
  validate: async (v) => {
    return await new Promise((resolve) =>
      setTimeout(() => {
        const dangerousPatterns = [
          /[`<>]/, // quotes, angle brackets, backtick
          /<script>/i, // script tags
          /<\/?.+?>/, // any HTML tag
          /on\w+\s*=/i, // inline JS events like onclick=
        ];

        for (let pattern of dangerousPatterns) {
          if (pattern.test(v)) {
            return resolve("Invalid or dangerous characters detected");
          }
        }

        resolve(true); // passed all checks
      }, 100)
    );
  },
};

export const DangerousContentCheck = {
  validate: async (v) => {
    return await new Promise((resolve) =>
      setTimeout(() => {
        const dangerousPatterns = [
          /[`'"<>]/, // quotes, angle brackets, backtick
          /<script>/i, // script tags
          /<\/?.+?>/, // any HTML tag
          /on\w+\s*=/i, // inline JS events like onclick=
        ];

        for (let pattern of dangerousPatterns) {
          if (pattern.test(v)) {
            return resolve("Invalid or dangerous characters detected");
          }
        }

        resolve(true); // passed all checks
        return true;
      }, 100)
    );
  },
};

export const NumberValidationCheck={
  validate:async(v)=>{
    return await new Promise(
      (resolve)=>{
        setTimeout(async()=>{
            const num = parseFloat(v);

              if (isNaN(num)) {
                return resolve("Must be a valid number");
              }

              if (num < 1) {
                return resolve("Must be at least 1");
              }

              if (num > 10000) {
                return resolve("Cannot exceed 10000");
              }

              if (!Number.isInteger(num) || await DangerousContentCheck.validate(v) !== true) {
                return resolve("Only whole numbers allowed");
              }

              resolve(true); //  Passed all checks
        },100)
      }
    )
  }
}

// return multiple error together 
export const PasswordValidationCheck={
   validate:{
      islength:async(v)=>{ 
        return await new Promise((resolve)=>setTimeout(()=>{
            if(v.length<6){
              resolve("At least 6 character need");
            }else{
              resolve(true);
            }
        },100))
      },
   isuppercase:async(v)=>{
        return await new Promise((resolve)=>setTimeout(()=>{
            if(!/[A-Z]/.test(v)){
              resolve("At least one uppercase letter need");
            }else{
              resolve(true);
            }
        },100))
      },
      isspacial:async(v)=>{
        return await new Promise((resolve)=>setTimeout(()=>{
            if(!/[!@#$%^&*(),.?:{}|]/.test(v)){
              resolve("At least one special character need");
            }else{
              resolve(true);
            }
        },100))
      },
      isdigit:async(v)=>{
        return await new Promise((resolve)=>setTimeout(()=>{
            if(!/[\d]/.test(v)){
              resolve("At least one digit need");
            }else{
              resolve(true);
            }
        },100))
      },
      isdangerous:async(v)=>{
        return await new Promise((resolve)=>setTimeout(async()=>{
            if(await DangerousContentCheck.validate(v) !== true){
              resolve("Dangerous content detected");
            }else{
              resolve(true);
            }
        },100))
      } 
   }
}

export const EmailValidationCheck = {
  validate: async (v) => {
    return await new Promise((resolve) =>
      setTimeout(async() => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(v) || await DangerousContentCheck.validate(v) !== true) {
          return resolve("Invalid email format");
        }
        resolve(true);
      }, 100)
    );
  },
};
export const UrlValidationCheck = {
  validate: async (v) => {
    return await new Promise((resolve) =>
      setTimeout(async() => {
        try {
          new URL(v);
          if (await DangerousContentCheck.validate(v) !== true) {
            return resolve("Dangerous content detected");
          }
          resolve(true);
        } catch (e) {
          resolve("Invalid URL format");
        }
      }, 100)
    );
  },
};

export const PhoneValidationCheck = {
  validate: async (v) => {
    return await new Promise((resolve) =>
      setTimeout(async() => {
        const phonePattern = /^\+?[1-9]\d{1,14}$/; // E.164 format
        if (!phonePattern.test(v) || await DangerousContentCheck.validate(v) !== true) {
          return resolve("Invalid phone number format");
        }
        resolve(true);
      }, 100)
    );
  },
};
export const DateValidationCheck = {
  validate: async (v) => {
    return await new Promise((resolve) =>
      setTimeout(async() => {
        const date = new Date(v);
        if (isNaN(date.getTime()) || await DangerousContentCheck.validate(v) !== true) {
          return resolve("Invalid date format");
        }
        resolve(true);
      }, 100)
    );
  },
};
export const TimeValidationCheck = {
  validate: async (v) => {
    return await new Promise((resolve) =>
      setTimeout(async() => {
        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:mm format
        if (!timePattern.test(v) || await DangerousContentCheck.validate(v) !== true) {
          return resolve("Invalid time format");
        }
        resolve(true);
      }, 100)
    );
  },
};
export const ColorValidationCheck = {
  validate: async (v) => {
    return await new Promise((resolve) =>
      setTimeout(async() => {
        const colorPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/; // Hex color format
        if (!colorPattern.test(v) || await DangerousContentCheck.validate(v) !== true) {
          return resolve("Invalid color format");
        }
        resolve(true);
      }, 100)
    );
  },
};

export const FilCheck={
  validate:async(v)=>{
    return await new Promise((resolve)=>{
      setTimeout(async()=>{
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/webp'];
        if(v.length===0){
          return resolve("File is required");
        }
        const file=v[0];
        if(!allowedTypes.includes(file.type)){
          return resolve("Only JPG, PNG, jpg, webp and GIF files are allowed");
        } 
        if(file.size>5*1024*1024){
          return resolve("File size must be less than 10MB");
        } 
        resolve(true);
      },100)
    })
  }
}

