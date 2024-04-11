--Members Table
INSERT INTO members (username, passwrd, first_name, last_name, age, gender, numGroupFitness, numPersonalSessions) VALUES ('user1', 'ironman', 'Tony', 'Stark', '35', 'Male', 0, 0);
INSERT INTO members (username, passwrd, first_name, last_name, age, gender, numGroupFitness, numPersonalSessions) VALUES ('user2', 'thor', 'Thor', 'Odinson', '30', 'Male', 0, 0);
INSERT INTO members (username, passwrd, first_name, last_name, age, gender, numGroupFitness, numPersonalSessions) VALUES ('user3', 'blackWidow', 'Natasha', 'Romanoff', '30', 'Female', 0, 0);
INSERT INTO members (username, passwrd, first_name, last_name, age, gender, numGroupFitness, numPersonalSessions) VALUES ('user4', 'cptAmerica', 'Steve', 'Rogers', '30', 'Male', 0, 0);
INSERT INTO members (username, passwrd, first_name, last_name, age, gender, numGroupFitness, numPersonalSessions) VALUES ('user5', 'hulk', 'Bruce', 'Banner', '32', 'Male', 0, 0);

--members fitness goals and health metrics
INSERT INTO fitnessGoals (username, weight_goal, muscle_goal, endurance_goal) VALUES ('user1', 250, 10, 12);
INSERT INTO fitnessGoals (username, weight_goal, muscle_goal, endurance_goal) VALUES ('user2', 600, 5, 6);
INSERT INTO fitnessGoals (username, weight_goal, muscle_goal, endurance_goal) VALUES ('user3', 150, 10, 10);
INSERT INTO fitnessGoals (username, weight_goal, muscle_goal, endurance_goal) VALUES ('user4', 210, 15, 15);
INSERT INTO fitnessGoals (username, weight_goal, muscle_goal, endurance_goal) VALUES ('user5', 120, 8, 8);

INSERT INTO healthMetrics (username, weight, height) VALUES ('user1', 225, 185);
INSERT INTO healthMetrics (username, weight, height) VALUES ('user2', 640, 198);
INSERT INTO healthMetrics (username, weight, height) VALUES ('user3', 131, 170);
INSERT INTO healthMetrics (username, weight, height) VALUES ('user4', 240, 187);
INSERT INTO healthMetrics (username, weight, height) VALUES ('user5', 128, 175);

INSERT INTO exerciseRoutines (username, pushups, pullups, situps, deadlift, squats) VALUES ('user1', 'true','true', 'true', 'true', 'false');
INSERT INTO exerciseRoutines (username, pushups, pullups, situps, deadlift, squats) VALUES ('user2', 'true','false', 'true', 'true', 'true');
INSERT INTO exerciseRoutines (username, pushups, pullups, situps, deadlift, squats) VALUES ('user3', 'false','true', 'true', 'true', 'true');
INSERT INTO exerciseRoutines (username, pushups, pullups, situps, deadlift, squats) VALUES ('user4', 'true','true', 'true', 'false', 'true');
INSERT INTO exerciseRoutines (username, pushups, pullups, situps, deadlift, squats) VALUES ('user5', 'true','true', 'false', 'true', 'true');

INSERT INTO fitnessAchievements (username, enduranceAchievement, basketballAchievement, memberAchievement, weightAchievement, cyclingAchievement, footballAchievement) VALUES ('user1', 'true', 'false', 'true', 'true', 'true', 'true');
INSERT INTO fitnessAchievements (username, enduranceAchievement, basketballAchievement, memberAchievement, weightAchievement, cyclingAchievement, footballAchievement) VALUES ('user2', 'true', 'false', 'true', 'true', 'false', 'false');
INSERT INTO fitnessAchievements (username, enduranceAchievement, basketballAchievement, memberAchievement, weightAchievement, cyclingAchievement, footballAchievement) VALUES ('user3', 'false', 'true', 'true', 'false', 'true', 'true');
INSERT INTO fitnessAchievements (username, enduranceAchievement, basketballAchievement, memberAchievement, weightAchievement, cyclingAchievement, footballAchievement) VALUES ('user4', 'true', 'true', 'true', 'true', 'false', 'true');
INSERT INTO fitnessAchievements (username, enduranceAchievement, basketballAchievement, memberAchievement, weightAchievement, cyclingAchievement, footballAchievement) VALUES ('user5', 'true', 'false', 'true', 'true', 'true', 'false');

