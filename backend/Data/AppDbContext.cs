using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TodoEntity> Todos => Set<TodoEntity>();
}

[Table("Todos")]
public class TodoEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public DateTime? Deadline { get; set; }

    public bool IsCompleted { get; set; }

    public DateTime CreatedAt { get; set; }
}
