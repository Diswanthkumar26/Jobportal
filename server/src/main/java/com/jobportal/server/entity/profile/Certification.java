package com.jobportal.server.entity.profile;

import com.jobportal.server.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "certifications")
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String issuer;
    private String year;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
