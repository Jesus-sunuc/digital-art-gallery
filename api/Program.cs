var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(
    options => 
        options
        .AllowAnyHeader()
        .AllowAnyOrigin()
        .AllowAnyMethod()
);


string uploadsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

if (!Directory.Exists(uploadsDirectory))
{
    Directory.CreateDirectory(uploadsDirectory);
}

app.MapPost("/imageUpload", async (HttpRequest request) => {
    Console.WriteLine(request.Form.Files.Count);

    foreach (var file in request.Form.Files)
    {
        if (file.Length > 0)
        {
            string safeFileName = Path.GetFileName(file.FileName);
            string finalPath = Path.Combine(uploadsDirectory, safeFileName);

            await using var fileStream = new FileStream(finalPath, FileMode.Create);
            await file.CopyToAsync(fileStream);
        }
    }
});

app.Run();