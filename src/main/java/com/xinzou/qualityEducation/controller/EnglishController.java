package com.xinzou.qualityEducation.controller;

import com.xinzou.qualityEducation.model.English;
import com.xinzou.qualityEducation.service.EnglishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class EnglishController {
    @Autowired
    private EnglishService service;

    @GetMapping("/english")
    public String search(@RequestParam(name = "q", required = false) String keyword, Model model) {
        List<English> englishList = service.search(keyword);
        model.addAttribute("englishList", englishList);
        return "english";
    }
}
