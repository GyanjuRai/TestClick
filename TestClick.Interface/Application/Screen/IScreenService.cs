using TestClick.Model.Application.Screen;
using TestClick.Model.Shared.Param;
using TestClick.Model.Shared.Response;

namespace TestClick.Interface.Application.Screen
{
    public interface IScreenService
    {
        Task<GridResponse<MScreen>?> ScreenSel(SelParamModel<MScreenFilter> param);
    }
}
