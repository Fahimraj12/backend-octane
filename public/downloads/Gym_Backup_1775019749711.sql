/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: BmiHistories
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `BmiHistories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `height` float NOT NULL,
  `weight` float NOT NULL,
  `bmi_score` float NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `is_free` tinyint(1) DEFAULT '0',
  `check_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `BmiHistories_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `Members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: EquipmentList
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `EquipmentList` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` enum('active', 'inactive') NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: FitnessGoal
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `FitnessGoal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` enum('active', 'inactive') NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Inquiries
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Inquiries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `status` enum('open', 'closed', 'pending') NOT NULL,
  `date` datetime NOT NULL,
  `source` varchar(255) NOT NULL,
  `convert` enum('Hot', 'Warm', 'Cold') NOT NULL,
  `Notes` text NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Level
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Level` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` enum('active', 'inactive') NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Members
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `dob` datetime NOT NULL,
  `gender` enum('male', 'female', 'other') NOT NULL,
  `status` enum('active', 'inactive') NOT NULL,
  `blood_group` enum('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
  `student` enum('yes', 'no') NOT NULL,
  `createdAt` datetime NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `document_file` varchar(255) DEFAULT NULL,
  `document_type` enum('Aadhar', 'PAN', 'Passport', 'Voter ID', 'Other') DEFAULT NULL,
  `document_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: MembershipPackages
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `MembershipPackages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `membership_type` varchar(255) NOT NULL,
  `duration` varchar(15) NOT NULL,
  `mrp` decimal(10, 2) NOT NULL,
  `discount` decimal(5, 2) NOT NULL,
  `selling_price` decimal(10, 2) NOT NULL,
  `status` enum('active', 'inactive') NOT NULL,
  `createdAt` datetime NOT NULL,
  `gst_status` enum('included', 'excluded') NOT NULL DEFAULT 'excluded',
  `gst_percentage` decimal(5, 2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Service
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` enum('active', 'inactive') NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: admin
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `role` enum('admin', 'frontdesk') NOT NULL,
  `status` enum('active', 'inactive') NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: appointments
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `member_id` int NOT NULL,
  `date` date NOT NULL,
  `slot` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `payment_status` enum('pending', 'paid') DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `appointments_ibfk_221` FOREIGN KEY (`package_id`) REFERENCES `package` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `appointments_ibfk_222` FOREIGN KEY (`member_id`) REFERENCES `Members` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: financial_years
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `financial_years` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: invoice_details
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `invoice_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usermembership_id` int NOT NULL,
  `amount_rate` float NOT NULL,
  `gst_rate` float NOT NULL,
  `total` float NOT NULL,
  `invoicemaster_id` int NOT NULL,
  `package_id` int NOT NULL,
  `membershippackage_id` int NOT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoicemaster_id` (`invoicemaster_id`),
  CONSTRAINT `invoice_details_ibfk_1` FOREIGN KEY (`invoicemaster_id`) REFERENCES `invoice_masters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: invoice_masters
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `invoice_masters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `financialyear_id` int NOT NULL,
  `invoice_no` varchar(255) NOT NULL,
  `member_id` int NOT NULL,
  `gross_amount` float NOT NULL,
  `gst_amount` float NOT NULL,
  `gst_percentage` float NOT NULL,
  `gst_type` varchar(255) NOT NULL,
  `receipt_date` date NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `usermembership_id` int NOT NULL,
  `net_amount` float NOT NULL,
  `payment_status` enum('unpaid', 'partial', 'paid') DEFAULT 'unpaid',
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  KEY `usermembership_id` (`usermembership_id`),
  CONSTRAINT `invoice_masters_ibfk_62` FOREIGN KEY (`member_id`) REFERENCES `Members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `invoice_masters_ibfk_63` FOREIGN KEY (`usermembership_id`) REFERENCES `user_memberships` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: package
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `package` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `duration_in_days` int NOT NULL,
  `no_of_sessions` int NOT NULL,
  `short_description` text,
  `mrp_price` decimal(10, 2) NOT NULL,
  `discount_price` decimal(10, 2) NOT NULL,
  `selling_price` decimal(10, 2) NOT NULL,
  `gst_percentage` decimal(5, 2) DEFAULT '0.00',
  `image` varchar(255) DEFAULT NULL,
  `package_includes` text,
  `appointment_slot_minutes` int NOT NULL,
  `appointment_start` time NOT NULL,
  `appointment_end` time NOT NULL,
  `blocked_start` time NOT NULL,
  `blocked_end` time NOT NULL,
  `week_days` json NOT NULL,
  `status` enum('active', 'inactive') DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `package_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `Service` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: payments
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` int NOT NULL,
  `payment_date` date NOT NULL,
  `payment_mode` enum('cash', 'upi', 'card', 'bank') NOT NULL,
  `amount` float NOT NULL,
  `reference` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_id` (`invoice_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoice_masters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: trainer
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `trainer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `dob` datetime NOT NULL,
  `gender` enum('male', 'female', 'other') NOT NULL,
  `status` enum('active', 'inactive') NOT NULL,
  `date_of_joining` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user_memberships
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_memberships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `membershippackage_id` int NOT NULL,
  `status` enum('active', 'inactive', 'expired') DEFAULT 'active',
  `start_at` date NOT NULL,
  `end_at` date NOT NULL,
  `amount_paid` float DEFAULT '0',
  `trainer_assigned` enum('yes', 'no') DEFAULT 'no',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  KEY `membershippackage_id` (`membershippackage_id`),
  CONSTRAINT `user_memberships_ibfk_233` FOREIGN KEY (`member_id`) REFERENCES `Members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_memberships_ibfk_234` FOREIGN KEY (`membershippackage_id`) REFERENCES `MembershipPackages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: BmiHistories
