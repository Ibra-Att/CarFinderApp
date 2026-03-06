using CarFinderAPP_API.DTOs;
using CarFinderAPP_API.Models;

namespace CarFinderAPP_API.Interfaces
{
    public interface INhtsaService
    {
        Task<NhtsaResponse<MakeDto>> GetAllMakesAsync();
        Task<NhtsaResponse<VehicleTypeDto>> GetVehicleTypesByMakeIdAsync(int makeId);
        Task<NhtsaResponse<CarModelDto>> GetModelsByMakeIdAndYearAsync(int makeId, int year);

    }
}
