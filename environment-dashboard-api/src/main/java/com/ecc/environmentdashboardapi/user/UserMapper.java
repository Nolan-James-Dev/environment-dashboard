package com.ecc.environmentdashboardapi.user;

import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    public UserResponse toUserResponse(User user) {
        return new UserResponse(
                user.getUsername()
        );
    }
}