# ------------------------------------------------------------

INSERT INTO
  `BmiHistories` (
    `id`,
    `member_id`,
    `height`,
    `weight`,
    `bmi_score`,
    `status`,
    `is_free`,
    `check_date`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    1,
    1,
    50,
    40,
    160,
    'Obese',
    1,
    '2026-03-30 11:46:36',
    '2026-03-30 11:46:36',
    '2026-03-30 11:46:36'
  );
INSERT INTO
  `BmiHistories` (
    `id`,
    `member_id`,
    `height`,
    `weight`,
    `bmi_score`,
    `status`,
    `is_free`,
    `check_date`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    2,
    4,
    78,
    54,
    88.8,
    'Obese',
    1,
    '2026-03-31 04:05:35',
    '2026-03-31 04:05:35',
    '2026-03-31 04:05:35'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: EquipmentList
# ------------------------------------------------------------

INSERT INTO
  `EquipmentList` (
    `id`,
    `title`,
    `image`,
    `description`,
    `status`,
    `createdAt`
  )
VALUES
  (
    1,
    'Pendulum Squats',
    '1773472873893-72184411.jpg',
    'Pendulum Squats',
    'active',
    '2026-03-14 07:21:14'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: FitnessGoal
# ------------------------------------------------------------

INSERT INTO
  `FitnessGoal` (`id`, `title`, `description`, `status`, `createdAt`)
VALUES
  (
    1,
    'Muscle Gain ',
    'Muscle Gain - Weight Gain (Double Muscle)',
    'active',
    '2026-03-14 07:08:25'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Inquiries
# ------------------------------------------------------------

INSERT INTO
  `Inquiries` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `status`,
    `date`,
    `source`,
    `convert`,
    `Notes`,
    `createdAt`
  )
VALUES
  (
    1,
    'Jhanvi Katariya',
    'jhanvikatariya@gmail.com',
    '9429458758',
    'open',
    '2026-03-19 07:24:46',
    'Walk-in',
    'Hot',
    'Can u share some details about trainer , also weight gainer program, evening time women\'s allow or not..?',
    '2026-03-19 07:24:46'
  );
INSERT INTO
  `Inquiries` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `status`,
    `date`,
    `source`,
    `convert`,
    `Notes`,
    `createdAt`
  )
VALUES
  (
    2,
    'Hanif V Patel',
    'Mohhanifpatel2020@gmail.com',
    '4372351822',
    'open',
    '2026-03-31 09:43:22',
    'Walk-in',
    'Hot',
    'Hi there, if I come today evening and pay for a day, then can I come tomorrow too if my payment is valid upto 24 hours',
    '2026-03-31 09:43:22'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Level
# ------------------------------------------------------------

INSERT INTO
  `Level` (
    `id`,
    `title`,
    `image`,
    `description`,
    `status`,
    `createdAt`
  )
VALUES
  (
    1,
    'Advanced ',
    '1773471120491-440778919.png',
    'Advanced',
    'active',
    '2026-03-14 06:47:46'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Members
# ------------------------------------------------------------

INSERT INTO
  `Members` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `dob`,
    `gender`,
    `status`,
    `blood_group`,
    `student`,
    `createdAt`,
    `profile_image`,
    `document_file`,
    `document_type`,
    `document_number`
  )
VALUES
  (
    1,
    'Fahim Raj',
    '23ss02it161@ppsu.ac.in',
    '9316243930',
    '2004-11-03 00:00:00',
    'male',
    'active',
    'O+',
    'yes',
    '2026-03-07 13:01:09',
    'uploads\\members\\profiles\\profile_image-1774875231531-411558009.png',
    'uploads\\members\\documents\\document_file-1774875231586-241497862.avif',
    'Aadhar',
    '952244763456'
  );
INSERT INTO
  `Members` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `dob`,
    `gender`,
    `status`,
    `blood_group`,
    `student`,
    `createdAt`,
    `profile_image`,
    `document_file`,
    `document_type`,
    `document_number`
  )
VALUES
  (
    2,
    'Hasnain Feti',
    'hasnainfeti23@gmail.com',
    '9409444979',
    '2003-12-03 00:00:00',
    'male',
    'active',
    'B+',
    'no',
    '2026-03-08 06:24:28',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `Members` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `dob`,
    `gender`,
    `status`,
    `blood_group`,
    `student`,
    `createdAt`,
    `profile_image`,
    `document_file`,
    `document_type`,
    `document_number`
  )
VALUES
  (
    3,
    'Noor Mohammed',
    '23ss02it219@ppsu.ac.in',
    '9876543454',
    '2005-01-31 00:00:00',
    'male',
    'active',
    'A+',
    'yes',
    '2026-03-09 08:30:30',
    NULL,
    NULL,
    'Aadhar',
    '338200062108'
  );
INSERT INTO
  `Members` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `dob`,
    `gender`,
    `status`,
    `blood_group`,
    `student`,
    `createdAt`,
    `profile_image`,
    `document_file`,
    `document_type`,
    `document_number`
  )
