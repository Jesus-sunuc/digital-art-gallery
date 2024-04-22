// var builder = WebApplication.CreateBuilder(args);
// builder.Services.AddCors();

// var app = builder.Build();
// app.UseCors(
//     options => 
//         options
//         .AllowAnyHeader()
//         .AllowAnyOrigin()
//         .AllowAnyMethod()
// );


// string uploadsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

// if (!Directory.Exists(uploadsDirectory))
// {
//     Directory.CreateDirectory(uploadsDirectory);
// }

// app.MapPost("/imageUpload", async (HttpRequest request) => {
//     Console.WriteLine(request.Form.Files.Count);

//     foreach (var file in request.Form.Files)
//     {
//         if (file.Length > 0)
//         {
//             string safeFileName = Path.GetFileName(file.FileName);
//             string finalPath = Path.Combine(uploadsDirectory, safeFileName);

//             await using var fileStream = new FileStream(finalPath, FileMode.Create);
//             await file.CopyToAsync(fileStream);
//         }
//     }
// });

// app.Run();


using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.IO;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

// Add CORS services
builder.Services.AddCors();

var app = builder.Build();

// Use CORS
app.UseCors(options => 
    options.AllowAnyHeader()
           .AllowAnyOrigin()
           .AllowAnyMethod());

// Serve static files and enable directory browsing
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "uploads")),
    RequestPath = "/uploads"
});

string uploadsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

// Ensure the uploads directory exists
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
    return files.Select(file => Path.GetFileName(file)); // Return only file names
});

app.Run();
