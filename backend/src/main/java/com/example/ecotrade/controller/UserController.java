package com.example.ecotrade.controller;

import com.example.ecotrade.dto.AuthResponseDTO;
import com.example.ecotrade.dto.LoginRequestDTO;
import com.example.ecotrade.dto.RegisterRequestDTO;
import com.example.ecotrade.dto.UserResponseDTO;
import com.example.ecotrade.model.User;
import com.example.ecotrade.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserResponseDTO> userDTOs = users.stream()
                .map(UserResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(UserResponseDTO::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserResponseDTO> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(UserResponseDTO::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            UserResponseDTO userDTO = new UserResponseDTO(createdUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            UserResponseDTO userDTO = new UserResponseDTO(updatedUser);
            return ResponseEntity.ok(userDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok().body("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/exists/{email}")
    public ResponseEntity<Boolean> checkEmailExists(@PathVariable String email) {
        boolean exists = userService.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO registerRequest) {
        try {
            // Solo sincronizar datos adicionales si el usuario no existe
            if (!userService.existsByEmail(registerRequest.getEmail())) {
                User user = new User();
                user.setName(registerRequest.getName());
                user.setEmail(registerRequest.getEmail());
                user.setNationality(registerRequest.getNationality());
                user.setSupabaseId(registerRequest.getSupabaseId());
                user.setPassword("");

                User createdUser = userService.createUser(user);
                UserResponseDTO userDTO = new UserResponseDTO(createdUser);

                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(new AuthResponseDTO("Usuario registrado exitosamente", userDTO, true));
            }
            
            // Si ya existe, solo devolver los datos
            User existingUser = userService.getUserByEmail(registerRequest.getEmail()).orElseThrow();
            UserResponseDTO userDTO = new UserResponseDTO(existingUser);
            return ResponseEntity.ok(new AuthResponseDTO("Usuario ya existe", userDTO, true));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponseDTO("Error: " + e.getMessage(), null, false));
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        try {
            // El token ya fue validado por el filtro JWT
            // Solo buscar y devolver información del usuario
            User user = userService.getUserByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            UserResponseDTO userDTO = new UserResponseDTO(user);
            return ResponseEntity.ok(new AuthResponseDTO("Login exitoso", userDTO, true));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new AuthResponseDTO("Usuario no encontrado", null, false));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponseDTO("Error: " + e.getMessage(), null, false));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser(HttpServletRequest request) {
        try {
            System.out.println("Fetching current user");
            String userEmail = (String) request.getAttribute("userEmail");
            if (userEmail == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            User user = userService.getUserByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            return ResponseEntity.ok(new UserResponseDTO(user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
