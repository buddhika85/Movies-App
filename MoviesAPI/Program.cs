using MoviesAPI;
using MoviesAPI.Filters;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container 
builder.Services.AddScoped<ConsoleLoggerFilter>();      // scoped as it needs be accessed by multiple threads for multiple requests
builder.Services.AddScoped<LoggerFilter>();
builder.Services.AddScoped<UtcDateTimeFilter>();

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
    //options.Filters.Add<ConsoleLoggerFilter>();         // adding custom filters to execute before and after end point execution 
});

// using swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// caching
builder.Services.AddOutputCache(options =>
{
    options.DefaultExpirationTimeSpan = TimeSpan.FromSeconds(15);
});

builder.Services.AddSingleton<InMemoryRepository>();



var app = builder.Build();                  // RUNS ONCE PER APPLICATION CYCLE - This compiles everything into a runnable app



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();            // using built in developer exception page - stack trace, error code scection, route values, headers, cookies
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

app.MapControllers();                   // HIGH LEVEL MIDDLEWARE - Route registration and End Point Execution 

app.Run();                              // RUNS ONCE PER APPLICATION CYCLE - Hosts application on Kestral and it starts listening for HTTP Requests, DOES NOT EXECUTE PER REQUEST
