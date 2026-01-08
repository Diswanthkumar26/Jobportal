// server/src/main/java/com/jobportal/server/dto/UpdateResumeRequest.java
package com.jobportal.server.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateResumeRequest {

    @Size(max = 2048)
    private String resumeUrl;

    private String resumeFileName;
}

