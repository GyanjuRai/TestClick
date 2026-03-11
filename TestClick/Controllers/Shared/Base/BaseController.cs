using Microsoft.AspNetCore.Mvc;

namespace TestClick.API.Controllers.Shared.Base
{
    [Produces("application/json")]
    [ApiController]
    [Route("/[controller]/[action]")]
    public class BaseController: ControllerBase
    {
    }
}
