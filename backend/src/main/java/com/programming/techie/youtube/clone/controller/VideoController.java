package com.programming.techie.youtube.clone.controller;
//-Dcloud.aws.credentials.access-key=AKIAVKFCLI6JKJXJ3F72 -Dcloud.aws.credentials.secret-key=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
import com.programming.techie.youtube.clone.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;


    @GetMapping("api/videos")
    public String vidoes(){
        String s = "This is fine ";
        return s;
    }

    @PostMapping("api/videos")
    @ResponseStatus(HttpStatus.CREATED)
    public void uploadVideo(@RequestParam("file") MultipartFile file){
        videoService.uploadVideo(file);
    }

}
