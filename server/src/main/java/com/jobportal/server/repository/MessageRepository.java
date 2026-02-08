// src/main/java/com/jobportal/server/repository/MessageRepository.java
package com.jobportal.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.server.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

    // all messages between employer and candidate ordered by time
    List<Message> findBySenderIdAndReceiverIdOrSenderIdAndReceiverIdOrderBySentAtAsc(
            Long senderId1, Long receiverId1,
            Long senderId2, Long receiverId2);
}
