--CREATE SCHEMA core;
--GO

--CREATE SCHEMA inv;
--GO

--CREATE SCHEMA shared;
--GO

/**
* 
* ENUM - tenant.status (Active: 1, Inactive : 2, Suspended: 3, Terminated: 4, Archieve: 5)
* ENUM - user.status (Active: 1, Inactive: 2, Suspended: 3)
* ENUM - user.type (Superadmin: 1, admin: 2, normal: 3)
* ENUM - userinfo.gender (Male: 1, Female: 2, Others: 3)
* ENUM - screen.type (Analog: 1, Digital: 2)
* ENUM - screen.placement_type (Indoor: 1, Outdoor: 2)
* 
**/


CREATE TABLE core.[User]
(
id INT PRIMARY KEY IDENTITY(1,1),
userName NVARCHAR(50) NOT NULL UNIQUE,
[password] VARBINARY(60) NOT NULL,
[status] INT DEFAULT 1,
[type] INT DEFAULT 3,
email NVARCHAR(30) NOT NULL UNIQUE,
tenantId INT NOT NULL,
createdBy INT NOT NULL,
createdAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
updatedBY INT NULL,
updatedAt DATETIME NULL
);
GO

ALTER TABLE core.[User]
ADD CONSTRAINT UQ_User_UserName_Tenant
UNIQUE (userName, tenantId);
GO

CREATE TABLE core.Tenant
(
id INT PRIMARY KEY IDENTITY(1,1),
tenantName NVARCHAR(50) NOT NULL,
country NVARCHAR(50) NOT NULL,
city NVARCHAR(50) NOT NULL,
[status] TINYINT NOT NULL DEFAULT 1,
isDeleted BIT NOT NULL DEFAULT 0,
createdBy INT NOT NULL,
createdAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
updatedBy INT NULL,
updatedAt DATETIME NULL,
);
GO

-- Alter tables User and Tenant
ALTER TABLE core.[User]
ADD CONSTRAINT fk_tenant_user
FOREIGN KEY (tenantId) REFERENCES core.Tenant (id);

ALTER TABLE core.[User]
ADD CONSTRAINT fk_user_createdBy
FOREIGN KEY (createdBy) REFERENCES core.[User] (id);

ALTER TABLE core.[User]
ADD CONSTRAINT fk_user_updatedBy
FOREIGN KEY (updatedBy) REFERENCES core.[User] (id);

ALTER TABLE core.Tenant
ADD CONSTRAINT fk_tenant_createdBy
FOREIGN KEY (createdBy) REFERENCES core.[User] (id);

ALTER TABLE core.Tenant
ADD CONSTRAINT fk_tenant_updatedBy
FOREIGN KEY (updatedBy) REFERENCES core.[User] (id);


CREATE TABLE core.UserInfo
(
id INT PRIMARY KEY IDENTITY(1,1),
userId INT NOT NULL,
firstName NVARCHAR(20) NOT NULL,
middleName NVARCHAR(20) NULL,
lastName NVARCHAR(20) NOT NULL,
dob DATE NULL,
gender INT NULL,
contactNo NVARCHAR(15) NULL,
nationality CHAR(5) NOT NULL, -- Eg. NP,
createdBy INT NOT NULL,
createdAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
updatedBy INT NULL,
updatedAt DATETIME NULL,
CONSTRAINT fk_userinfo_createBy
FOREIGN KEY (createdBy) REFERENCES core.[User] (id),
CONSTRAINT fk_userinfo_updateBy
FOREIGN KEY (updatedBy) REFERENCES core.[User] (id),
CONSTRAINT fk_user_userinfo
FOREIGN KEY (userid) REFERENCES core.[User] (id)
);
GO

CREATE TABLE shared.UserRole
(
	id INT PRIMARY KEY IDENTITY(1,1),
	tenantId INT NULL, -- NULL means it's a "System" role available to everyone
	[name] NVARCHAR(50) NOT NULL,
	isSystemRole BIT NOT NULL DEFAULT 0, -- Prevents deletion of core roles.
	createdBy INT NOT NULL,
	createdAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
	updatedBy INT NULL,
	updatedAt DATETIME NULL
);
GO

ALTER TABLE shared.UserRole
ADD CONSTRAINT fk_userrole_created
FOREIGN KEY (createdBy) REFERENCES core.[User] (id);
GO

ALTER TABLE shared.UserRole
ADD CONSTRAINT fk_userrole_updated
FOREIGN KEY (updatedBy) REFERENCES core.[User] (id);
GO

