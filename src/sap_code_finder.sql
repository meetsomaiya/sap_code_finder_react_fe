CREATE TABLE merged_table3 (
    id INT PRIMARY KEY,
    material_code VARCHAR(255),
    material_description VARCHAR(MAX),
    alternate_flag NVARCHAR(10), 
    material_image VARCHAR(MAX),
    model VARCHAR(MAX),

);

-- CREATE TABLE images_uploaded (
--     id INT IDENTITY(1,1) PRIMARY KEY,
--     domain_id INT NOT NULL,
--     material_code VARCHAR(255),
--     material_image VARCHAR(MAX),
--     img BIT NULL,
--     img_site_incharge BIT NULL,
--     img_accepted BIT NULL,
--     site_incharge_accepted VARCHAR(255) NULL,
--     o_e_accepted VARCHAR(255) NULL
-- );

CREATE TABLE images_uploaded (
    id INT IDENTITY(1,1) PRIMARY KEY,
    domain_id INT NOT NULL,
    material_code VARCHAR(255),
    material_image VARCHAR(MAX),
    image_category VARCHAR(MAX),
    img BIT NULL,
    img_site_incharge BIT NULL,
    img_accepted BIT NULL,
    site_incharge_accepted VARCHAR(255) NULL,
    o_e_accepted VARCHAR(255) NULL
);

-- CREATE TABLE model_uploaded (
--     id INT IDENTITY(1,1) PRIMARY KEY,
--     domain_id INT NOT NULL,
--     material_code VARCHAR(255) UNIQUE,
--     model_code VARCHAR(MAX),
--     model_submitted BIT NULL,
--     model_accepted BIT NULL
-- );


CREATE TABLE model_uploaded (
    id INT IDENTITY(1,1) PRIMARY KEY,
    domain_id INT NOT NULL,
    material_code VARCHAR(255) UNIQUE,
    model_code VARCHAR(MAX),
    model_submitted BIT NULL,
    site_incharge_model_accepted BIT NULL,
    model_accepted BIT NULL,
    site_incharge_accepted VARCHAR(255) NULL,
    o_e_accepted VARCHAR(255) NULL
);


-- -- Create a new login table with domain_id as primary key and id as varchar(255)
-- CREATE TABLE [login] (
--   [id] VARCHAR(255) NULL,
--   [domain_id] varchar(20),
--   [name] VARCHAR(255)  NULL,
--   [email] VARCHAR(255)  NULL,
--   [last_login_time] DATETIME NULL,
--   [access] VARCHAR(255) NULL;
-- );

-- -- insert the sample data into the new table
-- INSERT INTO [login] ([domain_id], [name], [email],  [last_login_time], [access])
-- VALUES
-- (40139, 'Meet Somaiya', 'Meet.Somaiya@suzlon.com', NULL, 'site_incharge');

-- Create a new login table with domain_id as primary key and id as varchar(255)
CREATE TABLE [login] (
  [id] VARCHAR(255) NULL,
  [domain_id] varchar(20),
  [name] VARCHAR(255)  NULL,
  [email] VARCHAR(255)  NULL,
  [last_login_time] DATETIME NULL,
  [access] VARCHAR(255) NULL,
  [category] VARCHAR(255) NULL

);

-- insert the sample data into the new table
INSERT INTO [login] ([domain_id], [name], [email],  [last_login_time], [access],[category] )
VALUES
(40139, 'Meet Somaiya', 'Meet.Somaiya@suzlon.com', NULL, 'o_e', 'electrical');


-- create a new admins table with domain_id as primary key and id as varchar(255)
CREATE TABLE [admins] (
  [id] VARCHAR(255) NULL,
  [domain_id] varchar(20),
  [name] VARCHAR(255) NULL,
  [email] VARCHAR(255) NULL,
  [last_login_time] DATETIME NULL
);

-- insert the sample data into the new table
INSERT INTO [admins] ([domain_id], [name], [email],  [last_login_time])
VALUES
(40139, 'Meet Somaiya', 'Meet.Somaiya@suzlon.com', NULL);
('rautr', 'Rahul Raut', 'rahul.raut@suzlon.com', NULL);


CREATE TABLE material_images_replaced (
    id INT IDENTITY(1,1) PRIMARY KEY,
    material_code VARCHAR(255),
    previous_material_image VARCHAR(MAX),
    new_material_image VARCHAR(MAX),
    replaced_By VARCHAR(255) NULL
 
);




/* total logins table */

CREATE TABLE [total_logins] (
  id INT IDENTITY(1,1) PRIMARY KEY,
  [domain_id] VARCHAR(255) NULL,
  [name] VARCHAR(255) NULL,
  [email] VARCHAR(255) NULL,
  [last_login_time] DATETIME NULL,
  [last_logout_time] DATETIME NULL,
  times_logged_in INT,
  previous_session_time DECIMAL(18, 2) DEFAULT 0.00,
  total_time_spent DECIMAL(10, 2) DEFAULT 0.00, -- Initialize with a default value of 0
  average_time_spent DECIMAL(10, 2) DEFAULT 0.00 -- Adjust the data type to DECIMAL with 10 total digits and 2 decimal places
);

-- Create the master_password table
CREATE TABLE master_password (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_master_password VARCHAR(7),
    admin_master_password VARCHAR(7)
);

-- Function to generate a random 7-letter password
DECLARE @userPassword VARCHAR(7), @adminPassword VARCHAR(7);

-- Generate random 7-letter passwords for user and admin
SET @userPassword = LEFT(NEWID(), 7);
SET @adminPassword = LEFT(NEWID(), 7);

-- Insert the passwords into the table
INSERT INTO master_password (user_master_password, admin_master_password)
VALUES (@userPassword, @adminPassword);

-- Verify the inserted data
SELECT * FROM master_password;