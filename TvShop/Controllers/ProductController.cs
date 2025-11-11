using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TvShop.Models;

namespace TvShop.Controllers
{
    public class ProductController : Controller
    {
        private readonly TVShopContext _context;

        public ProductController(TVShopContext context)
        {
            _context = context;
        }

        // GET: Product
        public async Task<IActionResult> Index()
        {
            var products = await _context.Products.ToListAsync();
            return View(products);
        }

        // GET: Product/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var product = await _context.Products
                .FirstOrDefaultAsync(m => m.ID == id);
            if (product == null)
            {
                return NotFound();
            }

            return View(product);
        }
    }
}