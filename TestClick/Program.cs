using TestClick.DataAccess;
using TestClick.Interface.Application.Screen;
using TestClick.Interface.Shared.Util;
using TestClick.Service.Application.Screen;
using TestClick.Service.Shared.Util;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddScoped<IDataAccessService, DataAccessService>()
    .AddTransient<IScreenService, ScreenService>()
    .AddTransient<IDropdownService, DropdownService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
