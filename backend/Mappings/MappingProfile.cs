using AutoMapper;
using TodoApi.DTOs;
using TodoApi.Data;

namespace TodoApi.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<TodoEntity, TodoResponseDto>()
            .ForMember(dest => dest.IsOverdue, opt => opt.MapFrom(src =>
                !src.IsCompleted && src.Deadline.HasValue && src.Deadline.Value < DateTime.UtcNow));
    }
}
