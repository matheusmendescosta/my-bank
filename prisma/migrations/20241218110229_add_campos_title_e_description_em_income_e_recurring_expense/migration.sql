/*
  Warnings:

  - Added the required column `description` to the `income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `recurring_expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `recurring_expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `income` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `recurring_expense` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
