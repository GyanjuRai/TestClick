using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestClick.Model.Shared.Response
{
    public static class APIResponse
    {
        public static ResponseModel<T> Success<T>(T Data, string message = "Success")
        {
            return new ResponseModel<T> 
            { 
                Type = ResponseStatus.Success, 
                Message = message, 
                Data = Data 
            };
        }

        public static ResponseModel<object> Failure(string message = "Failure")
        {
            return new ResponseModel<object> 
            { 
                Type = ResponseStatus.Failure, 
                Message = message, 
                Data = null 
            };
        }
    }
}
