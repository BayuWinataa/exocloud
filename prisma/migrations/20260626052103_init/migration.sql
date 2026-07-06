-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `forms_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `form_fields` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `formId` INTEGER NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `required` BOOLEAN NOT NULL DEFAULT false,
    `options` TEXT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `form_responses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `formId` INTEGER NOT NULL,
    `submittedById` INTEGER NULL,
    `submittedBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `payload` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `form_fields` ADD CONSTRAINT `form_fields_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `forms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `form_responses` ADD CONSTRAINT `form_responses_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `forms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `form_responses` ADD CONSTRAINT `form_responses_submittedById_fkey` FOREIGN KEY (`submittedById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