VALUES
  (
    4,
    'Sultan ',
    'sultan12@gmail.com',
    '9316243930',
    '2003-02-02 00:00:00',
    'male',
    'active',
    'A+',
    'no',
    '2026-03-10 04:13:50',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `Members` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `dob`,
    `gender`,
    `status`,
    `blood_group`,
    `student`,
    `createdAt`,
    `profile_image`,
    `document_file`,
    `document_type`,
    `document_number`
  )
VALUES
  (
    5,
    'Ayan Shaikh',
    'ayanshk01@gmail.com',
    '7778912164',
    '2005-10-23 00:00:00',
    'male',
    'active',
    'A+',
    'no',
    '2026-03-15 03:48:42',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `Members` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `dob`,
    `gender`,
    `status`,
    `blood_group`,
    `student`,
    `createdAt`,
    `profile_image`,
    `document_file`,
    `document_type`,
    `document_number`
  )
VALUES
  (
    6,
    'Abubakkar',
    'abubakkar@gmail.com',
    '9876543454',
    '2002-11-05 00:00:00',
    'male',
    'active',
    'A+',
    'no',
    '2026-03-16 04:17:59',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `Members` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `dob`,
    `gender`,
    `status`,
    `blood_group`,
    `student`,
    `createdAt`,
    `profile_image`,
    `document_file`,
    `document_type`,
    `document_number`
  )
VALUES
  (
    7,
    'Minhaz lariya',
    'minhaz123@gmail.com',
    '9876543454',
    '1992-01-09 00:00:00',
    'male',
    'active',
    'A+',
    'no',
    '2026-03-19 05:54:21',
    'uploads\\members\\profiles\\profile_image-1773899660896-116877180.avif',
    'uploads\\members\\documents\\document_file-1773899660900-806915097.jpg',
    'PAN',
    'ABCDE123F'
  );
