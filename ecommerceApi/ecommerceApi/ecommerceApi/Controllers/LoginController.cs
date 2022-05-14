using ecommerceApi.Data;
using ecommerceApi.Helpers;
using ecommerceApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ecommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserDbContext _context;
        private readonly IConfiguration _config;
        public LoginController(UserDbContext userDbContext,IConfiguration config)
        {
            _context = userDbContext;
            _config = config;
        }
        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var userdetails = _context.UserDetails.AsQueryable();
            return Ok(userdetails);
        }
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] UserDetails userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            else
            {
                userObj.Password=EncDscPassword.EncryptPassword(userObj.Password);
                _context.UserDetails.Add(userObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Messege = "User Added Successfully"

                });
            }

        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserDetails userobj)
        {
            
            if (userobj == null)
            {
                return BadRequest();
            }
            else
            {
                var user = _context.UserDetails.Where(a => a.Email == userobj.Email).FirstOrDefault();
                if (user != null && EncDscPassword.DecryptPassword(user.Password)==userobj.Password)
                {
                    var token = GenerateToken(user.Email);
                    return Ok(new
                    {
                        StatusCode = 200,
                        message = "Logged In Successfully "+user.FullName,
                        type = user.UserType,
                        JwtToken =token
                    });
                }
                else
                {
                    return Ok(new
                    {
                        StatusCode = 404,
                        message = "User Not Found"
                    });
                }
            }
        }
        private string GenerateToken(string username)
        {
           var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:key"]));
            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, username),
                new Claim("Xceedance","saikat")
            };
            var token = new JwtSecurityToken(issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audicence"],
                claims,
                expires: DateTime.Now.AddDays(1),
            signingCredentials : credential);
           return  tokenHandler.WriteToken(token);
        }
    }
}
