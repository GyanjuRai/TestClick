

using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace TestClick.DataAccess
{
    public class DataAccessService : IDataAccessService
    {
        private readonly string? _connectionString;

        public DataAccessService(IConfiguration configuration)
        {
            _connectionString = configuration.GetSection("DbSetting")["ConnectionString:Prod"];
        }

        public async Task<string> ActionProcedure(string storedProcedure, string json)
        {
            try
            {
                using SqlConnection con = new(_connectionString);
                await con.OpenAsync();
                DynamicParameters parameters = new();
                parameters.Add("@Json", json, DbType.String, direction: ParameterDirection.InputOutput);
                await con.ExecuteAsync(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
                return parameters.Get<string>("@Json") ?? "{}";
            }
            catch
            {
                throw;
            }
        }

        public async Task<string> RetrievalProcedure(string storedProcedure, string json)
        {
            try
            {
                using SqlConnection con = new(_connectionString);
                await con.OpenAsync();
                DynamicParameters parameters = new();
                parameters.Add("@Json", json, DbType.String);
                string? result = await con.QueryFirstOrDefaultAsync<string>(storedProcedure, param: parameters, commandType: CommandType.StoredProcedure);
                return result ?? "{}";
            }
            catch
            {
                throw;
            }
        }

        public async Task<string> RetrievalProcedure(string storedProcedure)
        {
            try
            {
                using SqlConnection con = new(_connectionString);
                await con.OpenAsync();
                string? result = await con.QueryFirstOrDefaultAsync<string>(storedProcedure, commandType: CommandType.StoredProcedure);
                return result ?? "{}";
            }
            catch
            {
                throw;
            }
        }
    }
}
