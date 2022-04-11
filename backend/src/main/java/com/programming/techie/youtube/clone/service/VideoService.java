package com.programming.techie.youtube.clone.service;

import com.programming.techie.youtube.clone.dto.UploadVideoResponse;
import com.programming.techie.youtube.clone.dto.VideoDto;
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
    public UploadVideoResponse uploadVideo(MultipartFile multipartFile){
        //upload fileto aws s3
        // save Video Data to database
        String videoUrl = s3Service.uploadFile(multipartFile);
        var video = new Video();
        video.setVideoUrl(videoUrl);
        var saveVideo = videoRepository.save(video);
        return new UploadVideoResponse(saveVideo.getId(),saveVideo.getVideoUrl());
    }
    public VideoDto editVideo(VideoDto videoDto) {
        //Find video by ID
       Video savedVideo =  getVideoById(videoDto.getId());
       
       // Map the videoDto Fields to video
        savedVideo.setTitle(videoDto.getTitle());
        savedVideo.setDescription(videoDto.getDescription());
        savedVideo.setTags(videoDto.getTags());
        savedVideo.setThumbnailUrl(videoDto.getThumbnailUrl());
        savedVideo.setVideoStatus(videoDto.getVideoStatus());        
        
        // save the video to the database
        videoRepository.save(savedVideo);
        // Vidoe ID :- 6239eb4b47cf111f8249a49c
        return videoDto;
    }
    public String uploadThumbnail(MultipartFile file, String videoId) {
        Video savedVideo = getVideoById(videoId);
        String thumbnailUrl = s3Service.uploadFile(file);
        savedVideo.setThumbnailUrl(thumbnailUrl);
        videoRepository.save(savedVideo);
        return thumbnailUrl;
    }
    public VideoDto getVideoDetails(String videoId)
    {
        Video saveVideo = getVideoById(videoId);
        VideoDto videoDto = new VideoDto();
        videoDto.setId(videoId);
        videoDto.setVideoUrl(saveVideo.getVideoUrl());
        videoDto.setDescription(saveVideo.getDescription());
        videoDto.setThumbnailUrl(saveVideo.getThumbnailUrl());
        videoDto.setTitle(saveVideo.getTitle());
        videoDto.setTags(saveVideo.getTags());
        videoDto.setVideoStatus(saveVideo.getVideoStatus());
        return videoDto;
    }
    Video getVideoById(String videoId){
        return videoRepository.findById(videoId)
            .orElseThrow(()-> new IllegalArgumentException("Cannot find by ID - "+videoId));
    }
}
