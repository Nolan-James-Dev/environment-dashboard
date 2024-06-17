package com.ecc.environmentdashboardapi.user;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.ecc.environmentdashboardapi.user.UserExceptionResponse.ENTITY_EXISTS;
import static com.ecc.environmentdashboardapi.user.UserExceptionResponse.NO_ENTITY_FOUND_BY_ID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponse createUser(UserRequest request) {
        Optional<User> optionalUser = userRepository.findByUsername(request.username());

        if (optionalUser.isEmpty()) {
            User user = User.builder()
                    .username(request.username())
                    .build();
            userRepository.save(user);

            return userMapper.toUserResponse(user);
        } else {
            throw new EntityExistsException(ENTITY_EXISTS);
        }
    }

    @Override
    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    @Override
    public UserResponse getUser(Integer id) {
        return userRepository.findById(id)
                .map(userMapper::toUserResponse)
                .orElseThrow(() -> new EntityNotFoundException(NO_ENTITY_FOUND_BY_ID));
    }
}
