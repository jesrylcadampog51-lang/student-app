-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2025 at 07:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) DEFAULT NULL CHECK (`age` >= 1 and `age` <= 120),
  `year_level` varchar(20) DEFAULT NULL,
  `grade` varchar(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `mobile_number` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `age`, `year_level`, `grade`, `email`, `address`, `mobile_number`, `created_at`, `updated_at`) VALUES
(1, 'Maria Santos', 19, '2nd Year', 'A', 'maria@example.com', '123 Rizal St, Manila', '09171234567', '2025-11-01 06:31:58', '2025-11-01 06:31:58'),
(2, 'John Cruz', 21, 'Senior', 'B+', 'john.c@example.com', '456 Quezon Ave, QC', '09987654321', '2025-11-01 06:31:58', '2025-11-01 06:31:58'),
(3, 'DONGDONGERS', 24, '3', '87', NULL, NULL, '09123123', '2025-11-01 06:35:40', '2025-11-01 06:35:40'),
(4, 'NENE', 36, '2', '11', 'NENE@GMAIL.COM', 'BLK1', '090928236', '2025-11-01 06:41:50', '2025-11-01 06:41:50'),
(5, 'GEGE', 23, '4', '98', 'EGGE@GMAIL.COM', 'BLK12', '989897686', '2025-11-01 06:44:37', '2025-11-01 06:44:37'),
(6, 'GOGO', 22, '3', '89', 'GOGO@GMAIL.COM', 'GOGO', '90909091', '2025-11-01 06:48:42', '2025-11-01 06:48:42'),
(7, 'gaaga', 43, '2', '98', 'agaga@gmail.com', 'geggea', '09276262', '2025-11-01 06:53:27', '2025-11-01 06:53:27'),
(8, 'uggugu', 21, '4', '99', 'gugu@gmail.com', 'gugu', '89898989', '2025-11-01 06:54:24', '2025-11-01 06:54:24'),
(9, 'gtet', 23, '3', '78', 'gete@gmail.com', 'gete', '1212121212', '2025-11-01 06:55:24', '2025-11-01 06:55:24'),
(10, 'rarar', 2, '3', '89', 'rara@gmail.com', 'qqq', '34343434', '2025-11-01 06:57:48', '2025-11-08 07:06:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
