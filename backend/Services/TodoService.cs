using System.Text.RegularExpressions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.DTOs;

namespace TodoApi.Services;

public interface ITodoService
{
    Task<List<TodoResponseDto>> GetAllAsync();
    Task<TodoResponseDto> CreateAsync(CreateTodoDto dto);
    Task<TodoResponseDto?> UpdateAsync(Guid id, UpdateTodoDto dto);
    Task<bool> DeleteAsync(Guid id);
}

public class TodoService : ITodoService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public TodoService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    private static string SanitizeTitle(string title)
    {
        title = title.Trim();

        title = Regex.Replace(title, "<.*?>", string.Empty);
        
        return title;
    }

    public async Task<List<TodoResponseDto>> GetAllAsync()
    {
        var todos = await _context.Todos
            .AsNoTracking()
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();

        return _mapper.Map<List<TodoResponseDto>>(todos);
    }

    public async Task<TodoResponseDto> CreateAsync(CreateTodoDto dto)
    {
        var todo = new TodoEntity
        {
            Id = Guid.NewGuid(),
            Title = SanitizeTitle(dto.Title),
            Deadline = dto.Deadline,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };

        _context.Todos.Add(todo);

        await _context.SaveChangesAsync();

        return _mapper.Map<TodoResponseDto>(todo);
    }

    public async Task<TodoResponseDto?> UpdateAsync(Guid id, UpdateTodoDto dto)
    {
        var todo = await _context.Todos.FindAsync(id);

        if (todo is null) return null;

        todo.Title = SanitizeTitle(dto.Title);
        todo.IsCompleted = dto.IsCompleted;
        todo.Deadline = dto.Deadline;

        await _context.SaveChangesAsync();

        return _mapper.Map<TodoResponseDto>(todo);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var todo = await _context.Todos.FindAsync(id);

        if (todo is null) return false;

        _context.Todos.Remove(todo);
        
        await _context.SaveChangesAsync();

        return true;
    }
}
