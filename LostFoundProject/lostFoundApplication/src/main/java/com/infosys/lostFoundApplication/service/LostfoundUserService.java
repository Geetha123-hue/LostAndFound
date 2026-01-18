package com.infosys.lostFoundApplication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.infosys.lostFoundApplication.bean.LostfoundUser;
import com.infosys.lostFoundApplication.dao.LostfoundUserRepository;

import jakarta.servlet.http.HttpSession;

@Service
public class LostfoundUserService implements UserDetailsService {

    @Autowired
    private LostfoundUserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private HttpSession session;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LostfoundUser user = repository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return user;
    }

    // ✅ PROPER LOGIN VALIDATION
    public String validateUser(String username, String password) {

        Optional<LostfoundUser> optional = repository.findById(username);

        if (optional.isEmpty()) return null;

        LostfoundUser user = optional.get();

        // 🔐 Correct password check
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return "INVALID";
        }

        // 🧠 Store user in session
        session.setAttribute("userId", user.getUsername());
        session.setAttribute("role", user.getRole());
        session.setAttribute("user", user);

        return user.getRole();
    }

    public LostfoundUser getUser() {
        return (LostfoundUser) session.getAttribute("user");
    }

    public String getUserId() {
        return (String) session.getAttribute("userId");
    }

    public String getRole() {
        return (String) session.getAttribute("role");
    }

    public void save(LostfoundUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // 🔐 encode before saving
        repository.save(user);
    }

    public void deleteUser(String id) {
        repository.deleteById(id);
    }
    
 // 🟢🟢🟢 NEW — REQUIRED for Student List page
    public List<LostfoundUser> getAllStudents() {
        return repository.findAll();
    }
    
}
