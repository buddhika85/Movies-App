using MoviesAPI;
using MoviesAPI.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.git 
builder.Services.AddScoped<ConsoleLoggerFilter>();      // scoped as it needs be accessed by multiple threads for multiple requests
builder.Services.AddScoped<UtcDateTimeFilter>();

builder.Services.AddControllers(options =>
{
    // for all controllers
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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // using swagger
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseOutputCache();                   // use outputcache middleware


app.UseHttpsRedirection();

app.UseAuthorization();                 // auth should be done before mapping controllers middleware

app.MapControllers();

app.Run();
