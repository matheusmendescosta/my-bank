-- DropForeignKey
ALTER TABLE `salary` DROP FOREIGN KEY `salary_username_fkey`;

-- AddForeignKey
ALTER TABLE `salary` ADD CONSTRAINT `salary_username_fkey` FOREIGN KEY (`username`) REFERENCES `user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
