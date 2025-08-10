using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ecommerce_appln.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ecommerce_applnContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ecommerce_applnContext") ?? throw new InvalidOperationException("Connection string 'ecommerce_applnContext' not found.")));

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

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

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
