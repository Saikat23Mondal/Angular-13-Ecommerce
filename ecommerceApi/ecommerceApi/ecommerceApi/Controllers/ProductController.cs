using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ecommerceApi.Data;
using ecommerceApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace ecommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly UserDbContext _context;

        public ProductController(UserDbContext userDbContext)
        {
            _context= userDbContext;
        }
        [HttpPost("add-product")]
        public IActionResult AddProduct([FromBody] Product productobj)
        {
            if (productobj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.Product.Add(productobj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode=200,
                    Messege ="Product Added Succesfully"
                });
            }
        }
        [HttpPut("update-product")]
        public IActionResult UpdateProduct([FromBody] Product Productobj)
        {
            if(Productobj == null)
            {
                return BadRequest();
            }
            var product = _context.Product.AsNoTracking().FirstOrDefault(x => x.id == Productobj.id);
            if(product == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message ="Product Found"
                });
            }
            else
            {
                _context.Entry(Productobj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Messege = "Product Updated Succesfully"
                });
            }

            
                
        }
        [HttpDelete("delete-product/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _context.Product.Find(id);
            if(product == null)
            {
                return NotFound(new
                {
                    StatusCode=404,
                    Message =   "Product Not Found"
                });
            }
            else
            {
                _context.Remove(product);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Messege = "Product Deleted"
                });
            }
        }
        [HttpGet("view-product")]
        public IActionResult ViewProduct()
        {
            var product = _context.Product.AsQueryable();
            if(product == null)
            {
                return BadRequest(new
                {
                    Message ="No Product Found"
                });
            }
            else
            {
                return Ok(product);
            }
           
        }
    }
}
