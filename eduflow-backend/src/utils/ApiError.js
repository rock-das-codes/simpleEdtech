class ApiError extends Error{
    constructor(statusCode,message,stack="",errors=[]){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.error = errors
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}