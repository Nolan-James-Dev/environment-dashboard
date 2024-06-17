package com.ecc.environmentdashboardapi.user;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    List<UserResponse> getUsers();

    UserResponse getUser(Integer id);
}
