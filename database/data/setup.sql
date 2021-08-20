-- Create a new database called 'ToDoDB'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT name
FROM sys.databases
WHERE name = N'ToDoDB'
)
CREATE DATABASE ToDoDB
GO

USE ToDoDB
GO

-- Create a new table called 'Users' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
DROP TABLE dbo.Users
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Users
(
    email [NVARCHAR](50) NOT NULL PRIMARY KEY,
    name [NVARCHAR](50) NOT NULL,
    role [NVARCHAR](50) NOT NULL CHECK (role in('admin', 'user')),
    password [NVARCHAR](50) NOT NULL,
    profile_picture [NVARCHAR](50),
    -- specify more columns here
);
GO

-- Insert rows into table 'Users'
INSERT INTO Users
    ([email],[name],[role],[password],[profile_picture])
VALUES
    ( N'admin@admin.com', N'Admin Tobias', N'admin', N'alma1234', N''),
    ( N'user1@gmail.com', N'User Jozsef', N'user', N'alma1234', N''),
    ( N'user2@gmail.com', N'Kelek Elek', N'user', N'alma1234', N'')
GO

-- Create a new table called 'ToDos' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.ToDos', 'U') IS NOT NULL
DROP TABLE dbo.ToDos
GO
-- Create the table in the specified schema
CREATE TABLE dbo.ToDos
(
    id INT NOT NULL IDENTITY PRIMARY KEY,
    -- primary key column
    responsible [NVARCHAR](50) NOT NULL,
    todo [NVARCHAR](300) NOT NULL,
    status [NVARCHAR](15) NOT NULL CHECK (Status in('ToDo', 'InProgress', 'InReview', 'Test', 'Done')),
    deadline DATETIME NOT NULL,
        FOREIGN KEY (responsible) REFERENCES Users(email),
    
    -- specify more columns here
);
GO

-- Insert rows into table 'ToDos'
INSERT INTO ToDos
    ( -- columns to insert data into
    [responsible], [todo], [status], [deadline]
    )
VALUES
    (N'admin@admin.com', N'Test initialize a toDo', N'ToDo', '20210823 10:50:00 AM'),
    (N'user1@gmail.com', N'Fill the database', N'ToDo', '20210823 10:50:00 AM'),
    (N'user2@gmail.com', N'Create todo query filter.', N'ToDo', '20210823 10:50:00 AM')

-- add more rows here
GO