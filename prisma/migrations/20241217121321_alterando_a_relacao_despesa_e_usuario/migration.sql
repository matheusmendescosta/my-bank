/*
  Warnings:

  - You are about to drop the column `userId` on the `expense` table. All the data in the column will be lost.
  - Added the required column `username` to the `expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `expense` DROP FOREIGN KEY `expense_userId_fkey`;

-- AlterTable
ALTER TABLE `expense` DROP COLUMN `userId`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_username_fkey` FOREIGN KEY (`username`) REFERENCES `user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
