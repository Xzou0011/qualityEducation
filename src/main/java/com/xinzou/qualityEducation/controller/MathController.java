package com.xinzou.qualityEducation.controller;

import com.xinzou.qualityEducation.model.Math;
import com.xinzou.qualityEducation.service.MathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class MathController {
    @Autowired
    private MathService service;

//    @RequestMapping("/math")
//    public String viewHomePage(Model model, @Param("keyword") String keyword) {
//        List<Math> mathes = service.getRubbishes(keyword);
//        model.addAttribute("mathes", mathes);
//        model.addAttribute("keyword", keyword);
//        return "math";
//    }

    @GetMapping("/math")
    public String getMathList(Model model) {
        List<Math> mathList = service.listAll();
        model.addAttribute("mathList", mathList);
        return "math";
    }

}