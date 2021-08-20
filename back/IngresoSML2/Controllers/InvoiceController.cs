using IngresoSML2.Data;
using IngresoSML2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IngresoSML2.Controllers
{
    [Route("/api/invoice")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public InvoiceController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] InvoicePostModel pm)
        {
            if (ModelState.IsValid)
            {
                Invoice invoice = new Invoice
                {
                    Id = this.getInvoiceId(),
                    CustomerId = pm.CustomerId,
                    Date = pm.Date,
                };
                this.dbContext.Invoices.Add(invoice);
                int id = getInvoiceItemId();
                foreach (string items in pm.Codes)
                {
                    
                    this.dbContext.InvoiceItems.Add(new InvoiceItem()

                    {
                        InvoiceId = invoice.Id,
                        InvoiceItemId = id,
                        ProductCode = items
                    });
                    id++;
                }
                this.dbContext.SaveChanges();
                return RedirectToAction(nameof(Details), new { id = invoice.Id }); ;

            }
            return NotFound();

        }

        [HttpGet("Details/{id}")]
        public async Task<IActionResult> Details(int id)
        {
            if (!InvoiceExists(id))
            {
                return NotFound();
            }
            var invoce = this.dbContext.Invoices.Where(u => u.Id == id).Include(u => u.Items).FirstOrDefault();
            var list = JsonConvert.SerializeObject(invoce, Formatting.None, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            });
            return Ok(list);
        }
        private bool InvoiceExists(int id)
        {
            return this.dbContext.Invoices.Any(e => e.Id == id);
        }

        private int getInvoiceId()
        {
            return this.dbContext.Invoices.Count() + 1;
        }
        private int getInvoiceItemId()
        {
            return this.dbContext.InvoiceItems.Count() + 1;
        }



    }
}
