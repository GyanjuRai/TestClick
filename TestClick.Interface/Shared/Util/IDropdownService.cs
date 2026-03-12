


using TestClick.Model.Shared.Response;

namespace TestClick.Interface.Shared.Util
{
    public interface IDropdownService
    {
        Task<List<MvDropdown>?> PlayerDropdownSel();

    }
}
