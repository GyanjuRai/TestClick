using TestClick.DataAccess;
using TestClick.Interface.Application.Screen;
using TestClick.Model.Application.Screen;
using TestClick.Model.Shared.Param;
using TestClick.Model.Shared.Response;
using Newtonsoft.Json;

namespace TestClick.Service.Application.Screen
{
    public class ScreenService : IScreenService
    {
        private readonly IDataAccessService _db;

        public ScreenService(IDataAccessService db)
        {
            _db = db;
        }

        public async Task<GridResponse<MScreen>?> ScreenSel(SelParamModel<MScreenFilter> param)
        {
            try
            {
                var result = await _db.RetrievalProcedure("Inv.SpScreenSel", JsonConvert.SerializeObject(param));
                return JsonConvert.DeserializeObject<GridResponse<MScreen>>(result);
            }
            catch
            {
                throw;
            }

        }

        public async Task<List<MScreen?>?> ScreenIns(MScreenIns param)
        {
            try
            {
                var result = await _db.ActionProcedure("Inv.SpScreenIns", JsonConvert.SerializeObject(param));
                return JsonConvert.DeserializeObject<List<MScreen?>>(result);
            }
            catch
            {
                throw;
            }
        }
    }
}
