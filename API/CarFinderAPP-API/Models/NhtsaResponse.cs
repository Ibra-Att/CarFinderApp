namespace CarFinderAPP_API.Models
{
    public class NhtsaResponse <T>
    {
        public int Count { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? SearchCriteria { get; set; }
        public List<T> Results { get; set; } = [];

    }
}
