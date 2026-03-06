using CarFinderAPP_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarFinderAPP_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
    private readonly INhtsaService _nhtsaService;

    public VehiclesController(INhtsaService nhtsaService)
    {
        _nhtsaService = nhtsaService;
    }

    [HttpGet("makes")]
    public async Task<IActionResult> GetAllMakes()
    {
        var result = await _nhtsaService.GetAllMakesAsync();
        return Ok(result);
    }

    [HttpGet("makes/{makeId}/vehicle-types")]
    public async Task<IActionResult> GetVehicleTypes(int makeId)
    {
        var result = await _nhtsaService.GetVehicleTypesByMakeIdAsync(makeId);
        return Ok(result);
    }

    [HttpGet("makes/{makeId}/models")]
    public async Task<IActionResult> GetModels(
        int makeId,
        [FromQuery] int year)
    {
        var result = await _nhtsaService.GetModelsByMakeIdAndYearAsync(makeId, year);
        return Ok(result);
    }
    }
}