--members sessions 
INSERT INTO member1Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('9am', '', '', '', '', '', '', '');
INSERT INTO member1Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO member1Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('11am', '', '', '', '', '', '', '');
INSERT INTO member1Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('12pm', '', '', '', '', '', '', '');
INSERT INTO member1Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO member1Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('2pm', '', '', '', '', '', '', '');
INSERT INTO member1Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO member1Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('4pm', '', '', '', '', '', '', '');
INSERT INTO member1Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('5pm', '', '', '', '', '', '', '');

INSERT INTO member2Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('9am', '', '', '', '', '', '', '');
INSERT INTO member2Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO member2Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('11am', '', '', '', '', '', '', '');
INSERT INTO member2Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('12pm', '', '', '', '', '', '', '');
INSERT INTO member2Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO member2Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('2pm', '', '', '', '', '', '', '');
INSERT INTO member2Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO member2Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('4pm', '', '', '', '', '', '', '');
INSERT INTO member2Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('5pm', '', '', '', '', '', '', '');

INSERT INTO member3Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('9am', '', '', '', '', '', '', '');
INSERT INTO member3Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO member3Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('11am', '', '', '', '', '', '', '');
INSERT INTO member3Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('12pm', '', '', '', '', '', '', '');
INSERT INTO member3Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO member3Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('2pm', '', '', '', '', '', '', '');
INSERT INTO member3Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO member3Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('4pm', '', '', '', '', '', '', '');
INSERT INTO member3Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('5pm', '', '', '', '', '', '', '');

INSERT INTO member4Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('9am', '', '', '', '', '', '', '');
INSERT INTO member4Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO member4Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('11am', '', '', '', '', '', '', '');
INSERT INTO member4Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('12pm', '', '', '', '', '', '', '');
INSERT INTO member4Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO member4Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('2pm', '', '', '', '', '', '', '');
INSERT INTO member4Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO member4Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('4pm', '', '', '', '', '', '', '');
INSERT INTO member4Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('5pm', '', '', '', '', '', '', '');

