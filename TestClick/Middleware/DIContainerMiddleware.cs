using TestClick.DataAccess;
using TestClick.Interface.Application.Screen;
using TestClick.Interface.Shared.Util;
using TestClick.Service.Application.Screen;
using TestClick.Service.Shared.Util;

namespace TestClick.API.Middleware
{
    public static class DIContainerMiddleware
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection service)
        {
            return service
                .AddScoped<IDataAccessService, DataAccessService>()
                .AddTransient<IScreenService, ScreenService>()
                .AddTransient<IDropdownService, DropdownService>();
        } 
    }
}
