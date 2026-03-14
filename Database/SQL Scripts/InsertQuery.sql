
-- Removing constraint check
ALTER TABLE core.[User] NOCHECK CONSTRAINT ALL;
ALTER TABLE core.Tenant NOCHECK CONSTRAINT ALL;
GO

-- First User
SET IDENTITY_INSERT core.[User] ON;

INSERT INTO core.[User]
(id, userName, [password], [status], [type], email, tenantId, createdBy)
VALUES
(1, 'dooClick', CONVERT(VARBINARY(60), 'dooClick@123'), 1, 1, 'dooClick@adzen.com', 1, 1);

SET IDENTITY_INSERT core.[User] OFF;
GO

-- Tenant Insert
SET IDENTITY_INSERT core.Tenant ON;

INSERT INTO core.Tenant
(id, tenantName, country, city, status, createdBy)
VALUES
(1, 'Adzen Tech', 'Nepal', 'Kathmandu', 1, 1),
(2, 'Himalayan Screens', 'Nepal', 'Pokhara', 1, 1),
(3, 'Terai Digital', 'Nepal', 'Biratnagar', 1, 1),
(4, 'City Vision Media', 'Nepal', 'Lalitpur', 1, 1),
(5, 'Urban LED Network', 'Nepal', 'Bhaktapur', 1, 1),
(6, 'Metro Display Co', 'India', 'Delhi', 1, 1),
(7, 'Smart City Ads', 'India', 'Mumbai', 1, 1),
(8, 'Skyline Media', 'Bangladesh', 'Dhaka', 1, 1),
(9, 'Transit Screen Co', 'Sri Lanka', 'Colombo', 1, 1),
(10, 'ASEAN Outdoor', 'Thailand', 'Bangkok', 1, 1);

SET IDENTITY_INSERT core.Tenant OFF;
GO

-- Enabling table check constriant
ALTER TABLE core.[User] CHECK CONSTRAINT ALL;
ALTER TABLE core.Tenant CHECK CONSTRAINT ALL;
GO

-- Tenant Admins (id 2-11)
DECLARE @i INT = 2;

WHILE @i <= 10
BEGIN
	INSERT INTO core.[User]
	(userName, [password], [status], [type], email, tenantId, createdBy)
	VALUES
	(
		CONCAT('tenant_admin_', @i-1),
		CONVERT(VARBINARY(60), 'Admin@123'),
		1,
		2,
		CONCAT('admin', @i-1, '@gmail.com'),
		@i,
		1
	);
	SET @i += 1;
END;
GO

-- Normal user
DECLARE @i INT = 12;

WHILE @i <= 50
BEGIN
	INSERT INTO core.[User]
	(userName, [password], [status], [type], email, tenantId, createdBy)
	VALUES
	(
		CONCAT('user_', @i-1),
		CONVERT(VARBINARY(60), 'User@123'),
		1,
		2,
		CONCAT('user', @i-1, '@gmail.com'),
		((@i-1) % 10) + 2, -- At the case of _9 eg. 19, 29.. Id = 11 which violate FK constraint.
		((@i-1) % 10) + 2
	);
	SET @i += 1;
END;
GO

--DELETE FROM core.[User];
--DBCC CHECKIDENT ('core.[User]', RESEED, 0);
--GO

--DELETE FROM core.Tenant;
--DBCC CHECKIDENT('core.Tenant', RESEED, 0);
--GO

INSERT INTO core.UserInfo
(userId, firstName, middleName, lastName, dob, gender, contactNo, nationality, createdBy)
VALUES
(1,'Sanjay',NULL,'Shrestha','1985-04-12',1,'9841000001','NP',1),
(2,'Ramesh',NULL,'Adhikari','1987-02-18',1,'9841000002','NP',1),
(3,'Prakash',NULL,'Koirala','1986-09-09',1,'9841000003','NP',1),
(4,'Anil',NULL,'Thapa','1988-06-21',1,'9841000004','NP',1),
(5,'Suman',NULL,'Basnet','1989-11-30',1,'9841000005','NP',1),
(6,'Amit',NULL,'Shah','1984-01-15',1,'9818000006','IN',1),
(7,'Rohit',NULL,'Mehta','1986-08-07',1,'9818000007','IN',1),
(8,'Hasan',NULL,'Rahman','1987-05-19',1,'0171000008','BD',1),
(9,'Nuwan',NULL,'Perera','1985-12-03',1,'0777000009','LK',1),
(10,'Somchai',NULL,'Wattanakul','1983-03-25',1,'0899000010','TH',1),

