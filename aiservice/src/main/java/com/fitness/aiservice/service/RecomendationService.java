package com.fitness.aiservice.service;

import com.fitness.aiservice.model.Recomendation;
import com.fitness.aiservice.repository.RecomendationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecomendationService {
     private final RecomendationRepository recomendationRepository;

    public List<Recomendation> getUserRecomendation(String userId) {
       return recomendationRepository.findByUserId(userId);
    }

    public Recomendation getActivityRecomendation(String activityId) {
        return recomendationRepository.findByActivityId(activityId)
                .orElseThrow(()-> new RuntimeException("No recomendation Found for this activity:"+activityId));
    }
}
