

namespace TestClick.DataAccess
{
    public interface IDataAccessService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="storedProcedure"></param>
        /// <param name="json"></param>
        /// <returns></returns>
        Task<string> ActionProcedure(string storedProcedure, string json);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="storedProcedure"></param>
        /// <param name="json"></param>
        /// <returns></returns>
        Task<string> RetrievalProcedure(string storedProcedure, string json);
    }
}
