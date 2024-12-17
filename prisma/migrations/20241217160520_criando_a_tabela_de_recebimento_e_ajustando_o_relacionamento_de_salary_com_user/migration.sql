/*
  Warnings:

  - You are about to drop the column `userId` on the `salary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `salary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `salary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `salary` DROP FOREIGN KEY `salary_userId_fkey`;

-- AlterTable
ALTER TABLE `salary` DROP COLUMN `userId`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Income` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `receiptDay` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `salary_username_key` ON `salary`(`username`);

-- AddForeignKey
ALTER TABLE `salary` ADD CONSTRAINT `salary_username_fkey` FOREIGN KEY (`username`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
