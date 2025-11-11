using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TvShop.Models;
using TvShop.Services;

namespace TvShop.Controllers
{
    public class CartController : Controller
    {
        private readonly ICartService _cartService;
        private readonly TVShopContext _context;

        public CartController(ICartService cartService, TVShopContext context)
        {
            _cartService = cartService;
            _context = context;
        }

        // GET: Cart
        public IActionResult Index()
        {
            var cart = _cartService.GetCart(HttpContext);
            return View(cart.Items);
        }

        // POST: Cart/Add
        [HttpPost]
        public async Task<IActionResult> Add(int id) 
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return Json(new { success = false, message = "Товар не найден" });
            }

            _cartService.AddToCart(HttpContext, product, 1);
            var cart = _cartService.GetCart(HttpContext);

            return Json(new { 
                success = true, 
                message = "Товар добавлен в корзину!",
                cartCount = cart.GetTotalItems(),
                cartTotal = cart.GetTotal()
            });
        }

        // POST: Cart/Remove
        [HttpPost]
        public IActionResult Remove(int id) 
        {
            _cartService.RemoveFromCart(HttpContext, id);
            var cart = _cartService.GetCart(HttpContext);

            return Json(new { 
                success = true,
                cartCount = cart.GetTotalItems(),
                cartTotal = cart.GetTotal()
            });
        }

        // POST: Cart/UpdateQuantity
        [HttpPost]
        public IActionResult UpdateQuantity(int id, int quantity) 
        {
            _cartService.UpdateQuantity(HttpContext, id, quantity);
            var cart = _cartService.GetCart(HttpContext);

            return Json(new { 
                success = true,
                cartCount = cart.GetTotalItems(),
                cartTotal = cart.GetTotal()
            });
        }

        // POST: Cart/Clear
        [HttpPost]
        public IActionResult Clear()
        {
            _cartService.ClearCart(HttpContext);
            return Json(new { success = true, message = "Корзина очищена" });
        }
        
        // POST: Cart/Checkout
        [HttpPost]
        public IActionResult Checkout()
        {
            var cart = _cartService.GetCart(HttpContext);
            if (!cart.Items.Any())
            {
                return Json(new { success = false, message = "Корзина пуста" });
            }

            var total = cart.GetTotal();
            _cartService.ClearCart(HttpContext);

            return Json(new { 
                success = true, 
                message = $"✅ Заказ успешно оформлен!\nСумма: {total:N0} ₽\nСпасибо за покупку!"
            });
        }
    }
}