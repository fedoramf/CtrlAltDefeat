using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CtrlAltDefeat.Controllers
{
    [Route("Results")]
    public class ResultsController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index(string fileName = "Empty")
        {
            var color = TempData["bgColor"];
            ViewData["Filename"] = fileName;
            ViewData["bgColor"] = TempData["bgColor"];
            ViewData["textColor"] = TempData["textColor"];
            ViewData["website"] = TempData["website"];
            ViewData["businessName"] = TempData["businessName"];
            ViewData["address"] = TempData["address"];
            return View();
        }

        [HttpPost]
        [Route("SendMetaData")]
        public IActionResult GetMetaData([FromBody]MetaData jObject)
        {
            var obj = jObject.BgColor;
            TempData["bgColor"] = jObject.BgColor;
            TempData["textColor"] = jObject.TextColor;
            TempData["website"] = jObject.Website;
            TempData["businessName"] = jObject.BusinessName;
            TempData["address"] = jObject.Address;
            return RedirectToAction("Index", "Results", new { filename = "instaic1_3af7.PNG" });
        }

        public class MetaData
        {
            public string BgColor { get; set; }
            public string TextColor { get; set; }
            public string Website { get; set; }
            public string BusinessName { get; set; }
            public string Address { get; set; }
        }
    }
}
