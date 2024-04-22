using Microsoft.Extensions.FileProviders;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
var app = builder.Build();

app.UseCors(options => 
    options.AllowAnyHeader()
           .AllowAnyOrigin()
           .AllowAnyMethod());

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "uploads")),
    RequestPath = "/uploads"
});

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

app.MapGet("/listImages", () => {
    var files = Directory.GetFiles(uploadsDirectory);
    return files.Select(file => Path.GetFileName(file));
});

app.Run();
