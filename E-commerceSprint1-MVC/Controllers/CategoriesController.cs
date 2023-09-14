﻿using System;
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
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategories(int id)
        {
            var categories = await _context.Categories.Include(c => c.Products).FirstOrDefaultAsync(c => c.Id == id);
             if (categories == null)
            {
                return NotFound();
            }
            return categories;
        }

        [HttpGet]
        public async Task<IEnumerable> GetCategories()
        {
            var categories = _context.Categories.Include(c => c.Products).ToList();

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

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCategory(int id, [FromBody] Category category)
        {
            if (category == null)
            {
                return BadRequest("Category data is invalid.");
            }

            var currentCategory = await _context.Categories.FindAsync(id);

            if (currentCategory == null)
            {
                return NotFound("Category not found");
            }

            currentCategory.Name = category.Name;
            currentCategory.Description = category.Description;

            int affectedRows = await _context.SaveChangesAsync();

            if (affectedRows == 0)
            {
                return StatusCode(500, "Unable to save changes.");
            }

            return Ok(currentCategory);
        }



        [HttpDelete("{id}")]
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