CREATE TABLE shared.UserRoleMapping
(
	id INT PRIMARY KEY IDENTITY(1,1),
	userId INT NOT NULL,
	roleId INT NOT NULL,
	tenantId INT NOT NULL,
	assignedAt DATETIME DEFAULT GETUTCDATE(),
	assignedBy INT NOT NULL,

	CONSTRAINT fk_usrmapping_userId
	FOREIGN KEY (userId) REFERENCES core.[User] (id),
	CONSTRAINT fk_usrmapping_roloeId
	FOREIGN KEY (roleId) REFERENCES shared.UserRole (id),
	CONSTRAINT fk_usrmapping_tenantId
	FOREIGN KEY (tenantId) REFERENCES core.Tenant (id),
	CONSTRAINT fk_usrmapping_assignedBy
	FOREIGN KEY (assignedBy) REFERENCES core.[User] (id)
);
GO

CREATE TABLE inv.Screen
(
id INT PRIMARY KEY IDENTITY(1,1),
tenantId INT NULL,
screenName NVARCHAR(20) NOT NULL,
specification NVARCHAR(500) NOT NULL,
country NVARCHAR(15) NOT NULL,
city NVARCHAR(15) NOT NULL,
placementType INT NOT NULL,
placement NVARCHAR(25) NOT NULL,
avgViewer INT NOT NULL,
basePrice DECIMAL(10,2) NOT NULL,
[status] INT NOT NULL DEFAULT 1,
[type] INT NOT NULL,
isDeleted BIT NOT NULL DEFAULT 0,
createdBy INT NOT NULL,
createdAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
updatedBy INT NULL,
updatedAt DATETIME NULL,
CONSTRAINT fk_screen_createBy
FOREIGN KEY (createdBy) REFERENCES core.[User] (id),
CONSTRAINT fk_screen_updateBy
FOREIGN KEY (updatedBy) REFERENCES core.[User] (id),
CONSTRAINT fk_tenant_screen
FOREIGN KEY (tenantId) REFERENCES core.Tenant (id)
);
GO

ALTER TABLE inv.Screen
ADD CONSTRAINT UQ_Tenant_Screen_Location 
UNIQUE (tenantId, screenName, city);
GO

CREATE TABLE inv.Player
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    tenantId INT NOT NULL,

    playerCode NVARCHAR(50) NOT NULL UNIQUE,
    deviceSerial NVARCHAR(100) NULL,
    deviceModel NVARCHAR(100) NULL,
    osVersion NVARCHAR(50) NULL,
    firmwareVersion NVARCHAR(50) NULL,

    ipAddress VARCHAR(50) NULL,
    macAddress VARCHAR(50) NULL,

    [status] INT NOT NULL DEFAULT 1,  -- 1=Active,2=Offline,3=Maintenance
    lastHeartbeat DATETIME NULL,

    isDeleted BIT NOT NULL DEFAULT 0,

    createdBy INT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    updatedBy INT NULL,
    updatedAt DATETIME NULL,

    CONSTRAINT fk_player_tenant
        FOREIGN KEY (tenantId) REFERENCES core.Tenant(id),

    CONSTRAINT fk_player_createdBy
        FOREIGN KEY (createdBy) REFERENCES core.[User](id),

    CONSTRAINT fk_player_updatedBy
        FOREIGN KEY (updatedBy) REFERENCES core.[User](id)
);

CREATE TABLE inv.ScreenPlayer
(
    id INT IDENTITY(1,1) PRIMARY KEY,

    tenantId INT NOT NULL,
    screenId INT NOT NULL,
    playerId INT NOT NULL,

    assignedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    unassignedAt DATETIME NULL,

    [status] INT NOT NULL DEFAULT 1,

    isDeleted BIT NOT NULL DEFAULT 0,

    createdBy INT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    updatedBy INT NULL,
    updatedAt DATETIME NULL,

    CONSTRAINT fk_screenplayer_tenant
        FOREIGN KEY (tenantId) REFERENCES core.Tenant(id),

    CONSTRAINT fk_screenplayer_screen
        FOREIGN KEY (screenId) REFERENCES inv.Screen(id),

    CONSTRAINT fk_screenplayer_player
        FOREIGN KEY (playerId) REFERENCES inv.Player(id),

    CONSTRAINT fk_screenplayer_createdBy
        FOREIGN KEY (createdBy) REFERENCES core.[User](id),

    CONSTRAINT fk_screenplayer_updatedBy
        FOREIGN KEY (updatedBy) REFERENCES core.[User](id)
);
