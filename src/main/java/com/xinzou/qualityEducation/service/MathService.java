package com.xinzou.qualityEducation.service;

import com.xinzou.qualityEducation.model.Math;
import com.xinzou.qualityEducation.repository.MathRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MathService {
    @Autowired
    private MathRepository repo;

    public List<Math> listAll() {
        return repo.findAll();
    }

//    public List<Math> getRubbishes(String keyword) {
//        if (keyword != null) {
//            return repo.search(keyword);
//        }
//        return null;
//    }
}

