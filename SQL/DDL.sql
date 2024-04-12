
--members section

CREATE TABLE members(
	username VARCHAR(50) PRIMARY KEY,
	passwrd VARCHAR(50),
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	age INT,
	gender VARCHAR(6),
	numGroupFitness INT,
	numPersonalSessions INT
);

CREATE TABLE fitnessGoals(
	username VARCHAR(50),
	weight_goal INT,
	muscle_goal INT,
	endurance_goal INT,
	FOREIGN KEY (username) REFERENCES members(username)
);

CREATE TABLE healthMetrics(
	username VARCHAR(50),
	weight INT,
	height INT,
	FOREIGN KEY (username) REFERENCES members(username)
);

CREATE TABLE exerciseRoutines(
	username VARCHAR(50),
	pushups boolean, 
	pullups boolean, 
	situps boolean, 
	deadlift boolean, 
	squats boolean,
	FOREIGN KEY (username) REFERENCES members(username)
);

CREATE TABLE fitnessAchievements(
	username VARCHAR(50),
	enduranceAchievement boolean,
	basketballAchievement boolean,
	memberAchievement boolean,
	weightAchievement boolean,
	cyclingAchievement boolean,
	footballAchievement boolean,
	FOREIGN KEY (username) REFERENCES members(username)
);


CREATE TABLE member1Sessions(
	time VARCHAR(5),
	mon VARCHAR(50),
	tue VARCHAR(50),
	wed VARCHAR(50),
	thu VARCHAR(50),
	fri VARCHAR(50),
	sat VARCHAR(50),
	sun VARCHAR(50)
);

CREATE TABLE member2Sessions(
	time VARCHAR(5),
	mon VARCHAR(50),
	tue VARCHAR(50),
	wed VARCHAR(50),
	thu VARCHAR(50),
	fri VARCHAR(50),
	sat VARCHAR(50),
	sun VARCHAR(50)
);

CREATE TABLE member3Sessions(
	time VARCHAR(5),
	mon VARCHAR(50),
	tue VARCHAR(50),
	wed VARCHAR(50),
	thu VARCHAR(50),
	fri VARCHAR(50),
	sat VARCHAR(50),
	sun VARCHAR(50)
);

CREATE TABLE member4Sessions(
	time VARCHAR(5),
	mon VARCHAR(50),
	tue VARCHAR(50),
	wed VARCHAR(50),
	thu VARCHAR(50),
	fri VARCHAR(50),
	sat VARCHAR(50),
	sun VARCHAR(50)
);

CREATE TABLE member5Sessions(
	time VARCHAR(5),
	mon VARCHAR(50),
	tue VARCHAR(50),
	wed VARCHAR(50),
	thu VARCHAR(50),
	fri VARCHAR(50),
	sat VARCHAR(50),
	sun VARCHAR(50)
);

--Trainers section

CREATE TABLE trainers(
	username VARCHAR(50) PRIMARY KEY,
	passwrd VARCHAR(50),
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	age INT,
	gender VARCHAR(6)
);


CREATE TABLE trainer1Schedule(
	time VARCHAR(5),
	mon VARCHAR(50),
	tue VARCHAR(50),
	wed VARCHAR(50),
	thu VARCHAR(50),
	fri VARCHAR(50),
	sat VARCHAR(50),
	sun VARCHAR(50)
);

CREATE TABLE trainer2Schedule(
	time VARCHAR(5),
	mon VARCHAR(50),
	tue VARCHAR(50),
	wed VARCHAR(50),
	thu VARCHAR(50),
	fri VARCHAR(50),
	sat VARCHAR(50),
	sun VARCHAR(50)
);

CREATE TABLE trainer3Schedule(
	time VARCHAR(5),
	mon VARCHAR(50),
	tue VARCHAR(50),
	wed VARCHAR(50),
	thu VARCHAR(50),
	fri VARCHAR(50),
	sat VARCHAR(50),
	sun VARCHAR(50)
);

CREATE TABLE trainer4Schedule(
	time VARCHAR(5),
	mon VARCHAR(50),
	tue VARCHAR(50),
	wed VARCHAR(50),
	thu VARCHAR(50),
	fri VARCHAR(50),
	sat VARCHAR(50),
	sun VARCHAR(50)
);

CREATE TABLE trainer5Schedule(
	time VARCHAR(5),
	mon VARCHAR(50),
	tue VARCHAR(50),
	wed VARCHAR(50),
	thu VARCHAR(50),
	fri VARCHAR(50),
	sat VARCHAR(50),
	sun VARCHAR(50)
);

--Admins section

CREATE TABLE admins(
	username VARCHAR(50) PRIMARY KEY,
	passwrd VARCHAR(50),
	first_name VARCHAR(50),
	last_name VARCHAR(50)

);

CREATE TABLE rooms(
	roomID INT PRIMARY KEY,
	capacity INT,
	layout VARCHAR(20)
);

CREATE TABLE roomBookings(
	roomID INT,
	dayBooked VARCHAR(5),
	timeBooked VARCHAR(5),
	trainer VARCHAR(50),
	event VARCHAR(50),
	FOREIGN KEY (roomID) REFERENCES rooms(roomID),
	FOREIGN KEY (trainer) REFERENCES trainers(username)
);

CREATE TABLE currentEvents(
	dayBooked VARCHAR(5),
	timeBooked VARCHAR(5),
	event VARCHAR(50),
	trainer VARCHAR(50),
	FOREIGN KEY (trainer) REFERENCES trainers(username)
);

CREATE TABLE equipment(
	roomID INT,
	equipmentName VARCHAR(20),
	equipmentStatus INT,
	equipmentLastMaintenance DATE,
	FOREIGN KEY (roomID) REFERENCES rooms(roomID)
);