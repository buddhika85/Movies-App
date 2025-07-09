using FluentValidation;
using MoviesAPI;
using MoviesAPI.Entities;
using MoviesAPI.Filters;
using MoviesAPI.Mddleware;
using MoviesAPI.Validations.FluentValidations;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container 
builder.Services.AddScoped<CustomExceptionMiddelware>();
builder.Services.AddScoped<ConsoleLoggerFilter>();      // scoped as it needs be accessed by multiple threads for multiple requests
builder.Services.AddScoped<LoggerFilter>();
builder.Services.AddScoped<UtcDateTimeFilter>();

builder.Services.AddTransient<IValidator<Genre>, GenreFluentValidator>();

builder.Services.AddSingleton<IInMemoryRepository, InMemoryRepository>();


// Seri Log Logger
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console()
    .WriteTo.File("Logs/moviesApiLog-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();
builder.Services.AddSerilog();

// Globals filters for all action methods
builder.Services.AddControllers(options =>
{
    // filters for all controllers
    options.Filters.Add<ConsoleLoggerFilter>();         // adding custom filters to execute before and after end point execution 
});

// add fluent validators 
builder.Services.AddValidatorsFromAssemblyContaining<GenreFluentValidator>();   // FluentValidation will automatically run before the action method and populate ModelState with errors.


// using swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// caching
builder.Services.AddOutputCache(options =>
{
    options.DefaultExpirationTimeSpan = TimeSpan.FromSeconds(15);
});





var app = builder.Build();                  // RUNS ONCE PER APPLICATION CYCLE - This compiles everything into a runnable app

#region MIDDLEWARE_PIPELINE

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.UseDeveloperExceptionPage();            // using built in developer exception page - stack trace, error code scection, route values, headers, cookies

    app.UseMiddleware<CustomExceptionMiddelware>(); // custom middleware to tackle exceptions

    // using swagger
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // redirect to production exception page
    app.UseExceptionHandler("/error");
}


app.UseOutputCache();                   // use outputcache middleware


app.UseHttpsRedirection();

app.UseAuthorization();                 // auth should be done before mapping controllers middleware

app.MapControllers();                   // HIGH LEVEL MIDDLEWARE - Route registration and Filter pipeline execution, and then End Point Execution 

#endregion #region MIDDLEWARE_PIPELINE

app.Run();                              // RUNS ONCE PER APPLICATION CYCLE - Hosts application on Kestral and it starts listening for HTTP Requests, DOES NOT EXECUTE PER REQUEST
