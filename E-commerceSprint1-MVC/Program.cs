using E_commerceSprint1_MVC;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using Microsoft.SqlServer;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
string connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<E_commerceSprint1_MVCDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));


builder.Services.AddCors();

builder.Services.AddControllers();
  //  .AddJsonOptions(options =>
   // {
      //  options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
  // });

var app = builder.Build();
app.UseCors(o => o.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
