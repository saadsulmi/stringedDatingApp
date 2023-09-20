export const sendSuccessResponse=(res, data)=>{
    return res.status(200).json(data);
  }

export const sendErrorResponse=(res, error, statusCode = 500)=>{
    return res.status(statusCode).json(error);
  }