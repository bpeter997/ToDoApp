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
    password [NVARCHAR](80) NOT NULL,
    profile_picture [NVARCHAR](50),
);
GO

-- Insert rows into table 'Users'
INSERT INTO Users
    ([email],[name],[role],[password],[profile_picture])
VALUES
    ( N'admin@admin.com', N'Admin Tobias', N'admin', N'$2a$08$pjpwZFvbBSj/l7/erXapKOuQShar0esV4yqocxO4rkwGfJHMXiCie', N'default.jpg'),
    ( N'user1@gmail.com', N'User Jozsef', N'user', N'$2a$08$pjpwZFvbBSj/l7/erXapKOuQShar0esV4yqocxO4rkwGfJHMXiCie', N'default.jpg'),
    ( N'user2@gmail.com', N'Kelek Elek', N'user', N'$2a$08$pjpwZFvbBSj/l7/erXapKOuQShar0esV4yqocxO4rkwGfJHMXiCie', N'default.jpg')
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
    email [NVARCHAR](50) NOT NULL,
    todo [NVARCHAR](300) NOT NULL,
    status [NVARCHAR](15) NOT NULL CHECK (Status in('ToDo', 'InProgress', 'InReview', 'Test', 'Done')),
    deadline DATETIME NOT NULL,
        FOREIGN KEY (email) 
        REFERENCES Users(email) ON DELETE CASCADE,
);
GO

-- Insert rows into table 'ToDos'
INSERT INTO ToDos
    ( -- columns to insert data into
    [email], [todo], [status], [deadline]
    )
VALUES
    (N'admin@admin.com', N'Test initialize a toDo', N'ToDo', '20210911 10:50:00 AM'),
    (N'admin@admin.com', N'Register users', N'ToDo', '20210826 11:34:00 AM'),
    (N'admin@admin.com', N'Delete some todo', N'ToDo', '20210925 05:30:00 PM'),
    (N'admin@admin.com', N'Clean the window', N'ToDo', '20211006 02:50:00 PM'),
    (N'admin@admin.com', N'Cut the grass', N'ToDo', '20210909 01:20:00 PM'),
    (N'admin@admin.com', N'Go to shopping', N'ToDo', '20210829 8:25:00 AM'),
    (N'user1@gmail.com', N'Fill the database', N'ToDo', '20211023 07:50:00 AM'),
    (N'user1@gmail.com', N'Make a coffee', N'ToDo', '20210823 11:10:00 AM'),
    (N'user1@gmail.com', N'Repair the front door', N'ToDo', '20210825 12:01:00 PM'),
    (N'user1@gmail.com', N'Empty the rubbish', N'ToDo', '20210823 10:50:00 AM'),
    (N'user1@gmail.com', N'Simly do somethinf', N'ToDo', '20211010 06:50:00 AM'),
    (N'user2@gmail.com', N'Create todo query filter.', N'ToDo', '20210823 10:50:00 AM')

GO