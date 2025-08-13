

export const errorHandler=(err,req,res,next)=>{
    console.error('Caught by error handler :',err.stack);
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal server error'
    const errorCode=err.code||'UNKNOWN_ERROR'

    res.status(statusCode).json({
        success:false,
        message:message,
        code:errorCode,
        stack:process.env.NODE_ENV==='development'?err.stack:undefined
    })
}