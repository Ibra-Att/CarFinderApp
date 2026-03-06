using System.Text.Json.Serialization;

namespace CarFinderAPP_API.DTOs
{
    public class VehicleTypeDto
    {
        [JsonPropertyName("VehicleTypeId")]
        public int VehicleTypeId { get; set; }
        [JsonPropertyName("VehicleTypeName")]
        public string VehicleTypeName { get; set; } = string.Empty;

    }
}
