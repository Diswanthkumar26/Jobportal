// src/main/java/com/jobportal/server/controller/MessageController.java
package com.jobportal.server.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.jobportal.server.dto.MessageDto;
import com.jobportal.server.dto.SendMessageRequest;
import com.jobportal.server.service.MessageService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService service;

    public MessageController(MessageService service) {
        this.service = service;
    }

    @GetMapping("/chat/{employerId}/{candidateId}")
    public List<MessageDto> getChat(
            @PathVariable Long employerId,
            @PathVariable Long candidateId) {
        return service.getChat(employerId, candidateId);
    }

    @PostMapping("/send")
    public MessageDto send(@RequestBody SendMessageRequest req) {
        return service.sendMessage(req);
    }
}
