using E_commerceSprint1_MVC;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;
using E_commerceSprint1_MVC.Models;
using Microsoft.AspNetCore.Identity;
using E_commerceSprint1_MVC.Models.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});


string connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<E_commerceSprint1_MVCDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));


builder.Services.AddCors();

builder.Services.AddMvc();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        // Tell the authenticaion scheme "how/where" to validate the token + secret
        //   options.Authority = "https://dev-r742ze820hyqp132.us.auth0.com/";
        //   options.Audience = "https://localhost:44401/";
        options.SaveToken = true;
        options.TokenValidationParameters = JwtToken.GetValidationParameters(builder.Configuration);
    });

builder.Services.AddAuthorization(options =>
{

    // Add "Name of Policy", and the Lambda returns a definition
    options.AddPolicy("Admin", policy =>
            policy.RequireClaim("permissions", "create", "update", "delete", "read")
                .RequireRole("Admin"));
});

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
.AddEntityFrameworkStores<E_commerceSprint1_MVCDBContext>()
.AddRoleManager<RoleManager<IdentityRole>>()
.AddUserManager<UserManager<ApplicationUser>>()
.AddSignInManager<SignInManager<ApplicationUser>>()
.AddDefaultTokenProviders();
builder.Services.AddScoped<JwtToken>();

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
