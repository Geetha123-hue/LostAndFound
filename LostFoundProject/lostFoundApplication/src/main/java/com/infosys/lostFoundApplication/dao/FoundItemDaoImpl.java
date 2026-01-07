package com.infosys.lostFoundApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.infosys.lostFoundApplication.bean.FoundItem;

@Repository
public class FoundItemDaoImpl implements FoundItemDao {

    @Autowired
    private FoundItemRepository foundItemRepository;

    @Override
    public void saveFoundItem(FoundItem foundItem) {
        foundItemRepository.save(foundItem);
    }

    @Override
    public List<FoundItem> getAllFoundItems() {
        return foundItemRepository.findAll();
    }

    @Override
    public FoundItem getFoundItemById(String foundItemId) {
        return foundItemRepository.findById(foundItemId).orElse(null);
    }

    @Override
    public void deleteFoundItemById(String foundItemId) {
        foundItemRepository.deleteById(foundItemId);
    }

    @Override
    public String getLastId() {
        return foundItemRepository.getLastId();
    }


    @Override
    public List<FoundItem> getFoundItemsByUsername(String username) {
        return foundItemRepository.getFoundItemsByUsername(username);
    }
}
