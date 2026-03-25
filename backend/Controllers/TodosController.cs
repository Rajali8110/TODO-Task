using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using TodoApi.DTOs;
using TodoApi.Services;

namespace TodoApi.Controllers;

[ApiController]
[Route("api/todos")]
public class TodosController : ControllerBase
{
    private readonly ITodoService _todoService;

    public TodosController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet]
    [EnableRateLimiting("read")]
    public async Task<IActionResult> GetAll()
    {
        var todos = await _todoService.GetAllAsync();

        return Ok(todos);
    }

    [HttpPost]
    [EnableRateLimiting("write")]
    public async Task<IActionResult> Create([FromBody] CreateTodoDto dto)
    {
        var todo = await _todoService.CreateAsync(dto);

        return CreatedAtAction(nameof(GetAll), new { id = todo.Id }, todo);
    }

    [HttpPut("{id:guid}")]
    [EnableRateLimiting("write")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateTodoDto dto)
    {
        var todo = await _todoService.UpdateAsync(id, dto);

        if (todo is null) return NotFound();

        return Ok(todo);
    }

    [HttpDelete("{id:guid}")]
    [EnableRateLimiting("write")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _todoService.DeleteAsync(id);

        if (!deleted) return NotFound();
        
        return NoContent();
    }
}
