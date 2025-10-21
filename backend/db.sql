-- -----------------------------------------------------
-- 1. Tabla para las Canciones (con Artista incluido)
-- Simplificamos uniendo la información del artista aquí.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `canciones` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `artista_nombre` VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- 2. Tabla para los Eventos
-- Se mantiene igual, almacena los eventos de forma única.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eventos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- 3. Tabla para los Usuarios
-- Se mantiene igual, almacena los usuarios de forma única.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- 4. Tabla de Votos (Tabla Transaccional)
-- Sigue siendo el centro que conecta todo.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `votos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `cantidad` INT NOT NULL DEFAULT 1,
  `evento_id` INT NOT NULL,
  `usuario_id` INT,
  `cancion_id` INT NOT NULL,
  `creado_en` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `fk_voto_evento_idx` (`evento_id` ASC),
  INDEX `fk_voto_usuario_idx` (`usuario_id` ASC),
  INDEX `fk_voto_cancion_idx` (`cancion_id` ASC),
  CONSTRAINT `fk_voto_evento`
    FOREIGN KEY (`evento_id`)
    REFERENCES `eventos`(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_voto_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `usuarios`(`id`)
    ON DELETE SET NULL,
  CONSTRAINT `fk_voto_cancion`
    FOREIGN KEY (`cancion_id`)
    REFERENCES `canciones`(`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Inserción de Datos de Ejemplo
-- -----------------------------------------------------

-- Insertar Canciones (con el nombre del artista directamente)
INSERT INTO `canciones` (`titulo`, `artista_nombre`) VALUES
('Despacito', 'Luis Fonsi'),
('Shape of You', 'Ed Sheeran'),
('Perfect', 'Ed Sheeran'),
('Dont Start Now', 'Dua Lipa'),
('Levitating', 'Dua Lipa'),
('Tití Me Preguntó', 'Bad Bunny');

-- Insertar Eventos
INSERT INTO `eventos` (`nombre`) VALUES
('Sunset Party'),
('Summer Fest 2025');

-- Insertar Usuarios
INSERT INTO `usuarios` (`nombre`) VALUES
('Carlos Pérez'),
('Ana Torres'),
('Maria Garcia'),
('Pedro Jiménez');

-- Insertar Votos (usando los IDs correspondientes)
-- Votos para el "Sunset Party" (evento_id = 1)
INSERT INTO `votos` (`evento_id`, `usuario_id`, `cancion_id`, `cantidad`) VALUES
(1, 1, 1, 10), -- Carlos Pérez vota por 'Despacito'
(1, 2, 2, 8),  -- Ana Torres vota por 'Shape of You'
(1, 1, 3, 6),  -- Carlos Pérez vota por 'Perfect'
(1, 3, 1, 5),  -- Maria Garcia vota por 'Despacito'
(1, 4, 5, 12); -- Pedro Jiménez vota por 'Levitating'

-- Votos para el "Summer Fest 2025" (evento_id = 2)
INSERT INTO `votos` (`evento_id`, `usuario_id`, `cancion_id`, `cantidad`) VALUES
(2, 2, 5, 12), -- Ana Torres vota por 'Levitating'
(2, 1, 4, 9),  -- Carlos Pérez vota por 'Don\'t Start Now'
(2, 4, 6, 20); -- Pedro Jiménez vota por 'Tití Me Preguntó'