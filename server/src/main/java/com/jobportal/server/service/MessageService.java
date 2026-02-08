// src/main/java/com/jobportal/server/service/MessageService.java
package com.jobportal.server.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.server.dto.MessageDto;
import com.jobportal.server.dto.SendMessageRequest;
import com.jobportal.server.entity.Message;
import com.jobportal.server.repository.MessageRepository;

@Service
public class MessageService {

    private final MessageRepository repository;

    public MessageService(MessageRepository repository) {
        this.repository = repository;
    }

    public List<MessageDto> getChat(Long employerId, Long candidateId) {
        List<Message> messages = repository
                .findBySenderIdAndReceiverIdOrSenderIdAndReceiverIdOrderBySentAtAsc(
                        employerId, candidateId,
                        candidateId, employerId);

        return messages.stream().map(this::toDto).toList();
    }

    @Transactional
    public MessageDto sendMessage(SendMessageRequest req) {
        Message msg = new Message();
        msg.setSenderRole(req.getSenderRole());
        msg.setSenderId(req.getSenderId());
        msg.setReceiverId(req.getReceiverId());
        msg.setContent(req.getContent());
        msg.setSentAt(LocalDateTime.now());

        Message saved = repository.save(msg);
        return toDto(saved);
    }

    private MessageDto toDto(Message m) {
        MessageDto dto = new MessageDto();
        dto.setId(m.getId());
        dto.setSenderRole(m.getSenderRole());
        dto.setSenderId(m.getSenderId());
        dto.setReceiverId(m.getReceiverId());
        dto.setContent(m.getContent());
        dto.setSentAt(m.getSentAt());
        return dto;
    }
}
