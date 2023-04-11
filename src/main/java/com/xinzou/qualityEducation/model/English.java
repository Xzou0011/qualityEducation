package com.xinzou.qualityEducation.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class English {
    @Id
    private int id;
    private String Discipline;
    private String year;
    private String Chapter;
    private String CD_Code;
    private String Title;
    private String Description;

    public English() {
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

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
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

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }
}
