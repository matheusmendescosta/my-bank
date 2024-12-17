/*
  Warnings:

  - You are about to drop the column `name` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `RecurringExpenseDate` on the `recurring_expense` table. All the data in the column will be lost.
  - You are about to drop the column `PaymentDay` on the `salary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurringExpenseDate` to the `recurring_expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDay` to the `salary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `expense` DROP COLUMN `name`,
    DROP COLUMN `value`,
    ADD COLUMN `amount` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `recurring_expense` DROP COLUMN `RecurringExpenseDate`,
    ADD COLUMN `recurringExpenseDate` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `salary` DROP COLUMN `PaymentDay`,
    ADD COLUMN `paymentDay` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_username_key` ON `user`(`username`);