(11,'Bikash',NULL,'Pandey','1988-07-14',1,'9841000011','NP',3),
(12,'Sunita',NULL,'Shrestha','1994-02-11',2,'9841000012','NP',4),
(13,'Nabin',NULL,'Maharjan','1993-06-28',1,'9841000013','NP',5),
(14,'Pratima',NULL,'Dangol','1995-01-09',2,'9841000014','NP',6),
(15,'Ashish',NULL,'Rana','1992-10-17',1,'9841000015','NP',7),
(16,'Kiran',NULL,'KC','1991-05-03',1,'9841000016','NP',8),
(17,'Sneha',NULL,'Joshi','1996-04-22',2,'9818000017','IN',9),
(18,'Vikas',NULL,'Gupta','1992-12-01',1,'9818000018','IN',10),
(20,'Arif',NULL,'Hossain','1993-09-15',1,'0171000019','BD',2),
(21,'Dilini',NULL,'Fernando','1995-07-07',2,'0777000020','LK',3),

(22,'Sagar',NULL,'Bhandari','1994-11-05',1,'9841000021','NP',4),
(23,'Alisha',NULL,'Karki','1996-03-18',2,'9841000022','NP',5),
(24,'Bibek',NULL,'Shah','1991-08-30',1,'9841000023','NP',6),
(25,'Manisha',NULL,'Gurung','1993-02-27',1,'9841000024','NP',7),
(26,'Rajan',NULL,'Poudel','1990-09-12',1,'9841000025','NP',8),
(27,'Pooja',NULL,'Acharya','1996-01-21',2,'9841000026','NP',9),
(28,'Nitesh',NULL,'Rawal','1992-04-08',1,'9841000027','NP',10),
(30,'Shristi',NULL,'Shakya','1995-06-16',2,'9841000028','NP',2),
(31,'Dipesh',NULL,'Lama','1991-12-19',1,'9841000029','NP',3),
(32,'Anusha',NULL,'Rai','1994-09-03',2,'9841000030','NP',4),

(33,'Deepak',NULL,'Khatri','1990-03-11',1,'9841000031','NP',5),
(34,'Sujata',NULL,'Nepal','1996-08-25',2,'9841000032','NP',6),
(35,'Rabin',NULL,'Tamrakar','1992-02-14',1,'9841000033','NP',7),
(36,'Karuna',NULL,'Malla','1995-05-06',2,'9841000034','NP',8),
(37,'Ujjwal',NULL,'Bohara','1991-10-28',1,'9841000035','NP',9),
(38,'Isha',NULL,'Joshi','1997-01-17',2,'9841000036','NP',10),
(40,'Roshan',NULL,'Shahi','1993-04-23',1,'9841000037','NP',2),
(41,'Smriti',NULL,'Panta','1996-07-09',2,'9841000038','NP',3),
(42,'Aayush',NULL,'Regmi','1994-12-31',2,'9841000039','NP',4),
(43,'Nisha',NULL,'Ghimire','1995-11-13',2,'9841000040','NP',5),

(44,'Kamal',NULL,'Thapa','1990-06-05',1,'9841000041','NP',1),
(45,'Ritu',NULL,'Bista','1996-03-29',2,'9841000042','NP',1),
(46,'Sandeep',NULL,'Kunwar','1992-08-18',1,'9841000043','NP',1),
(47,'Anjali',NULL,'Aryal','1997-02-07',2,'9841000044','NP',1),
(48,'Hemant',NULL,'Joshi','1991-09-26',1,'9841000045','NP',1);


INSERT INTO inv.Screen
(tenantId, screenName, specification, country, city, placementType, placement,
 avgViewer, basePrice, status, type, createdBy)
