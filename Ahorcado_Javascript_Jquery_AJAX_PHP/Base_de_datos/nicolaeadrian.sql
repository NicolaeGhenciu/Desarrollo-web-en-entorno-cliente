-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 18-12-2022 a las 11:41:42
-- Versión del servidor: 10.1.47-MariaDB-0ubuntu0.18.04.1
-- Versión de PHP: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nicolaeadrian`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diccionario`
--

CREATE TABLE `diccionario` (
  `id` int(11) NOT NULL,
  `palabra` varchar(100) NOT NULL,
  `categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `diccionario`
--

INSERT INTO `diccionario` (`id`, `palabra`, `categoria`) VALUES
(1, 'PORTUGAL', 'PAISES'),
(2, 'ALBANIA', 'PAISES'),
(3, 'ALEMANIA', 'PAISES'),
(4, 'ANDORRA', 'PAISES'),
(5, 'ANGOLA', 'PAISES'),
(8, 'ARGELIA', 'PAISES'),
(9, 'ARGENTINA', 'PAISES'),
(10, 'ARMENIA', 'PAISES'),
(11, 'AUSTRALIA', 'PAISES'),
(12, 'AUSTRIA', 'PAISES'),
(13, 'AZERBAIYAN', 'PAISES'),
(14, 'BAHAMAS', 'PAISES'),
(15, 'BANGLADESH', 'PAISES'),
(16, 'BARBADOS', 'PAISES'),
(17, 'BELARUS', 'PAISES'),
(18, 'BELGICA', 'PAISES'),
(19, 'BELICE', 'PAISES'),
(21, 'BIELORRUSIA', 'PAISES'),
(22, 'BIRMANIA', 'PAISES'),
(23, 'BOLIVIA', 'PAISES'),
(25, 'ELEFANTE', 'ANIMALES'),
(26, 'TIGRE', 'ANIMALES'),
(27, 'LEON', 'ANIMALES'),
(28, 'JIRAFA', 'ANIMALES'),
(29, 'HIPOPOTAMO', 'ANIMALES'),
(30, 'GORILA', 'ANIMALES'),
(31, 'OCELOTE', 'ANIMALES'),
(32, 'CEBRA', 'ANIMALES'),
(33, 'CHIMPANCE', 'ANIMALES'),
(34, 'PANDA', 'ANIMALES'),
(35, 'MONO', 'ANIMALES'),
(36, 'ZORRO', 'ANIMALES'),
(37, 'URSO', 'ANIMALES'),
(38, 'KOALA', 'ANIMALES'),
(39, 'LEOPARDO', 'ANIMALES'),
(40, 'SERPIENTE', 'ANIMALES'),
(41, 'DELFIN', 'ANIMALES'),
(42, 'TIBURÓN', 'ANIMALES'),
(43, 'COCODRILO', 'ANIMALES'),
(45, 'AVESTRUZ', 'ANIMALES'),
(46, 'FLAMENCO', 'ANIMALES'),
(47, 'CONDOR', 'ANIMALES'),
(73, 'MARTILLO', 'HERRAMIENTAS'),
(74, 'SIERRA', 'HERRAMIENTAS'),
(75, 'DESTORNILLADOR', 'HERRAMIENTAS'),
(76, 'TALADRO', 'HERRAMIENTAS'),
(77, 'CALADORA', 'HERRAMIENTAS'),
(79, 'TIJERA', 'HERRAMIENTAS'),
(80, 'BROCHA', 'HERRAMIENTAS'),
(82, 'ESCALERA', 'HERRAMIENTAS'),
(83, 'MOTOR', 'HERRAMIENTAS'),
(84, 'ESPATULA', 'HERRAMIENTAS'),
(85, 'SACABOCADOS', 'HERRAMIENTAS'),
(86, 'ESPONJA', 'HERRAMIENTAS'),
(87, 'SARGENTO', 'HERRAMIENTAS'),
(90, 'PALA', 'HERRAMIENTAS'),
(92, 'PINZA', 'HERRAMIENTAS'),
(93, 'NAVAJA', 'HERRAMIENTAS'),
(94, 'ALICATE', 'HERRAMIENTAS'),
(97, 'PORTATIL', 'INFORMATICA'),
(98, 'RATON', 'INFORMATICA'),
(100, 'CABLE', 'INFORMATICA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntuacion`
--

CREATE TABLE `puntuacion` (
  `id` int(11) NOT NULL,
  `email` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `resultado` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `puntuacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `esadmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `pass`, `esadmin`) VALUES
(1, 'admin', 'admin', 1),
(2, 'angel@gmail.com', 'angel', 1),
(4, 'adri@gmail.com', '12345', 0),
(5, 'angelica@gmail.com', '12345', 1),
(6, 'usuario', 'usuario', 0),
(7, 'esteban@gmail.com', '12345', 0),
(8, 'rafa@gmail.com', '12345', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `diccionario`
--
ALTER TABLE `diccionario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `palabra` (`palabra`);

--
-- Indices de la tabla `puntuacion`
--
ALTER TABLE `puntuacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `diccionario`
--
ALTER TABLE `diccionario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de la tabla `puntuacion`
--
ALTER TABLE `puntuacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
