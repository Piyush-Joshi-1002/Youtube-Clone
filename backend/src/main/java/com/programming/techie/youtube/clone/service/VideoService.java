package com.programming.techie.youtube.clone.service;

import com.programming.techie.youtube.clone.model.Video;
import com.programming.techie.youtube.clone.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VideoService {
    @Autowired
    private final S3Service s3Service;

    private final VideoRepository videoRepository;
    public void uploadVideo(MultipartFile multipartFile){
        //upload fileto aws s3
        // save Video Data to database
        String videoUrl = s3Service.uploadFile(multipartFile);
        var video = new Video();
        video.setVideoUrl(videoUrl);
        videoRepository.save(video);

    }
}
