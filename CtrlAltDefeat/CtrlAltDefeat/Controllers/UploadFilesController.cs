using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CtrlAltDefeat.Controllers
{
    public class UploadFilesController : Controller
    {
        private readonly IHostingEnvironment hostingEnvironment;

        public UploadFilesController(IHostingEnvironment environment)
        {
            hostingEnvironment = environment;
        }

        [HttpPost("UploadFiles")]
        public IActionResult Post(List<IFormFile> files)
        {

            long size = files.Sum(f => f.Length);

            // full path to file in temp location
            var filePath = Path.GetTempFileName();
            var uniqueFileName = String.Empty;

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    var uploads = Path.Combine(hostingEnvironment.WebRootPath, "images");
                    uniqueFileName = GetUniqueFileName(formFile.FileName);
                    var fullPath = Path.Combine(uploads, uniqueFileName);
                    formFile.CopyTo(new FileStream(fullPath, FileMode.Create));
                }
            }

            // process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return RedirectToAction("Index", "Results", new { filename = uniqueFileName});
        }

        private string GetUniqueFileName(string fileName)
        {
            fileName = Path.GetFileName(fileName);
            return Path.GetFileNameWithoutExtension(fileName)
                      + "_"
                      + System.Guid.NewGuid().ToString().Substring(0, 4)
                      + Path.GetExtension(fileName);
        }
        
        // GET: /<controller>/
        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
