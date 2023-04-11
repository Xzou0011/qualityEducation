package com.xinzou.qualityEducation.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Math {
    @Id
    private int id;
    private String Discipline;
    private String Level;
    private String Chapter;
    private String CD_Code;
    private String Title;
    private String Subtopic;
    private String Content_Description;
    private String Elaboration;

    public Math() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDiscipline() {
        return Discipline;
    }

    public void setDiscipline(String discipline) {
        Discipline = discipline;
    }

    public String getLevel() {
        return Level;
    }

    public void setLevel(String level) {
        Level = level;
    }

    public String getChapter() {
        return Chapter;
    }

    public void setChapter(String chapter) {
        Chapter = chapter;
    }

    public String getCD_Code() {
        return CD_Code;
    }

    public void setCD_Code(String CD_Code) {
        this.CD_Code = CD_Code;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public String getSubtopic() {
        return Subtopic;
    }

    public void setSubtopic(String subtopic) {
        Subtopic = subtopic;
    }

    public String getContent_Description() {
        return Content_Description;
    }

    public void setContent_Description(String content_Description) {
        Content_Description = content_Description;
    }

    public String getElaboration() {
        return Elaboration;
    }

    public void setElaboration(String elaboration) {
        Elaboration = elaboration;
    }
}
