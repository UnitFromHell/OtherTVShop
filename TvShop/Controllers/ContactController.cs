using Microsoft.AspNetCore.Mvc;

namespace TvShop.Controllers
{
    public class ContactController : Controller
    {
        // GET: Contact
        public IActionResult Index()
        {
            return View();
        }
    }
}