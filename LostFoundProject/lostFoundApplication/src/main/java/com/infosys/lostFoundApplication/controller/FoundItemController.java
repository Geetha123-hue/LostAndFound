package com.infosys.lostFoundApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.lostFoundApplication.bean.FoundItem;
import com.infosys.lostFoundApplication.bean.FoundItemDTO;
import com.infosys.lostFoundApplication.bean.LostItem;
import com.infosys.lostFoundApplication.dao.FoundItemDao;
import com.infosys.lostFoundApplication.dao.LostItemDao;
import com.infosys.lostFoundApplication.service.FoundItemService;
import com.infosys.lostFoundApplication.service.LostfoundUserService;

@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class FoundItemController {

    @Autowired
    private FoundItemDao foundItemDao;
    
    @Autowired
    private LostItemDao lostItemDao;

    @Autowired
    private LostfoundUserService userService;

    @Autowired
    private FoundItemService foundService;

    // Save a new found item
    @PostMapping("/found")
    public void saveFoundItem(@RequestBody FoundItem foundItem) {
        foundItemDao.saveFoundItem(foundItem);
    }

    // Get all found items
    @GetMapping("/found")
    public List<FoundItem> getAllFoundItems() {
        return foundItemDao.getAllFoundItems();
    }

    @GetMapping("/found/{id}")
    public FoundItem getFoundItemById(@PathVariable String id) {
        return foundItemDao.getFoundItemById(id);
    }

    @DeleteMapping("/found/{id}")
    public void deleteFoundItemById(@PathVariable String id) {
        foundItemDao.deleteFoundItemById(id);
    }
    @PutMapping("/found")
    public void updateFoundItem(@RequestBody FoundItem foundItem) {
        foundItemDao.saveFoundItem(foundItem);
    }

    @GetMapping("/found-id")
    public String generateId() {
        return foundService.generateFoundItemId();
    }
    @GetMapping("/found-user")
    public List<FoundItem> getFoundItemsByUsername() {
        String userId = userService.getUserId();
        return foundItemDao.getFoundItemsByUsername(userId);
    }
    
    @GetMapping("/found-id/{id}")
    public List<FoundItemDTO> getFoundItemsByLostItem(@PathVariable String id){
        LostItem lostItem=lostItemDao.getLostItemById(id);
        return foundService.collectFoundItems(lostItem);
    }

}