VALUES
-- 1–10 Nepal (Kathmandu)
(2,'KTM-NewRoad-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Nepal','Kathmandu',2,'New Road Junction',18000,6500,1,2,2),
(2,'KTM-Kalanki-01','Outdoor LED P6, 4K, 6500 nits, 10x20 ft','Nepal','Kathmandu',2,'Kalanki Chowk',22000,8500,1,2,2),
(2,'KTM-Koteshwor-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Nepal','Kathmandu',2,'Koteshwor',20000,7000,1,2,2),
(2,'KTM-Gongabu-01','Outdoor LED P6, 4K, 6500 nits, 10x18 ft','Nepal','Kathmandu',2,'Gongabu Bus Park',21000,8200,1,2,2),
(3,'KTM-Thapathali-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Nepal','Kathmandu',2,'Thapathali',19000,6800,1,2,2),
(3,'KTM-Tinkune-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Nepal','Kathmandu',2,'Tinkune',17500,6600,1,2,2),
(3,'KTM-Baneshwor-01','Outdoor LED P6, 4K, 6500 nits, 10x18 ft','Nepal','Kathmandu',2,'New Baneshwor',23000,8800,1,2,2),
(3,'KTM-Boudha-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Nepal','Kathmandu',2,'Boudha',16000,6200,1,2,2),
(2,'KTM-Maitighar-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Nepal','Kathmandu',2,'Maitighar',18500,6700,1,2,2),
(3,'KTM-DurbarMarg-01','Outdoor LED P4, FHD, 6500 nits, 8x16 ft','Nepal','Kathmandu',2,'Durbar Marg',24000,9200,1,2,2),

-- 11–18 Nepal (Other cities)
(2,'PKR-Lakeside-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Nepal','Pokhara',2,'Lakeside',14000,5200,1,2,3),
(2,'PKR-Chipledhunga-01','Outdoor LED P6, 4K, 6500 nits, 10x18 ft','Nepal','Pokhara',2,'Chipledhunga',15000,5400,1,2,3),
(2,'PKR-Bagar-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Nepal','Pokhara',2,'Bagar',13500,5000,1,2,3),
(3,'BRT-Mahendra-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Nepal','Biratnagar',2,'Mahendra Chowk',12000,4800,1,2,4),
(3,'BRT-Rani-01','Outdoor LED P6, 4K, 6500 nits, 10x18 ft','Nepal','Biratnagar',2,'Rani',14000,5000,1,2,4),
(4,'LTP-Pulchowk-01','Indoor LED P2.5, FHD, 1200 nits, 6x10 ft','Nepal','Lalitpur',1,'Labim Mall',16000,6200,1,2,5),
(4,'LTP-Jawalakhel-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Nepal','Lalitpur',2,'Jawalakhel',17000,6100,1,2,5),
(5,'BKT-Suryabinayak-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Nepal','Bhaktapur',2,'Suryabinayak',11000,4500,1,2,6),

-- 19–30 India
(6,'DEL-CP-01','Outdoor LED P4, 4K, 6500 nits, 10x20 ft','India','Delhi',2,'Connaught Place',35000,12000,1,2,7),
(6,'DEL-KarolBagh-01','Outdoor LED P6, 4K, 6500 nits, 10x18 ft','India','Delhi',2,'Karol Bagh',30000,10500,1,2,7),
(6,'DEL-Lajpat-01','Outdoor LED P4, 4K, 6500 nits, 10x18 ft','India','Delhi',2,'Lajpat Nagar',28000,9800,1,2,7),
(6,'DEL-Noida-01','Outdoor LED P6, 4K, 6500 nits, 10x20 ft','India','Noida',2,'Sector 18',32000,11000,1,2,7),
(7,'MUM-Bandra-01','Outdoor LED P4, 4K, 6500 nits, 10x18 ft','India','Mumbai',2,'Bandra Linking Rd',40000,14000,1,2,8),
(7,'MUM-Andheri-01','Outdoor LED P6, 4K, 6500 nits, 10x20 ft','India','Mumbai',2,'Andheri East',38000,13500,1,2,8),
(7,'MUM-Dadar-01','Outdoor LED P4, 4K, 6500 nits, 10x18 ft','India','Mumbai',2,'Dadar',36000,13000,1,2,8),
(7,'MUM-Thane-01','Outdoor LED P4, 4K, 6500 nits, 10x18 ft','India','Thane',2,'Ghodbunder Rd',30000,10000,1,2,8),
(6,'DEL-Rohini-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','India','Delhi',2,'Rohini West',26000,9000,1,2,7),
(6,'DEL-Saket-01','Outdoor LED P4, 4K, 6500 nits, 10x18 ft','India','Delhi',2,'Saket',29000,10200,1,2,7),

