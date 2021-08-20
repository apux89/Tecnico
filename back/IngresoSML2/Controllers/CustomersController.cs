using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using IngresoSML2.Data;
using Newtonsoft.Json;

namespace IngresoSML2.Controllers
{
    [Route("/api/Customer")]
    [ApiController]  
    public class CustomersController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public CustomersController(AppDbContext context)
        {
            dbContext = context;
        }

        // GET: Customers
        public async Task<IActionResult> Index()
        {
            var customer = this.dbContext.Customers.Include(c => c.Invoices).ThenInclude(x => x.Items).ToArray();
            var list = JsonConvert.SerializeObject(customer, Formatting.None, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            });
            return Ok(list);
        }

        [HttpGet("Detail/{Id}")]
        public async Task<IActionResult> Details(int id)
        {
            if (!CustomerExists(id))
            {
                return NotFound();
            }
            var customer = this.dbContext.Customers.Where(u => u.CustomerId == id).Include(c => c.Invoices).ThenInclude(x => x.Items).FirstOrDefault();
            var list = JsonConvert.SerializeObject(customer, Formatting.None, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            });
            return Ok(list);
        }



        [HttpPost("Add")]

        public async Task<IActionResult> Add([Bind("CustomerId,FirstName,LastName,Address")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                customer.CustomerId = getCustomerId();
                this.dbContext.Add(customer);
                this.dbContext.SaveChanges();
                return RedirectToAction(nameof(Details), new { id = customer.CustomerId });


            }
            return NotFound();
        }

        private bool CustomerExists(int id)
        {
            return this.dbContext.Customers.Any(e => e.CustomerId == id);
        }


        private int getCustomerId()
        {
            return this.dbContext.Customers.Count() + 1;
        }
         
    }
}
