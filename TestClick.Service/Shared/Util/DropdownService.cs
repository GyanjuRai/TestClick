

using Newtonsoft.Json;
using TestClick.DataAccess;
using TestClick.Interface.Shared.Util;
using TestClick.Model.Shared.Response;

namespace TestClick.Service.Shared.Util
{
    public class DropdownService: IDropdownService
    {
        private readonly IDataAccessService _db;

        public DropdownService(IDataAccessService db)
        {
            _db = db;
        }
        public async Task<List<MvDropdown>?> PlayerDropdownSel()
        {
            try
            {
                var result = await _db.RetrievalProcedure("util.SpPlayerDropdownSel");
                return JsonConvert.DeserializeObject<List<MvDropdown>>(result);
            }
            catch
            {
                throw;
            }
        }
    }
}
