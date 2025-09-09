package com.fitness.aiservice.service;
//listens messages posted into the queue

import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recomendation;
import com.fitness.aiservice.repository.RecomendationRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityMessageListener {

    private final ActivityAIService aiService;
    private final RecomendationRepository recomendationRepository;

    @RabbitListener(queues ="activity.queue")//this name should be same as name in queues of rabbitmq browser
    public void processActivity(Activity activity){
        log.info("Received activity for processing: {}",activity.getId());
       // log.info("Generated Recomendation: {}",aiService.generateRecomendation(activity));
       Recomendation recomendation= aiService.generateRecommendation(activity);
       recomendationRepository.save(recomendation);

    }

}
