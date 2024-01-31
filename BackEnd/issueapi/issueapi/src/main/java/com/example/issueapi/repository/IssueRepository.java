package com.example.issueapi.repository;

import com.example.issueapi.model.Issues;
import org.springframework.data.repository.CrudRepository;

public interface IssueRepository extends CrudRepository<Issues, Integer> {

}
