namespace E_commerceSprint1_MVC.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        // Collection navigation property
        public  List <Product>? Products { get; set; } 

        public Category(string name, string description)
        {
            Name = name;
            Description = description;
            
        }
    }
}
