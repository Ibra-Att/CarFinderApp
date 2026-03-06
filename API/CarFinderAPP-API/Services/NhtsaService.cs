using CarFinderAPP_API.DTOs;
using CarFinderAPP_API.Interfaces;
using CarFinderAPP_API.Models;

namespace CarFinderAPP_API.Services
{
    public class NhtsaService : INhtsaService
    {
        private readonly HttpClient _httpClient;

        public NhtsaService(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("NhtsaClient");
        }

        public async Task<NhtsaResponse<MakeDto>> GetAllMakesAsync()
        {
            var response = await _httpClient
                .GetFromJsonAsync<NhtsaResponse<NhtsaMake>>("getallmakes?format=json");

            return new NhtsaResponse<MakeDto>
            {
                Count = response?.Count ?? 0,
                Message = response?.Message ?? "",
                SearchCriteria = response?.SearchCriteria,
                Results = response?.Results.Select(x => new MakeDto
                {
                    MakeId = x.Make_ID,
                    MakeName = x.Make_Name
                }).ToList() ?? []
            };
        }

        public async Task<NhtsaResponse<VehicleTypeDto>> GetVehicleTypesByMakeIdAsync(int makeId)
        {
            var response = await _httpClient
                .GetFromJsonAsync<NhtsaResponse<NhtsaVehicleType>>(
                    $"GetVehicleTypesForMakeId/{makeId}?format=json");

            return new NhtsaResponse<VehicleTypeDto>
            {
                Count = response?.Count ?? 0,
                Message = response?.Message ?? "",
                SearchCriteria = response?.SearchCriteria,
                Results = response?.Results.Select(x => new VehicleTypeDto
                {
                    VehicleTypeId = x.VehicleTypeId,
                    VehicleTypeName = x.VehicleTypeName
                }).ToList() ?? []
            };
        }

        public async Task<NhtsaResponse<CarModelDto>> GetModelsByMakeIdAndYearAsync(int makeId, int year)
        {
            var response = await _httpClient
                .GetFromJsonAsync<NhtsaResponse<NhtsaModel>>(
                    $"GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json");

            return new NhtsaResponse<CarModelDto>
            {
                Count = response?.Count ?? 0,
                Message = response?.Message ?? "",
                SearchCriteria = response?.SearchCriteria,
                Results = response?.Results.Select(x => new CarModelDto
                {
                    ModelId = x.Model_ID,
                    ModelName = x.Model_Name
                }).ToList() ?? []
            };
        }
    }
}
