package com.example.issueapi.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.issueapi.model.Issues;
import com.example.issueapi.repository.IssueRepository;
@Service
public class IssueService {
    @Autowired
    IssueRepository issueRepository;

    public List<Issues> getAllIssues() {
        List<Issues> issues = new ArrayList<>();
        issueRepository.findAll().forEach(issues1 -> issues.add(issues1));
        return issues;
    }

    public Issues getIssuesById(int id) {
        return issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entered issue ID is not available, please search for a valid issue ID"));
    }

    public void saveOrUpdate(Issues issues) {
        issueRepository.save(issues);
    }

    public void delete(int id) {
        issueRepository.deleteById(id);
    }

    public void update(Issues issues, int issueid) {
        issueRepository.save(issues);
    }
}
