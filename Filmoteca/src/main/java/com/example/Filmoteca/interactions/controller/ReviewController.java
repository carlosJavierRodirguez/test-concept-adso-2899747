package com.example.Filmoteca.interactions.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Filmoteca.interactions.dto.request.ReviewRequestDto;
import com.example.Filmoteca.interactions.dto.response.ReviewResponseDto;
import com.example.Filmoteca.interactions.IService.IReviewService;
import com.example.Filmoteca.interactions.entity.Review;
import com.example.Filmoteca.users.entity.User;
import com.example.Filmoteca.Content.entity.Movie;
import com.example.Filmoteca.Content.entity.Series;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/review")
public class ReviewController
        extends ABaseControllerInteractions<Review, IReviewService, ReviewRequestDto, ReviewResponseDto> {
    public ReviewController(IReviewService service) {
        super(service, "Review");
    }

    @Override
    protected Review convertToModel(ReviewRequestDto dto) {
        Review entity = new Review();
        entity.setContent(dto.getContent());
        entity.setRating(dto.getRating());
        entity.setDate(dto.getDate() != null ? java.time.LocalDate.parse(dto.getDate()) : null);
        if (dto.getUserId() != null) {
            User user = new User();
            user.setId(dto.getUserId());
            entity.setUser(user);
        }
        if (dto.getMovieId() != null) {
            Movie movie = new Movie();
            movie.setId(dto.getMovieId());
            entity.setMovie(movie);
        }
        if (dto.getSeriesId() != null) {
            Series series = new Series();
            series.setId(dto.getSeriesId());
            entity.setSeries(series);
        }
        return entity;
    }

    @Override
    protected ReviewResponseDto convertToDto(Review entity) {
        ReviewResponseDto dto = new ReviewResponseDto();
        dto.setId(entity.getId());
        dto.setContent(entity.getContent());
        dto.setRating(entity.getRating());
        dto.setDate(entity.getDate() != null ? entity.getDate().toString() : null);
        if (entity.getUser() != null) {
            dto.setUserId(entity.getUser().getId());
        }
        if (entity.getMovie() != null) {
            dto.setMovieId(entity.getMovie().getId());
        }
        if (entity.getSeries() != null) {
            dto.setSeriesId(entity.getSeries().getId());
        }
        return dto;
    }
}
