﻿using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commerceSprint1_MVC.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? ProductName { get; set; }
        public string? Description { get; set; }
        public string? Price { get; set; }

        public string? ImgUrl { get; set; }
      
        [ForeignKey("CategoryId")]
        public int CategoryId { get; set; }

        // Navigation property
    }


        //public virtual Category? Category { get; set; }

   
}
