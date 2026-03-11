
namespace TestClick.Model.Shared.Param
{
    public class SelParamModel<T>
    {
        public T? Filter { get; set; }
        public int? Offset { get; set; }
        public int? PageSize { get; set; }
        public string? SortBy { get; set; }
        public string? SortOrder { get; set; }
    }
}
