using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestClick.Model.Application.Screen
{
    public class MScreen
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public required string ScreenName { get; set; }
        public required string Specification { get; set; }
        public required string Country { get; set; }
        public required string City { get; set; }
        public int PlacementType { get; set; }
        public required string Placement { get; set; }
        public int AvgViewer { get; set; }
        public decimal basePrice { get; set; }
        public int Status { get; set; }
        public int Type { get; set; }
        public int CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public record MScreenFilter
    {
        public List<int>? StatusIdList { get; set; }
        public List<int>? PlacementTypeIdList { get; set; }
        public List<int>? TypeIdList { get; set; }
    }
}
