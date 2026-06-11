-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pokedex_db
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `pokedex_db` DEFAULT CHARACTER SET utf8;
USE `pokedex_db`;

-- -----------------------------------------------------
-- Table `pokedex_db`.`jogador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pokedex_db`.`jogador` (
  `idjogador` BIGINT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idjogador`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pokedex_db`.`pokemon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pokedex_db`.`pokemon` (
  `idpokemon` BIGINT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `tipo_principal` VARCHAR(45) NULL,
  `tipo_secundario` VARCHAR(45) NULL,
  `imagem_url` VARCHAR(45) NULL,
  `descricao` TEXT NULL,
  PRIMARY KEY (`idpokemon`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pokedex_db`.`pokedex`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pokedex_db`.`pokedex` (
  `idpokedex` BIGINT NOT NULL,
  `total_cartas_existentes` INT NULL,
  `total_cartas_conhecidas` INT NULL,
  `jogador_idjogador` BIGINT NOT NULL,
  PRIMARY KEY (`idpokedex`),
  INDEX `fk_pokedex_jogador1_idx` (`jogador_idjogador` ASC) VISIBLE,
  CONSTRAINT `fk_pokedex_jogador1`
    FOREIGN KEY (`jogador_idjogador`)
    REFERENCES `pokedex_db`.`jogador` (`idjogador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pokedex_db`.`cartaConhecida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pokedex_db`.`cartaConhecida` (
  `idcartaConhecida` BIGINT NOT NULL,
  `data_primeiro_contato` DATE NULL,
  `origem` VARCHAR(45) NULL,
  `ja_possui` TINYINT NULL,
  `possui_atualmente` TINYINT NULL,
  `data_ultima_atualizacao` DATE NULL,
  `pokedex_idpokedex` BIGINT NOT NULL,
  `pokemon_idpokemon` BIGINT NOT NULL,
  PRIMARY KEY (`idcartaConhecida`),
  INDEX `fk_cartaConhecida_pokedex1_idx` (`pokedex_idpokedex` ASC) VISIBLE,
  INDEX `fk_cartaConhecida_pokemon1_idx` (`pokemon_idpokemon` ASC) VISIBLE,
  CONSTRAINT `fk_cartaConhecida_pokedex1`
    FOREIGN KEY (`pokedex_idpokedex`)
    REFERENCES `pokedex_db`.`pokedex` (`idpokedex`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cartaConhecida_pokemon1`
    FOREIGN KEY (`pokemon_idpokemon`)
    REFERENCES `pokedex_db`.`pokemon` (`idpokemon`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;