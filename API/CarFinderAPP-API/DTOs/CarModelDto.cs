using System.Text.Json.Serialization;

namespace CarFinderAPP_API.DTOs
{
    public class CarModelDto
    {
        [JsonPropertyName("Model_ID")]
        public int ModelId { get; set; }
        [JsonPropertyName("Model_Name")]
        public string ModelName { get; set; } = string.Empty;

    }
}
