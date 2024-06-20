package com.ecc.environmentdashboardapi.timeslot;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimeSlotServiceImpl implements TimeSlotService {

    @Override
    public List<String> getTimeSlots() {
        return List.of(
                "08:00", "09:00", "10:00", "11:00", "12:00",
                "13:00", "14:00", "15:00", "16:00", "17:00",
                "18:00", "19:00"
        );
    }
}
