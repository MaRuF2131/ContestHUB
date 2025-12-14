

// built-in-validation

export const userNameValidation={
    required:"User name is required",
    minLength:{
        value:3,
        message:"minimum 3 character need"
    },
    maxLength:{
        value:30,
        message:"maximum 30 character accept"
    },
    pattern:{
        value:/^[a-zA-Z. ]+$/,
        message:"Only lowercase uppercase letters and dot(.) allowed"
    }
}

export const numberValidation={
    required:'number is required',
    min:{
        value:1,
        message:'must greater than 0'
    },
    max:{
      value:3000,
      message:"max number 3000"
    },
    setValueAs:(v)=> parseFloat(v,10),

}
