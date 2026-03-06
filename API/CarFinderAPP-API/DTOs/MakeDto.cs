using System.Text.Json.Serialization;

namespace CarFinderAPP_API.DTOs
{
    public class MakeDto
    {
        [JsonPropertyName("Make_ID")]
        public int MakeId { get; set; }
        [JsonPropertyName("Make_Name")]
        public string MakeName { get; set; } = string.Empty;

    }
}
