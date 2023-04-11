package com.xinzou.qualityEducation.repository;

import com.xinzou.qualityEducation.model.English;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnglishRepository extends JpaRepository<English,Integer> {

    @Query(value = "select * from english e where e.Title like %:keyword%", nativeQuery = true)
    List<English> search(@Param("keyword") String keyword);

}

