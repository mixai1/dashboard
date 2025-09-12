using Microsoft.Extensions.FileProviders;

namespace Dashboard.WebAPI.Extensions;

public static class WebApplicationExtension
{
    public static WebApplication UseBrowserSpa(this WebApplication app)
    {
        var browserPath = Path.Combine(app.Environment.WebRootPath, "browser");
        using var fileProvider = new PhysicalFileProvider(browserPath);
        app.UseDefaultFiles(new DefaultFilesOptions
        {
            FileProvider = fileProvider,
            DefaultFileNames = { "index.html" }
        });

        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = fileProvider
        });

        app.MapFallbackToFile("index.html", new StaticFileOptions
        {
            FileProvider = fileProvider
        });

        return app;
    }
}
