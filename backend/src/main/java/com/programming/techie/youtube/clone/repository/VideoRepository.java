package com.programming.techie.youtube.clone.repository;

import com.programming.techie.youtube.clone.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VideoRepository extends MongoRepository<Video,String>{
    
}
