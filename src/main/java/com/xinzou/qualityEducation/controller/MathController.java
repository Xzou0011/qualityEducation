package com.xinzou.qualityEducation.controller;

import com.xinzou.qualityEducation.model.Math;
import com.xinzou.qualityEducation.service.MathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class MathController {
    @Autowired
    private MathService service;

    @GetMapping("/math")
    public String search(@RequestParam(name = "q", required = false) String keyword, Model model) {
        List<Math> mathList = service.search(keyword);
        model.addAttribute("mathList", mathList);
        return "math";
    }
}