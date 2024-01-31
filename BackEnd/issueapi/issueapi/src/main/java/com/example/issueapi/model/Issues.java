package com.example.issueapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Table(name = "Issues")
public class Issues {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int issueid;

    @Column
    @Valid
    @NotBlank(message = "Title can't be blank")
    @NotNull(message = "Title can't be null")
    private String title;

    @Column
    @Valid
    @NotBlank(message = "Description can't be blank")
    @NotNull(message = "Description can't be null")
    private String description;

    @Column
    @Valid
    @NotBlank(message = "Type of issue can't be blank")
    @NotNull(message = "Type of issue can't be null")
    private String typeofissue;

    @Column
    @Valid
    @NotBlank(message = "State can't be blank")
    @NotNull(message = "State can't be null")
    private String state;

    @Column
    @Valid
    @NotNull(message = "Timestamp can't be null")
    private Timestamp timestamp;

    public Issues() {
        // Initialize timestamp with the current time
        this.timestamp = Timestamp.from(Instant.now());
    }

    public int getIssueid() {
        return issueid;
    }

    public void setIssueid(int issueid) {
        this.issueid = issueid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTypeofissue() {
        return typeofissue;
    }

    public void setTypeofissue(String typeofissue) {
        this.typeofissue = typeofissue;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    @PrePersist
    private void beforePersist() {
        // Set timestamp before persisting to the database
        if (this.timestamp == null) {
            this.timestamp = Timestamp.from(Instant.now());
        }
    }
}
