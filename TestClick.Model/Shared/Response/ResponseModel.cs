using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestClick.Model.Shared.Response
{
    public class GridResponse<T>
    {
        public List<T>? Data { get; set; }
        public int TotalCount { get; set; }
    }

    public class ResponseModel<T>
    {
        public ResponseStatus Type { get; set; }
        public required string Message { get; set; }
        public T? Data { get; set; }
    }

    public enum ResponseStatus
    {
        [Description("Request complete")]
        Success,
        [Description("Request failed")]
        Failure,
        [Description("Resource not found")]
        NotFound,
        [Description("Validation error occurred")]
        ValidationError,
        [Description("User is not authorized")]
        Unauthorized,
        [Description("User does not have permission")]
        Forbidden,
        [Description("An unexpected error occurred")]
        ServerError
    }
}
