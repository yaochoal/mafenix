using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Contact.Models;

namespace Contact.Controllers
{
    [Route("api/Contact")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ContactContext _context;

        public ContactController(ContactContext context)
        {
            _context = context;

            if (_context.ContactItems.Count() == 0)
            {
                // Create a new ContactItem if collection is empty,
                // which means you can't delete all ContactItems.
                _context.ContactItems.Add(new ContactItem { Name = "Item1" });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult<List<ContactItem>> GetAll()
        {
            return _context.ContactItems.ToList();
        }

        [HttpGet("{id}", Name = "GetContact")]
        public ActionResult<ContactItem> GetById(long id)
        {
            var item = _context.ContactItems.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpPost]
        public IActionResult Create(ContactItem item)
        {
            _context.ContactItems.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetContact", new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, ContactItem item)
        {
            var contact = _context.ContactItems.Find(id);
            if (contact == null)
            {
                return NotFound();
            }

            contact.Name = item.Name;
            contact.LastName = item.LastName;
            contact.Email = item.Email;
            contact.Subject = item.Subject;
            contact.Message = item.Message;
            contact.IsComplete = item.IsComplete;
    
            _context.ContactItems.Update(contact);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var contact = _context.ContactItems.Find(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.ContactItems.Remove(contact);
            _context.SaveChanges();
            return NoContent();
        }
    }
}