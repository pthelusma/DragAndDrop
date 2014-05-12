using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DragAndDrop.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            string contentPath = "~/Content/upload/";
            string something = Server.MapPath(contentPath);

            string[] fileNames = Directory.GetFiles(something)
                .Select(path => contentPath + Path.GetFileName(path))
                .ToArray();

            return View(fileNames);
        }

        [HttpPost]
        public ActionResult UploadImage(HttpPostedFileBase file)
        {
            UploadFile(file);
            return Content(file.FileName);
        }

        public void UploadFile(HttpPostedFileBase file)
        {
            System.IO.File.WriteAllBytes(Server.MapPath("~/Content/upload/" + file.FileName), ReadData(file.InputStream));
        }

        private byte[] ReadData(Stream stream)
        {
            var buffer = new byte[16 * 1024];
 
            using (var ms = new MemoryStream())
            {
                int read;

                while ((read = stream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
 
                return ms.ToArray();
            }
        }

    }
}
