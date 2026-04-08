using TestClick.API.Const;
using TestClick.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCoreServices();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
    options.AddPolicy(AppConst.AppPolicy, policy =>
    {
        policy.WithOrigins(AppConst.WebUrl)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
    });
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ===========================================
// Not a good practice to use in production,
// but for testing purposes, we can use it.
// ===========================================
if (app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(AppConst.AppPolicy);

app.MapControllers();

app.Run();
