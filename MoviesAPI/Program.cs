using MoviesAPI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

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
