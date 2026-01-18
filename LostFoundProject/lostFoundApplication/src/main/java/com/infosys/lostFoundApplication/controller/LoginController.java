package com.infosys.lostFoundApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.infosys.lostFoundApplication.bean.LostfoundUser;
import com.infosys.lostFoundApplication.service.LostfoundUserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/lostfound")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class LoginController {

    @Autowired
    private LostfoundUserService service;

//    @PostMapping("/login")
//    public String login(@RequestBody LostfoundUser user) {
//        return service.validateUser(user.getUsername(), user.getPassword());
//    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LostfoundUser user, HttpSession session) {

        String role = service.validateUser(user.getUsername(), user.getPassword());

        if ("INVALID".equals(role)) {
            return ResponseEntity.status(401).body("INVALID");
        }

        session.setAttribute("userId", user.getUsername());
        session.setAttribute("role", role);

        return ResponseEntity.ok(role);
    }


    @PostMapping("/register")
    public String register(@RequestBody LostfoundUser user) {
        service.save(user);
        return "Registered";
    }

    @GetMapping("/me")
    public LostfoundUser me() {
        return service.getUser();
    }

    @GetMapping("/user")
    public String user() {
        return service.getUserId();
    }

    @GetMapping("/role")
    public String role() {
        return service.getRole();
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
    
 // 🔧 FIXED: This endpoint was missing — REQUIRED for StudentList.jsx
    @GetMapping("/student")
    public List<LostfoundUser> getAllStudents() {
        return service.getAllStudents();
    }
    
 // 🔧 FIXED: Required for delete button in StudentList.jsx
    @DeleteMapping("/login/{username}")
    public void deleteStudent(@PathVariable String username) {
        service.deleteUser(username);
    }
}
