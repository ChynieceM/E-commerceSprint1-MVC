using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using E_commerceSprint1_MVC;
using E_commerceSprint1_MVC.Models;
using System.Runtime.CompilerServices;
using System.Collections;

namespace E_commerceSprint1_MVC.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriesController : Controller
    {
        private readonly E_commerceSprint1_MVCDBContext _context;

        public CategoriesController(E_commerceSprint1_MVCDBContext context)
        {
            _context = context;
        }

        // GET: Categories
        [HttpGet]
        public async Task<IEnumerable> GetCategories()
        {
            var categories = _context.Categories.ToList();
            return categories;
        }

        [HttpPost]

        public async Task<IActionResult> CreateCategory(string name, string description)
        {

            Category category = new Category(name, description);
            _context.Categories.Add(category);
            _context.SaveChanges();
            return Ok(category);
        }

        [HttpPut]

        public async Task<IActionResult> EditCategory(int id, [FromBody]Category category)
        {
            var currentCategory = await _context.Categories.FindAsync(id);
            currentCategory.Name = category.Name;
            currentCategory.Description = category.Description;
            currentCategory.Products = category.Products;
          //  _context.Categories.Update(currentCategory);
            _context.SaveChanges();
            return Ok(category);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var currentCategory = await _context.Categories.FindAsync(id);

            if (currentCategory == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(currentCategory);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
