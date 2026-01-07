package com.infosys.lostFoundApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.infosys.lostFoundApplication.bean.LostItem;

public interface LostItemRepository extends JpaRepository<LostItem, String> {

    @Query("SELECT max(l.lostItemId) FROM LostItem l")
    public String getLastId();
    
    @Query("SELECT a FROM LostItem a WHERE a.username = ?1")
    public List<LostItem> getLostItemsByUsername(String username);
}
