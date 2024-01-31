package com.example.issueapi.controller;

import java.util.List;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.issueapi.model.Issues;
import com.example.issueapi.service.IssueService;
@RestController
@CrossOrigin("*")
public class IssueController {
    @Autowired
    IssueService issueService;

    @GetMapping("/issue")
    private List<Issues> getAllIssues() {
        return issueService.getAllIssues();
    }

    @GetMapping("/issue/{issueid}")
    private Issues getBooks(@Valid @PathVariable("issueid") int issueid) {
        return issueService.getIssuesById(issueid);
    }


    @DeleteMapping("/issue/{issueid}")
    private void deleteIssue(@Valid @PathVariable("issueid") int issueid) {
        issueService.delete(issueid);
    }

    @PostMapping("/issue")
    private ResponseEntity<Issues> saveIssue(@Valid @RequestBody Issues issues) {
        issueService.saveOrUpdate(issues);
        return new ResponseEntity<>(issues, HttpStatus.CREATED);
    }


    @PutMapping("/issue/{issueid}")
    private ResponseEntity<Issues> update(@Valid @PathVariable("issueid") int issueid, @Valid @RequestBody Issues updatedIssue) {
        Issues existingIssue = issueService.getIssuesById(issueid);

        if (existingIssue != null) {
            updatedIssue.setIssueid(issueid);
            issueService.saveOrUpdate(updatedIssue);

            return new ResponseEntity<>(updatedIssue, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
