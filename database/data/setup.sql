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
    Email [NVARCHAR](50) NOT NULL PRIMARY KEY,
    Name [NVARCHAR](50) NOT NULL,
    Role [NVARCHAR](50) NOT NULL CHECK (Role in('admin', 'user')),
    Password [NVARCHAR](50) NOT NULL,
    -- specify more columns here
);
GO

-- Insert rows into table 'Users'
INSERT INTO Users
   ([Email],[Name],[Role],[Password])
VALUES
   ( N'admin@admin.com', N'Admin Tobias', N'admin', N'alma1234')
GO

-- Create a new table called 'ToDos' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.ToDos', 'U') IS NOT NULL
DROP TABLE dbo.ToDos
GO
-- Create the table in the specified schema
CREATE TABLE dbo.ToDos
(
    ToDoId INT NOT NULL PRIMARY KEY, -- primary key column
    Responsible [NVARCHAR](50) NOT NULL,
    Todo [NVARCHAR](50) NOT NULL,
    Status [NVARCHAR](15) NOT NULL CHECK (Status in('ToDo', 'InProgress', 'InReview', 'Test', 'Done'))
    FOREIGN KEY (Responsible) REFERENCES Users(Email),
    -- specify more columns here
);
GO

-- Insert rows into table 'ToDos'
INSERT INTO ToDos
( -- columns to insert data into
 [ToDoId], [Responsible], [ToDo], [Status]
)
VALUES
( -- first row: values for the columns in the list above
 1, N'admin@admin.com', N'Test initialize a toDo', N'ToDo'
)
-- add more rows here
GO