INSERT INTO
  `Members` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `dob`,
    `gender`,
    `status`,
    `blood_group`,
    `student`,
    `createdAt`,
    `profile_image`,
    `document_file`,
    `document_type`,
    `document_number`
  )
VALUES
  (
    8,
    'Samarth Sharma',
    'samarth.sharma@gmail.com',
    '9316243930',
    '1986-06-20 00:00:00',
    'male',
    'active',
    'B+',
    'no',
    '2026-03-27 03:36:26',
    'uploads\\members\\profiles\\profile_image-1774582584964-481099364.jpg',
    'uploads\\members\\documents\\document_file-1774582585107-948174531.avif',
    'Aadhar',
    '123456789012'
  );
INSERT INTO
  `Members` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `dob`,
    `gender`,
    `status`,
    `blood_group`,
    `student`,
    `createdAt`,
    `profile_image`,
    `document_file`,
    `document_type`,
    `document_number`
  )
VALUES
  (
    9,
    'Kumar G ',
    'kumar.g@gmail.com',
    '7778912164',
    '1985-05-24 00:00:00',
    'male',
    'active',
    'A+',
    'no',
    '2026-03-30 12:10:51',
    'uploads\\members\\profiles\\profile_image-1774872651246-82081231.png',
    'uploads\\members\\documents\\document_file-1774872651301-695710231.jpg',
    'Passport',
    'Z 0000000'
  );
INSERT INTO
  `Members` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `dob`,
    `gender`,
    `status`,
    `blood_group`,
    `student`,
    `createdAt`,
    `profile_image`,
    `document_file`,
    `document_type`,
    `document_number`
  )
VALUES
  (
    10,
    'Fahad Shaikh',
    'fahad@gmail.com',
    '7778912145',
    '2003-03-01 00:00:00',
    'male',
    'active',
    'A+',
    'yes',
    '2026-04-01 03:31:22',
    'uploads/members/profiles/profile_image-1775014281536-457473658.jpg',
    'uploads/members/documents/document_file-1775014281737-896864146.avif',
    'Aadhar',
    '12345678901'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: MembershipPackages
# ------------------------------------------------------------

INSERT INTO
  `MembershipPackages` (
    `id`,
    `name`,
    `membership_type`,
    `duration`,
    `mrp`,
    `discount`,
    `selling_price`,
    `status`,
    `createdAt`,
    `gst_status`,
    `gst_percentage`
  )
VALUES
  (
    1,
    'Personal Training(Group) - 3 month',
    'Gym Membership',
    '120 Days',
    13500.00,
    0.00,
    13500.00,
    'active',
    '2026-03-07 13:01:59',
    'excluded',
    NULL
  );
INSERT INTO
  `MembershipPackages` (
    `id`,
    `name`,
    `membership_type`,
    `duration`,
    `mrp`,
    `discount`,
    `selling_price`,
    `status`,
    `createdAt`,
    `gst_status`,
    `gst_percentage`
  )
VALUES
  (
    2,
    'Gym Membership: 1 Months (PT)',
    'Gym Membership(PT)',
    '29 Days',
    2000.00,
    0.00,
    2240.00,
    'active',
    '2026-03-11 05:10:49',
    'included',
    12.00
  );
INSERT INTO
  `MembershipPackages` (
    `id`,
    `name`,
    `membership_type`,
    `duration`,
    `mrp`,
    `discount`,
    `selling_price`,
    `status`,
    `createdAt`,
    `gst_status`,
    `gst_percentage`
  )
VALUES
  (
    3,
    'Gym Membership: 2 Months (PT)',
    'Gym Membership(PT)',
    '60 days',
    4000.00,
    0.00,
    4720.00,
    'active',
    '2026-03-15 03:49:50',
    'included',
    18.00
  );
INSERT INTO
  `MembershipPackages` (
    `id`,
    `name`,
    `membership_type`,
    `duration`,
    `mrp`,
    `discount`,
    `selling_price`,
    `status`,
    `createdAt`,
    `gst_status`,
    `gst_percentage`
  )
VALUES
  (
    4,
    '12 Months Couple Gym Membership (New)',
    'Gym Membership',
    '365 Days',
    15004.00,
    0.00,
    17704.72,
    'active',
    '2026-03-30 12:13:35',
    'included',
    18.00
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Service
# ------------------------------------------------------------

INSERT INTO
  `Service` (`id`, `title`, `description`, `status`, `createdAt`)
VALUES
  (1, 'Steam', 'Steam', 'active', '2026-03-07 12:58:28');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: admin
# ------------------------------------------------------------

INSERT INTO
  `admin` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `role`,
    `status`,
    `password`
  )
VALUES
  (
    1,
    'NoorMohammed Basir',
    '23ss02it219@ppsu.ac.in',
    '9876543454',
    'admin',
    'active',
    '$2b$10$9PgD/thm5PJCVwV5zrmmHOVqYhaW4gJMThXW.HtRpw4mo7im86OEK'
  );
INSERT INTO
  `admin` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `role`,
    `status`,
    `password`
  )
