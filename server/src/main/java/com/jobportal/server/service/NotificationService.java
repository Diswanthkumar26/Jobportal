package com.jobportal.server.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final JavaMailSender mailSender;

    public NotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendApplicationStatusEmail(String to, String jobTitle, String status) {
        String subject = "Update on your application for " + jobTitle;
        String body = switch (status) {
            case "SHORTLISTED" -> "Good news! You have been shortlisted for " + jobTitle + ".";
            case "REJECTED" -> "Thank you for applying for " + jobTitle + ". We are not moving forward.";
            default -> "Your application status for " + jobTitle + " is now: " + status + ".";
        };

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject(subject);
        msg.setText(body);

        mailSender.send(msg);
    }
}
