package com.ecc.environmentdashboardapi.user;

import com.ecc.environmentdashboardapi.booking.Booking;
import com.ecc.environmentdashboardapi.shared.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_user")
public class User extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String username;

    @OneToMany(mappedBy = "user")
    private List<Booking> bookings;
}