VALUES
  (
    2,
    'Fahim Raj',
    '23ss02it161@ppsu.ac.in',
    '9316243930',
    'admin',
    'active',
    '$2b$10$5zqIDZyy2Y7ixYzcArJNPOtIDIq9Aa.8EiRDgO5QeveGYXp46jvuS'
  );
INSERT INTO
  `admin` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `role`,
    `status`,
    `password`
  )
VALUES
  (
    3,
    'FR',
    'sca23085@gmail.com',
    '9876543454',
    'frontdesk',
    'active',
    '$2b$10$sCj29zzCS7pVbp2nnPEbe.x.cpPQL/FczOMqEX2Uuic0A5FHnyAIS'
  );
INSERT INTO
  `admin` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `role`,
    `status`,
    `password`
  )
VALUES
  (
    4,
    'Ayan Shaikh',
    'shkayan228@gmail.com',
    '7778912164',
    'admin',
    'active',
    '$2b$10$Y0h6lASBQxZw5f7AU.XWTO5fEJBD6nSL5B2cJSPwx.aH1T0okpdVG'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: appointments
# ------------------------------------------------------------

INSERT INTO
  `appointments` (
    `id`,
    `package_id`,
    `member_id`,
    `date`,
    `slot`,
    `amount`,
    `payment_status`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    1,
    1,
    1,
    '2026-03-06',
    '10:00 AM',
    0,
    'paid',
    '2026-03-07 13:03:48',
    '2026-03-07 13:03:48'
  );
INSERT INTO
  `appointments` (
    `id`,
    `package_id`,
    `member_id`,
    `date`,
    `slot`,
    `amount`,
    `payment_status`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    2,
    1,
    1,
    '2026-03-06',
    '11:00 AM',
    0,
    'paid',
    '2026-03-07 17:00:39',
    '2026-03-07 17:00:39'
  );
INSERT INTO
  `appointments` (
    `id`,
    `package_id`,
    `member_id`,
    `date`,
    `slot`,
    `amount`,
    `payment_status`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    3,
    1,
    2,
    '2026-03-08',
    '09:00 AM',
    0,
    'pending',
    '2026-03-08 06:24:53',
    '2026-03-08 06:24:53'
  );
INSERT INTO
  `appointments` (
    `id`,
    `package_id`,
    `member_id`,
    `date`,
    `slot`,
    `amount`,
    `payment_status`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    4,
    1,
    9,
    '2026-03-29',
    '06:00 PM',
    299,
    'paid',
    '2026-03-30 12:46:18',
    '2026-03-30 12:46:18'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: financial_years
# ------------------------------------------------------------

INSERT INTO
  `financial_years` (
    `id`,
    `name`,
    `date_start`,
    `date_end`,
    `is_active`,
    `createdAt`
  )
VALUES
  (
    1,
    'FY 2025-2026',
    '2025-04-01',
    '2026-03-31',
    1,
    '2026-03-09 05:08:14'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: invoice_details
# ------------------------------------------------------------

INSERT INTO
  `invoice_details` (
    `id`,
    `usermembership_id`,
    `amount_rate`,
    `gst_rate`,
    `total`,
    `invoicemaster_id`,
    `package_id`,
    `membershippackage_id`,
    `member_id`
  )
VALUES
  (1, 1, 13500, 0, 13500, 1, 1, 1, NULL);
INSERT INTO
  `invoice_details` (
    `id`,
    `usermembership_id`,
    `amount_rate`,
    `gst_rate`,
    `total`,
    `invoicemaster_id`,
    `package_id`,
    `membershippackage_id`,
    `member_id`
  )
VALUES
  (2, 2, 13500, 0, 13500, 2, 1, 1, NULL);
INSERT INTO
  `invoice_details` (
    `id`,
    `usermembership_id`,
    `amount_rate`,
    `gst_rate`,
    `total`,
    `invoicemaster_id`,
    `package_id`,
    `membershippackage_id`,
    `member_id`
  )
VALUES
  (3, 3, 13500, 0, 13500, 3, 1, 1, NULL);
INSERT INTO
  `invoice_details` (
    `id`,
    `usermembership_id`,
    `amount_rate`,
    `gst_rate`,
    `total`,
    `invoicemaster_id`,
    `package_id`,
    `membershippackage_id`,
    `member_id`
  )
VALUES
  (4, 4, 2240, 0, 2240, 4, 2, 2, NULL);
INSERT INTO
  `invoice_details` (
    `id`,
    `usermembership_id`,
    `amount_rate`,
    `gst_rate`,
    `total`,
    `invoicemaster_id`,
    `package_id`,
    `membershippackage_id`,
    `member_id`
  )
VALUES
  (5, 5, 4720, 18, 5569.6, 5, 3, 3, NULL);
INSERT INTO
  `invoice_details` (
    `id`,
    `usermembership_id`,
    `amount_rate`,
    `gst_rate`,
    `total`,
    `invoicemaster_id`,
    `package_id`,
    `membershippackage_id`,
    `member_id`
  )
VALUES
  (6, 6, 2240, 12, 2508.8, 6, 2, 2, NULL);
INSERT INTO
  `invoice_details` (
    `id`,
    `usermembership_id`,
    `amount_rate`,
    `gst_rate`,
    `total`,
    `invoicemaster_id`,
    `package_id`,
    `membershippackage_id`,
    `member_id`
  )
VALUES
  (7, 7, 13500, 0, 13500, 7, 1, 1, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: invoice_masters
# ------------------------------------------------------------

INSERT INTO
  `invoice_masters` (
    `id`,
    `financialyear_id`,
    `invoice_no`,
    `member_id`,
    `gross_amount`,
    `gst_amount`,
    `gst_percentage`,
    `gst_type`,
    `receipt_date`,
    `createdAt`,
    `usermembership_id`,
    `net_amount`,
    `payment_status`
  )
VALUES
  (
    1,
    1,
    'INV-1773117636595',
    1,
    13500,
    0,
    0,
    'none',
    '2026-03-10',
    '2026-03-10 04:40:36',
    1,
    13500,
    'paid'
  );
INSERT INTO
  `invoice_masters` (
    `id`,
    `financialyear_id`,
    `invoice_no`,
    `member_id`,
    `gross_amount`,
    `gst_amount`,
    `gst_percentage`,
    `gst_type`,
    `receipt_date`,
    `createdAt`,
    `usermembership_id`,
    `net_amount`,
    `payment_status`
  )
VALUES
  (
    2,
    1,
    'INV-1773117723750',
    3,
    13500,
    0,
    0,
    'none',
    '2026-03-10',
    '2026-03-10 04:42:03',
    2,
    13500,
    'paid'
  );
INSERT INTO
  `invoice_masters` (
    `id`,
    `financialyear_id`,
    `invoice_no`,
    `member_id`,
    `gross_amount`,
    `gst_amount`,
    `gst_percentage`,
    `gst_type`,
    `receipt_date`,
    `createdAt`,
    `usermembership_id`,
    `net_amount`,
    `payment_status`
  )
VALUES
  (
    3,
    1,
    'INV-1773117931293',
    4,
    13500,
    0,
    0,
    'none',
    '2026-03-10',
    '2026-03-10 04:45:31',
    3,
    13500,
    'paid'
  );
INSERT INTO
  `invoice_masters` (
    `id`,
    `financialyear_id`,
    `invoice_no`,
    `member_id`,
    `gross_amount`,
    `gst_amount`,
    `gst_percentage`,
    `gst_type`,
    `receipt_date`,
    `createdAt`,
    `usermembership_id`,
    `net_amount`,
    `payment_status`
  )
VALUES
  (
    4,
    1,
    'INV-1773205952690',
    2,
    2240,
    0,
    0,
    'none',
    '2026-03-11',
    '2026-03-11 05:12:32',
    4,
    2240,
    'partial'
  );
INSERT INTO
  `invoice_masters` (
    `id`,
    `financialyear_id`,
    `invoice_no`,
    `member_id`,
    `gross_amount`,
    `gst_amount`,
    `gst_percentage`,
    `gst_type`,
    `receipt_date`,
    `createdAt`,
    `usermembership_id`,
    `net_amount`,
    `payment_status`
  )
VALUES
  (
    5,
    1,
    'INV-1773546669479',
    5,
    4720,
    849.6,
    18,
    'included',
    '2026-03-15',
    '2026-03-15 03:51:09',
    5,
    5569.6,
    'partial'
  );
INSERT INTO
  `invoice_masters` (
    `id`,
    `financialyear_id`,
    `invoice_no`,
    `member_id`,
    `gross_amount`,
    `gst_amount`,
    `gst_percentage`,
    `gst_type`,
    `receipt_date`,
    `createdAt`,
    `usermembership_id`,
    `net_amount`,
    `payment_status`
  )
VALUES
  (
    6,
    1,
    'INV-1773899223891',
    6,
    2240,
    268.8,
    12,
    'included',
    '2026-03-19',
    '2026-03-19 05:47:03',
    6,
    2508.8,
    'partial'
  );
INSERT INTO
  `invoice_masters` (
    `id`,
    `financialyear_id`,
    `invoice_no`,
    `member_id`,
    `gross_amount`,
    `gst_amount`,
    `gst_percentage`,
    `gst_type`,
    `receipt_date`,
    `createdAt`,
    `usermembership_id`,
    `net_amount`,
    `payment_status`
  )
VALUES
  (
    7,
    1,
    'INV-1774683779180',
    2,
    13500,
    0,
    0,
    'excluded',
    '2026-03-28',
    '2026-03-28 07:42:59',
    7,
    13500,
    'paid'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: package
# ------------------------------------------------------------

INSERT INTO
  `package` (
    `id`,
    `service_id`,
    `title`,
    `duration_in_days`,
    `no_of_sessions`,
    `short_description`,
    `mrp_price`,
    `discount_price`,
    `selling_price`,
    `gst_percentage`,
    `image`,
    `package_includes`,
    `appointment_slot_minutes`,
    `appointment_start`,
    `appointment_end`,
    `blocked_start`,
    `blocked_end`,
    `week_days`,
    `status`
  )
VALUES
  (
    1,
    1,
    'Steam',
    29,
    0,
    'Steam is Available',
    299.00,
    0.00,
    299.00,
    0.00,
    NULL,
    '',
    30,
    '08:00:00',
    '20:00:00',
    '13:00:00',
    '14:00:00',
    '[\"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"]',
    'active'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: payments
# ------------------------------------------------------------

INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (1, 1, '2026-03-10', 'card', 5000, 'Initial Payment');
INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (2, 1, '2026-03-10', 'cash', 8500, NULL);
INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (3, 2, '2026-03-10', 'cash', 4000, 'Initial Payment');
INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (4, 2, '2026-03-10', 'cash', 9500, NULL);
INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (5, 3, '2026-03-10', 'upi', 500, 'Initial Payment');
INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (6, 3, '2026-03-10', 'cash', 2000, NULL);
INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (7, 3, '2026-03-10', 'card', 11000, NULL);
INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (8, 4, '2026-03-11', 'upi', 1500, 'Initial Payment');
INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (9, 5, '2026-03-15', 'upi', 2000, 'Initial Payment');
INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (10, 6, '2026-03-19', 'cash', 2000, 'Initial Payment');
INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (11, 6, '2026-03-27', 'upi', 508, NULL);
INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (12, 5, '2026-03-27', 'cash', 3569, NULL);
INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (13, 7, '2026-03-28', 'card', 5000, 'Initial Payment');
INSERT INTO
  `payments` (
    `id`,
    `invoice_id`,
    `payment_date`,
    `payment_mode`,
    `amount`,
    `reference`
  )
VALUES
  (14, 7, '2026-03-29', 'card', 8500, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: trainer
# ------------------------------------------------------------

INSERT INTO
  `trainer` (
    `id`,
    `name`,
    `email`,
    `mobile`,
    `dob`,
    `gender`,
    `status`,
    `date_of_joining`,
    `createdAt`
  )
VALUES
  (
    1,
    'Fahim Raj',
    '23ss02it161@ppsu.ac.in',
    '9316243930',
    '2004-11-03 00:00:00',
    'male',
    'active',
    '2023-11-03 00:00:00',
    '2026-03-07 12:57:44'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: user_memberships
# ------------------------------------------------------------

INSERT INTO
  `user_memberships` (
    `id`,
    `member_id`,
    `membershippackage_id`,
    `status`,
    `start_at`,
    `end_at`,
    `amount_paid`,
    `trainer_assigned`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    1,
    1,
    1,
    'active',
    '2026-01-10',
    '2026-03-15',
    13500,
    'no',
    '2026-03-10 04:40:36',
    '2026-03-10 04:40:52'
  );
INSERT INTO
  `user_memberships` (
    `id`,
    `member_id`,
    `membershippackage_id`,
    `status`,
    `start_at`,
    `end_at`,
    `amount_paid`,
    `trainer_assigned`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    2,
    3,
    1,
    'active',
    '2026-01-12',
    '2026-03-16',
    13500,
    'no',
    '2026-03-10 04:42:03',
    '2026-03-10 04:42:20'
  );
INSERT INTO
  `user_memberships` (
    `id`,
    `member_id`,
    `membershippackage_id`,
    `status`,
    `start_at`,
    `end_at`,
    `amount_paid`,
    `trainer_assigned`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    3,
    4,
    1,
    'active',
    '2026-02-18',
    '2026-04-18',
    13500,
    'no',
    '2026-03-10 04:45:31',
    '2026-03-10 04:46:25'
  );
INSERT INTO
  `user_memberships` (
    `id`,
    `member_id`,
    `membershippackage_id`,
    `status`,
    `start_at`,
    `end_at`,
    `amount_paid`,
    `trainer_assigned`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    4,
    2,
    2,
    'active',
    '2026-03-11',
    '2026-04-11',
    1500,
    'no',
    '2026-03-11 05:12:32',
    '2026-03-11 05:12:32'
  );
INSERT INTO
  `user_memberships` (
    `id`,
    `member_id`,
    `membershippackage_id`,
    `status`,
    `start_at`,
    `end_at`,
    `amount_paid`,
    `trainer_assigned`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    5,
    5,
    3,
    'active',
    '2026-02-25',
    '2026-04-25',
    5569,
    'no',
    '2026-03-15 03:51:09',
    '2026-03-27 10:15:40'
  );
INSERT INTO
  `user_memberships` (
    `id`,
    `member_id`,
    `membershippackage_id`,
    `status`,
    `start_at`,
    `end_at`,
    `amount_paid`,
    `trainer_assigned`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    6,
    6,
    2,
    'active',
    '2026-03-19',
    '2026-04-19',
    2508,
    'no',
    '2026-03-19 05:47:03',
    '2026-03-27 10:14:38'
  );
INSERT INTO
  `user_memberships` (
    `id`,
    `member_id`,
    `membershippackage_id`,
    `status`,
    `start_at`,
    `end_at`,
    `amount_paid`,
    `trainer_assigned`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    7,
    2,
    1,
    'active',
    '2025-02-03',
    '2026-05-03',
    13500,
    'no',
    '2026-03-28 07:42:59',
    '2026-03-29 04:00:54'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
