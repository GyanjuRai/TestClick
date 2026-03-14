using Microsoft.AspNetCore.Mvc;
using TestClick.API.Controllers.Shared.Base;
using TestClick.Interface.Shared.Util;
using TestClick.Model.Shared.Response;

namespace TestClick.API.Controllers.Shared.Util
{
    public class DropdownController : BaseController
    {
        private readonly IDropdownService _ds;
        public DropdownController(IDropdownService ds)
        {
            _ds = ds;
        }

        [HttpGet]
        [Route("Player")]
        public async Task<IActionResult> GetDropdown()
        {
            try
            {
                var result = await _ds.PlayerDropdownSel();
                return Ok(APIResponse.Success(result));
            }
            catch(Exception ex)
            {
                return BadRequest(APIResponse.Failure(ex.Message));
            }
        }
    }
}
