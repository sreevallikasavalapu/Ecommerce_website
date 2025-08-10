using Microsoft.AspNetCore.Mvc;

namespace ecommerce_appln.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private static List<User> users = new List<User>();

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (users.Any(u => u.Username == user.Username))
                return BadRequest("Username already exists.");

            users.Add(user);
            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User login)
        {
            var user = users.FirstOrDefault(u => u.Username == login.Username && u.Password == login.Password);
            if (user == null)
                return Unauthorized("Invalid username or password.");

            return Ok(new { message = "Login successful", username = user.Username });
        }
    }

    public class User
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