INSERT INTO member5Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('9am', '', '', '', '', '', '', '');
INSERT INTO member5Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO member5Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('11am', '', '', '', '', '', '', '');
INSERT INTO member5Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('12pm', '', '', '', '', '', '', '');
INSERT INTO member5Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO member5Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('2pm', '', '', '', '', '', '', '');
INSERT INTO member5Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO member5Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('4pm', '', '', '', '', '', '', '');
INSERT INTO member5Sessions (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('5pm', '', '', '', '', '', '', '');

--Trainers Table
INSERT INTO trainers (username, passwrd, first_name, last_name, age, gender) VALUES ('trainer1', 'batman', 'Bruce', 'Wayne', '35', 'Male');
INSERT INTO trainers (username, passwrd, first_name, last_name, age, gender) VALUES ('trainer2', 'superman', 'Clark', 'Kent', '30', 'Male');
INSERT INTO trainers (username, passwrd, first_name, last_name, age, gender) VALUES ('trainer3', 'wonderWoman', 'Diana', 'Prince', '5000', 'Female');
INSERT INTO trainers (username, passwrd, first_name, last_name, age, gender) VALUES ('trainer4', 'batgirl', 'Barbara', 'Gordon', '24', 'Female');
INSERT INTO trainers (username, passwrd, first_name, last_name, age, gender) VALUES ('trainer5', 'greenArrow', 'Oliver', 'Queen', '32', 'Male');

--trainers schedules 
INSERT INTO trainer1Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('9am', 'UNAVAILABLE', '', '', '', '', '', '');
INSERT INTO trainer1Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO trainer1Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('11am', '', '', '', '', '', '', '');
INSERT INTO trainer1Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('12pm', '', '', '', '', '', 'UNAVAILABLE', '');
INSERT INTO trainer1Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO trainer1Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('2pm', 'UNAVAILABLE', '', '', '', '', '', '');
INSERT INTO trainer1Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO trainer1Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('4pm', '', '', '', '', '', '', 'UNAVAILABLE');
INSERT INTO trainer1Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('5pm', '', 'UNAVAILABLE', '', '', '', '', '');

INSERT INTO trainer2Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('9am', '', '', '', '', '', '', 'UNAVAILABLE');
INSERT INTO trainer2Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO trainer2Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('11am', '', '', '', '', '', '', '');
INSERT INTO trainer2Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('12pm', '', '', 'UNAVAILABLE', '', '', '', '');
INSERT INTO trainer2Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO trainer2Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('2pm', '', '', '', '', '', '', '');
INSERT INTO trainer2Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO trainer2Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('4pm', '', '', '', '', '', '', '');
INSERT INTO trainer2Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('5pm', 'UNAVAILABLE', '', '', '', '', '', '');

INSERT INTO trainer3Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('9am', '', '', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('11am', '', 'UNAVAILABLE', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('12pm', '', '', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('2pm', '', '', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('4pm', '', '', '', '', 'UNAVAILABLE', '', '');
INSERT INTO trainer3Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('5pm', '', '', '', '', '', '', '');

INSERT INTO trainer4Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('9am', '', '', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('11am', '', '', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('12pm', '', '', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('2pm', '', 'UNAVAILABLE', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('4pm', '', '', '', '', 'UNAVAILABLE', '', '');
INSERT INTO trainer4Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('5pm', '', '', '', '', '', '', '');

INSERT INTO trainer5Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('9am', '', '', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('11am', '', 'UNAVAILABLE', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('12pm', '', '', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('2pm', '', 'UNAVAILABLE', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('4pm', '', '', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('5pm', '', '', '', '', '', '', '');

-- Admins Table
INSERT INTO admins (username, passwrd, first_name, last_name) VALUES ('admin1', 'cr7', 'Cristiano', 'Ronaldo');
INSERT INTO admins (username, passwrd, first_name, last_name) VALUES ('admin2', 'lm10', 'Lionel', 'Messi');
INSERT INTO admins (username, passwrd, first_name, last_name) VALUES ('admin3', 'mo10', 'Mohamed', 'Salah');
INSERT INTO admins (username, passwrd, first_name, last_name) VALUES ('admin4', 'N10', 'Neymar', 'Jr');
INSERT INTO admins (username, passwrd, first_name, last_name) VALUES ('admin5', 'TK8', 'Toni', 'Kroos');


INSERT INTO rooms (roomID, capacity, layout) VALUES (1, 20, '240 x 240');
INSERT INTO rooms (roomID, capacity, layout) VALUES (2, 20, '400 x 400');
INSERT INTO rooms (roomID, capacity, layout) VALUES (3, 100, '1000 x 1000');

INSERT INTO equipment (roomID, equipmentName, equipmentStatus, equipmentLastMaintenance) VALUES (1,'Multi Gym',25,'2024-01-01');
INSERT INTO equipment (roomID, equipmentName, equipmentStatus, equipmentLastMaintenance) VALUES (1, 'Bench Press',50, '2024-01-01');
INSERT INTO equipment (roomID, equipmentName, equipmentStatus, equipmentLastMaintenance) VALUES (1, 'Tricep Pushdown',72, '2024-01-01');
INSERT INTO equipment (roomID, equipmentName, equipmentStatus, equipmentLastMaintenance) VALUES (1,'Lat Pulldown',98,'2024-01-01');
INSERT INTO equipment (roomID, equipmentName, equipmentStatus, equipmentLastMaintenance) VALUES (1, 'Cardio Bike',65, '2024-01-01');
INSERT INTO equipment (roomID, equipmentName, equipmentStatus, equipmentLastMaintenance) VALUES (1, 'Leg Press',91, '2024-01-01');