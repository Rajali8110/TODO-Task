namespace TodoApi.DTOs;

public class TodoResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public DateTime? Deadline { get; set; }
    public bool IsCompleted { get; set; }
    public bool IsOverdue { get; set; }
    public DateTime CreatedAt { get; set; }
}
