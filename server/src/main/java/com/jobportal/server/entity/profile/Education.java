package com.jobportal.server.entity.profile;

import com.jobportal.server.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String school;
    private String degree;
    private String period;
    private String location;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
