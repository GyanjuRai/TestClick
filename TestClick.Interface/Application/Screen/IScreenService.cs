using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
