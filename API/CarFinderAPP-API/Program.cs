using CarFinderAPP_API.Interfaces;
using CarFinderAPP_API.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

builder.Services.AddHttpClient("NhtsaClient", client =>
{
    client.BaseAddress = new Uri(
        builder.Configuration["NhtsaAPI:BaseUrl"] ?? "");
    client.Timeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddScoped<INhtsaService, NhtsaService>();


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
