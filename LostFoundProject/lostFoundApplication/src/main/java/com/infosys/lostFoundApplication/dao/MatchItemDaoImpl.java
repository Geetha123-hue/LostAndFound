package com.infosys.lostFoundApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.infosys.lostFoundApplication.bean.MatchItem;
@Repository
public class MatchItemDaoImpl implements MatchItemDao {
	@Autowired
	private MatchItemRepository repository;

	@Override
	public void saveMatchItem(MatchItem matchItem) {
	
		repository.save(matchItem);
		
	}

	@Override
	public List<MatchItem> getAllMatchItems() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

}
