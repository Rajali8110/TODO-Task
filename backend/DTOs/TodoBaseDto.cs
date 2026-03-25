using System.ComponentModel.DataAnnotations;

namespace TodoApi.DTOs;

public class TodoBaseDto
{
    [Required]
    [MinLength(11, ErrorMessage = "Title must be at least 11 characters long.")]
    [MaxLength(200, ErrorMessage = "Title must not exceed 200 characters.")]
    public string Title { get; set; } = string.Empty;

    public DateTime? Deadline { get; set; }
}
