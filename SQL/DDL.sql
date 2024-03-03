
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
	username VARCHAR(50) PRIMARY KEY,
	weight_goal VARCHAR(15),
	muscle_goal VARCHAR(15),
	endurance_goal VARCHAR(15),
	flexibility_goal VARCHAR(15)
);

CREATE TABLE healthMetrics(
	username VARCHAR(50) PRIMARY KEY,
	weight INT,
	height INT
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

--Admins section

CREATE TABLE admins(
	username VARCHAR(50) PRIMARY KEY,
	passwrd VARCHAR(50),
	first_name VARCHAR(50),
	last_name VARCHAR(50)

)