-- 31–40 Bangladesh & Sri Lanka
(8,'DHK-Gulshan-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Bangladesh','Dhaka',2,'Gulshan Circle',26000,9000,1,2,9),
(8,'DHK-Motijheel-01','Outdoor LED P6, 4K, 6500 nits, 10x18 ft','Bangladesh','Dhaka',2,'Motijheel',28000,9800,1,2,9),
(8,'DHK-Uttara-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Bangladesh','Dhaka',2,'Uttara',24000,8500,1,2,9),
(8,'DHK-Dhanmondi-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Bangladesh','Dhaka',2,'Dhanmondi',25000,8800,1,2,9),
(9,'CMB-Fort-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Sri Lanka','Colombo',2,'Fort Area',20000,7200,1,2,10),
(9,'CMB-Bambalapitiya-01','Outdoor LED P6, 4K, 6500 nits, 10x18 ft','Sri Lanka','Colombo',2,'Bambalapitiya',23000,7800,1,2,10),
(9,'CMB-Dehiwala-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Sri Lanka','Colombo',2,'Dehiwala',21000,7400,1,2,10),
(9,'CMB-Kollupitiya-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Sri Lanka','Colombo',2,'Kollupitiya',22500,7600,1,2,10),
(8,'DHK-Mirpur-01','Outdoor LED P6, 4K, 6500 nits, 10x18 ft','Bangladesh','Dhaka',2,'Mirpur',27000,9500,1,2,9),
(8,'DHK-Tejgaon-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Bangladesh','Dhaka',2,'Tejgaon',25500,8900,1,2,9),

-- 41–50 Thailand
(10,'BKK-Siam-01','Indoor LED P2, 4K, 1500 nits, 10x6 ft','Thailand','Bangkok',1,'Siam Paragon',30000,11000,1,2,10),
(10,'BKK-Asok-01','Outdoor LED P4, 4K, 6500 nits, 10x18 ft','Thailand','Bangkok',2,'Asok Junction',34000,12500,1,2,10),
(10,'BKK-Silom-01','Outdoor LED P4, 4K, 6500 nits, 10x18 ft','Thailand','Bangkok',2,'Silom Road',36000,13000,1,2,10),
(10,'BKK-Chatuchak-01','Outdoor LED P6, 4K, 6500 nits, 10x20 ft','Thailand','Bangkok',2,'Chatuchak',32000,11500,1,2,10),
(10,'BKK-Rama9-01','Outdoor LED P4, 4K, 6500 nits, 10x18 ft','Thailand','Bangkok',2,'Rama 9',35000,12800,1,2,10),
(10,'BKK-OnNut-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Thailand','Bangkok',2,'On Nut',28000,9800,1,2,10),
(10,'BKK-Ladprao-01','Outdoor LED P6, 4K, 6500 nits, 10x18 ft','Thailand','Bangkok',2,'Ladprao',31000,10800,1,2,10),
(10,'BKK-Ratchada-01','Outdoor LED P4, 4K, 6500 nits, 10x18 ft','Thailand','Bangkok',2,'Ratchada',33000,12000,1,2,10),
(10,'BKK-BangNa-01','Outdoor LED P4, FHD, 6000 nits, 8x14 ft','Thailand','Bangkok',2,'Bang Na',29000,10000,1,2,10),
(10,'BKK-Victory-01','Outdoor LED P6, 4K, 6500 nits, 10x20 ft','Thailand','Bangkok',2,'Victory Monument',38000,14000,1,2,10);