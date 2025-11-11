using System.Text.Json;
using TvShop.Models;

namespace TvShop.Services
{
    public interface ICartService
    {
        Cart GetCart(HttpContext context);
        void SaveCart(HttpContext context, Cart cart);
        void AddToCart(HttpContext context, Product product, int quantity = 1);
        void RemoveFromCart(HttpContext context, int productId);
        void UpdateQuantity(HttpContext context, int productId, int quantity);
        void ClearCart(HttpContext context);
    }

    public class CartService : ICartService
    {
        private const string CartSessionKey = "Cart";

        public Cart GetCart(HttpContext context)
        {
            var cartJson = context.Session.GetString(CartSessionKey);
            if (string.IsNullOrEmpty(cartJson))
            {
                return new Cart();
            }

            try
            {
                return JsonSerializer.Deserialize<Cart>(cartJson) ?? new Cart();
            }
            catch
            {
                return new Cart();
            }
        }

        public void SaveCart(HttpContext context, Cart cart)
        {
            var cartJson = JsonSerializer.Serialize(cart);
            context.Session.SetString(CartSessionKey, cartJson);
        }

        public void AddToCart(HttpContext context, Product product, int quantity = 1)
        {
            var cart = GetCart(context);
            cart.AddItem(product, quantity);
            SaveCart(context, cart);
        }

        public void RemoveFromCart(HttpContext context, int productId)
        {
            var cart = GetCart(context);
            cart.RemoveItem(productId);
            SaveCart(context, cart);
        }

        public void UpdateQuantity(HttpContext context, int productId, int quantity)
        {
            var cart = GetCart(context);
            cart.UpdateQuantity(productId, quantity);
            SaveCart(context, cart);
        }

        public void ClearCart(HttpContext context)
        {
            context.Session.Remove(CartSessionKey);
        }
    }
}