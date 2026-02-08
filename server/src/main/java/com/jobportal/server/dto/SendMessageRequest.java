// src/main/java/com/jobportal/server/dto/SendMessageRequest.java
package com.jobportal.server.dto;

public class SendMessageRequest {

    private String senderRole;
    private Long senderId;
    private Long receiverId;
    private String content;

    public SendMessageRequest() {
    }

    public String getSenderRole() {
        return senderRole;
    }

    public void setSenderRole(String senderRole) {
        this.senderRole = senderRole;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
