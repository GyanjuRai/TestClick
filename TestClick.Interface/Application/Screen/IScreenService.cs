using TestClick.Model.Application.Screen;
using TestClick.Model.Shared.Param;
using TestClick.Model.Shared.Response;

namespace TestClick.Interface.Application.Screen
{
    public interface IScreenService
    {
        /// <summary>
        /// Retrieves a list of screens based on the provided filter parameters. 
        /// The method returns a grid response containing the list of screens that match the specified criteria. 
        /// If no screens are found, it returns null.
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<GridResponse<MScreen>?> ScreenSel(SelParamModel<MScreenFilter> param);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<List<MScreen?>?> ScreenIns(MScreenIns param);
    }
}
