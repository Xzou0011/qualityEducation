package com.xinzou.qualityEducation.repository;

import com.xinzou.qualityEducation.model.Math;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MathRepository extends JpaRepository<Math,Integer> {

    @Query(value = "select * from math m where m.Subtopic like %:keyword%", nativeQuery = true)
    List<Math> search(@Param("keyword") String keyword);

}
