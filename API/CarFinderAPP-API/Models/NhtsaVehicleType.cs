using System.Text.Json.Serialization;

namespace CarFinderAPP_API.Models
{
    public class NhtsaVehicleType
    {
        public int VehicleTypeId { get; set; }
        public string VehicleTypeName { get; set; } = string.Empty;

    }
}
