package com.infosys.lostFoundApplication.bean;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
@Entity
public class MatchItem {

    @EmbeddedId
    private MatchItemId matchItemId;

    private String itemName;
    private String category;
    private String lostUsername;
    private String foundUsername;

    public MatchItem() {
        super();
    }
    
    public MatchItem(MatchItemId matchItemId, String itemName, String category , String lostUsername, String foundUsername) {
    	super();
    	this.matchItemId= matchItemId;
    	this.itemName= itemName;
    	this.category= category;
    	this.lostUsername= lostUsername;
    	this.foundUsername= foundUsername;
    }
    
    public MatchItem(MatchItemDTO matchItemDTO) {
        super();
        this.matchItemId = new MatchItemId(matchItemDTO.getLostItemId(),matchItemDTO.getFoundItemId());
        this.itemName = matchItemDTO.getItemName();
        this.category = matchItemDTO.getCategory();
        this.lostUsername = matchItemDTO.getLostUsername();
        this.foundUsername = matchItemDTO.getFoundUsername();
    }


    // Getter and Setter for matchItemId
    public MatchItemId getMatchItemId() {
        return matchItemId;
    }

    public void setMatchItemId(MatchItemId matchItemId) {
        this.matchItemId = matchItemId;
    }

    // Getter and Setter for itemName
    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    // Getter and Setter for category
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    // Getter and Setter for lostUsername
    public String getLostUsername() {
        return lostUsername;
    }

    public void setLostUsername(String lostUsername) {
        this.lostUsername = lostUsername;
    }

    // Getter and Setter for foundUsername
    public String getFoundUsername() {
        return foundUsername;
    }

    public void setFoundUsername(String foundUsername) {
        this.foundUsername = foundUsername;
    }
}
