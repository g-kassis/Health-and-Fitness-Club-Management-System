--Members Table
INSERT INTO members (username, passwrd, first_name, last_name, age, gender) VALUES ('user1', 'ironman', 'Tony', 'Stark', '35', 'Male');
INSERT INTO members (username, passwrd, first_name, last_name, age, gender) VALUES ('user2', 'thor', 'Thor', 'Odinson', '30', 'Male');
INSERT INTO members (username, passwrd, first_name, last_name, age, gender) VALUES ('user3', 'blackWidow', 'Natasha', 'Romanoff', '30', 'Female');
INSERT INTO members (username, passwrd, first_name, last_name, age, gender) VALUES ('user4', 'cptAmerica', 'Steve', 'Rogers', '30', 'Male');
INSERT INTO members (username, passwrd, first_name, last_name, age, gender) VALUES ('user5', 'hulk', 'Bruce', 'Banner', '32', 'Male');

--members fitness goals and health metrics
INSERT INTO fitnessGoals (username, weight_goal, muscle_goal, endurance_goal, flexibility_goal) VALUES ('user1', 'Gain', 'Gain', 'Gain', 'Maintain');
INSERT INTO fitnessGoals (username, weight_goal, muscle_goal, endurance_goal, flexibility_goal) VALUES ('user2', 'Gain', 'Gain', 'Gain', 'Gain');
INSERT INTO fitnessGoals (username, weight_goal, muscle_goal, endurance_goal, flexibility_goal) VALUES ('user3', 'Lose', 'Maintain', 'Gain', 'Maintain');
INSERT INTO fitnessGoals (username, weight_goal, muscle_goal, endurance_goal, flexibility_goal) VALUES ('user4', 'Gain', 'Gain', 'Gain', 'Gain');
INSERT INTO fitnessGoals (username, weight_goal, muscle_goal, endurance_goal, flexibility_goal) VALUES ('user5', 'Gain', 'Gain', 'Maintain', 'Gain');

INSERT INTO healthMetrics (username, weight, height) VALUES ('user1', 225, 185);
INSERT INTO healthMetrics (username, weight, height) VALUES ('user2', 640, 198);
INSERT INTO healthMetrics (username, weight, height) VALUES ('user3', 131, 170);
INSERT INTO healthMetrics (username, weight, height) VALUES ('user4', 240, 187);
INSERT INTO healthMetrics (username, weight, height) VALUES ('user5', 128, 175);

--Trainers Table
INSERT INTO trainers (username, passwrd, first_name, last_name, age, gender) VALUES ('trainer1', 'batman', 'Bruce', 'Wayne', '35', 'Male');
INSERT INTO trainers (username, passwrd, first_name, last_name, age, gender) VALUES ('trainer2', 'superman', 'Clark', 'Kent', '30', 'Male');
INSERT INTO trainers (username, passwrd, first_name, last_name, age, gender) VALUES ('trainer3', 'wonderWoman', 'Diana', 'Prince', '5000', 'Female');
INSERT INTO trainers (username, passwrd, first_name, last_name, age, gender) VALUES ('trainer4', 'batgirl', 'Barbara', 'Gordon', '24', 'Female');
INSERT INTO trainers (username, passwrd, first_name, last_name, age, gender) VALUES ('trainer5', 'greenArrow', 'Oliver', 'Queen', '32', 'Male');

--trainers schedules 
INSERT INTO trainer1Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('9am', 'UNAVAILABLE', '', '', '', '', '', '');
INSERT INTO trainer1Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO trainer1Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('11am', '', '', '', '', '', '', '');
INSERT INTO trainer1Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('12pm', '', '', '', '', '', 'UNAVAILABLE', '');
INSERT INTO trainer1Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO trainer1Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('2pm', 'UNAVAILABLE', '', '', '', '', '', '');
INSERT INTO trainer1Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO trainer1Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('4pm', '', '', '', '', '', '', 'UNAVAILABLE');
INSERT INTO trainer1Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('5pm', '', 'UNAVAILABLE', '', '', '', '', '');

INSERT INTO trainer2Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('9am', '', '', '', '', '', '', 'UNAVAILABLE');
INSERT INTO trainer2Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO trainer2Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('11am', '', '', '', '', '', '', '');
INSERT INTO trainer2Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('12pm', '', '', 'UNAVAILABLE', '', '', '', '');
INSERT INTO trainer2Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO trainer2Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('2pm', '', '', '', '', '', '', '');
INSERT INTO trainer2Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO trainer2Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('4pm', '', '', '', '', '', '', '');
INSERT INTO trainer2Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('5pm', 'UNAVAILABLE', '', '', '', '', '', '');

INSERT INTO trainer3Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('9am', '', '', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('11am', '', 'UNAVAILABLE', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('12pm', '', '', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('2pm', '', '', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO trainer3Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('4pm', '', '', '', '', 'UNAVAILABLE', '', '');
INSERT INTO trainer3Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('5pm', '', '', '', '', '', '', '');

INSERT INTO trainer4Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('9am', '', '', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('11am', '', '', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('12pm', '', '', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('2pm', '', 'UNAVAILABLE', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO trainer4Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('4pm', '', '', '', '', 'UNAVAILABLE', '', '');
INSERT INTO trainer4Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('5pm', '', '', '', '', '', '', '');

INSERT INTO trainer5Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('9am', '', '', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('10am', '', '', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('11am', '', 'UNAVAILABLE', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('12pm', '', '', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('1pm', '', '', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('2pm', '', 'UNAVAILABLE', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('3pm', '', '', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('4pm', '', '', '', '', '', '', '');
INSERT INTO trainer5Schedule (time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('5pm', '', '', '', '', '', '', '');

-- Admins Table
INSERT INTO admins (username, passwrd, first_name, last_name) VALUES ('admin1', 'cr7', 'Cristiano', 'Ronaldo');
INSERT INTO admins (username, passwrd, first_name, last_name) VALUES ('admin2', 'lm10', 'Lionel', 'Messi');
INSERT INTO admins (username, passwrd, first_name, last_name) VALUES ('admin3', 'mo10', 'Mohamed', 'Salah');
INSERT INTO admins (username, passwrd, first_name, last_name) VALUES ('admin4', 'N10', 'Neymar', 'Jr');
INSERT INTO admins (username, passwrd, first_name, last_name) VALUES ('admin5', 'TK8', 'Toni', 'Kroos');