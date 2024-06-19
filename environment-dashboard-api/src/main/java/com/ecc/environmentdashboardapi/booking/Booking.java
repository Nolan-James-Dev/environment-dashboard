package com.ecc.environmentdashboardapi.booking;

import com.ecc.environmentdashboardapi.environment.Environment;
import com.ecc.environmentdashboardapi.shared.BaseEntity;
import com.ecc.environmentdashboardapi.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "booking")
public class Booking extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "environment_id")
    private Environment environment;

    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String reason;
}
