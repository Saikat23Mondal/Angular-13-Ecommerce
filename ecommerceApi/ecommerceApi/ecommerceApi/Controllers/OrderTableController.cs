using ecommerceApi.Data;
using ecommerceApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ecommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderTableController : ControllerBase
    {
        private readonly UserDbContext _context;
        public OrderTableController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }
        [HttpPost("add-order")]
        public IActionResult AddOrder([FromBody] Order orderObj)
        {
            if(orderObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.Order.Add(orderObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode =200,
                    Message ="Order Successful"
                });
            }
        }
        [HttpGet("view-order")]
        public IActionResult ViewOrder()
        {
            var order = _context.Order.AsQueryable();
            if(order == null)
            {
                return BadRequest(new
                {
                    Message = "Order Not Found"
                });
            }
            else
            {
                return Ok(order);
            }
        }

    }
}
