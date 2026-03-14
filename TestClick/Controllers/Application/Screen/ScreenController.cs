using Microsoft.AspNetCore.Mvc;
using TestClick.API.Controllers.Shared.Base;
using TestClick.Interface.Application.Screen;
using TestClick.Model.Application.Screen;
using TestClick.Model.Shared.Param;
using TestClick.Model.Shared.Response;

namespace TestClick.API.Controllers.Application.Screen
{
    public class ScreenController : BaseController
    {
        private readonly IScreenService _service;

        public ScreenController(IScreenService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetScreen([FromQuery] SelParamModel<MScreenFilter> param)
        {
            try
            {
                GridResponse<MScreen>? result = await _service.ScreenSel(param);

                if (result != null)
                {
                    return Ok(APIResponse.Success(result));
                }

                return NotFound(APIResponse.Success(result, message: "No screen found"));
            }
            catch (Exception ex)
            {
                return BadRequest(APIResponse.Failure(ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> ScreenIns([FromBody] MScreenIns param)
        {
            try
            {
                List<MScreen?>? result = await _service.ScreenIns(param);
                if (result != null)
                {
                    return Ok(APIResponse.Success(result));
                }

                return NotFound(APIResponse.Success(result, message: "Screen insertion failed"));
            }
            catch (Exception ex)
            {
                return BadRequest(APIResponse.Failure(ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> ScreenUpd([FromBody] MScreenUpd param)
        {
            try
            {
                List<MScreen?>? result = await _service.ScreenUpd(param);
                if (result != null && result.Any())
                {
                    return Ok(APIResponse.Success(result));
                }

                return NotFound(APIResponse.Success(result, message: "Screen update failed"));
            }
            catch (Exception ex)
            {
                return BadRequest(APIResponse.Failure(ex.Message));
            }
        }

        [HttpDelete]
        public async Task<IActionResult> ScreenDel([FromBody] MScreenDel param)
        {
            try
            {
                MScreen? result = await _service.ScreenDel(param);
                if (result != null && result.Id > 0)
                {
                    return Ok(APIResponse.Success(result));
                }
                return NotFound(APIResponse.Success<MScreen?>(null, "Screen not found"));
            }
            catch (Exception ex)
            {
                return BadRequest(APIResponse.Failure(ex.Message));
            }
        }

        [HttpPost]
        [Route("bulk")]
        public async Task<IActionResult> Screen([FromBody] List<MScreenTsk> param)
        {
            try
            {
                List<MScreen?>? result = await _service.ScreenTsk(param);
                if (result != null)
                {
                    return Ok(APIResponse.Success(result));
                }
                return NotFound(APIResponse.Success(result, message: "Screen task operation failed"));
            }
            catch (Exception ex)
            {
                return BadRequest(APIResponse.Failure(ex.Message));
            }
        }
    }
}
