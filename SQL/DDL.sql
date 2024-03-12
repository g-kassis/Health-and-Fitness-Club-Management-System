
--members section

CREATE TABLE members(
	username VARCHAR(50) PRIMARY KEY,
	passwrd VARCHAR(50),
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	age INT,
	gender VARCHAR(6),
	country VARCHAR(20)
);

CREATE TABLE fitnessGoals(
	username VARCHAR(50),
	weight_goal VARCHAR(15),
	muscle_goal VARCHAR(15),
	endurance_goal VARCHAR(15),
	flexibility_goal VARCHAR(15),
	FOREIGN KEY (username) REFERENCES members(username)
);

CREATE TABLE healthMetrics(
	username VARCHAR(50),
	weight INT,
	height INT,
	FOREIGN KEY (username) REFERENCES members(username)
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

)
