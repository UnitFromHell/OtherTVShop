using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TvShop.Models;

public class AccountController : Controller
{
    private readonly TVShopContext _context;

    public AccountController(TVShopContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Register() => View();

    [HttpPost]
    public IActionResult Register(string email, string password, string confirmPassword)
    {
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            TempData["ErrorMessage"] = "Email и пароль обязательны";
            return View();
        }

        if (password != confirmPassword)
        {
            TempData["ErrorMessage"] = "Пароли не совпадают";
            return View();
        }

        if (_context.Users.Any(u => u.Email == email))
        {
            TempData["ErrorMessage"] = "Пользователь с таким Email уже существует";
            return View();
        }

        if (!IsPasswordStrong(password))
        {
            TempData["ErrorMessage"] = "Пароль должен содержать минимум 6 символов, " +
                "одну цифру [0-9], один символ верхнего регистра [A-Z], один символ нижнего регистра [a-z] и один специальный символ [!@#$%^&*]";
            return View();
        }

        var user = new User
        {
            Email = email,
            PasswordHash = ComputeSha256(password)
        };

        _context.Users.Add(user);
        _context.SaveChanges();

        TempData["SuccessMessage"] = "Регистрация успешна!";
        return RedirectToAction("Login");
    }

    [HttpGet]
    public IActionResult Login() => View();

    [HttpPost]
    public async Task<IActionResult> Login(string email, string password)
    {
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            TempData["ErrorMessage"] = "Email и пароль обязательны";
            return View();
        }

        var passwordHash = ComputeSha256(password);
        var user = _context.Users.FirstOrDefault(u => u.Email == email && u.PasswordHash == passwordHash);

        if (user == null)
        {
            TempData["ErrorMessage"] = "Неверный email или пароль";
            return View();
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Email),
            new Claim("UserId", user.Id.ToString())
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

        return RedirectToAction("Index", "Home");
    }

    [HttpPost]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Index", "Home");
    }

    private string ComputeSha256(string input)
    {
        using var sha = SHA256.Create();
        var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(input));
        return Convert.ToBase64String(bytes);
    }

    private bool IsPasswordStrong(string password)
{
    if (password.Length < 6)
        return false;

    bool hasUpper = false, hasLower = false, hasDigit = false, hasSpecial = false;

    foreach (var c in password)
    {
        if (char.IsUpper(c)) hasUpper = true;
        else if (char.IsLower(c)) hasLower = true;
        else if (char.IsDigit(c)) hasDigit = true;
        else if (!char.IsLetterOrDigit(c)) hasSpecial = true;
    }

    return hasUpper && hasLower && hasDigit && hasSpecial;
}
}
