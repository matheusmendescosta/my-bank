/*
  Warnings:

  - You are about to drop the column `userId` on the `recurring_expense` table. All the data in the column will be lost.
  - You are about to drop the `Income` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `username` to the `recurring_expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `recurring_expense` DROP FOREIGN KEY `recurring_expense_userId_fkey`;

-- AlterTable
ALTER TABLE `recurring_expense` DROP COLUMN `userId`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Income`;

-- CreateTable
CREATE TABLE `income` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `receiptDay` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `recurring_expense` ADD CONSTRAINT `recurring_expense_username_fkey` FOREIGN KEY (`username`) REFERENCES `user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
