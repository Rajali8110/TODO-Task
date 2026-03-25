namespace TodoApi.DTOs;

public class UpdateTodoDto : TodoBaseDto
{
    public bool IsCompleted { get; set; }
}
