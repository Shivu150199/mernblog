export const errorHandler=(status,message)=>{
const error=new Error(message)
error.statusCode=status
error.message=message
console.log("error console",error)
return error
}