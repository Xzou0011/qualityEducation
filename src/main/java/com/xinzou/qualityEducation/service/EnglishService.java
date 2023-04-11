package com.xinzou.qualityEducation.service;

import com.xinzou.qualityEducation.model.English;
import com.xinzou.qualityEducation.repository.EnglishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnglishService {
    @Autowired
    private EnglishRepository repo;

    public List<English> search(String keyword) {
        if (keyword != null && !keyword.isEmpty()) {
            return repo.search(keyword);
        } else {
            return repo.findAll();
        }
    }

}
