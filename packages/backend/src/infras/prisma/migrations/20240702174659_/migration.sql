-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('NotStarted', 'InProgress', 'Completed');

-- CreateTable
CREATE TABLE "TodoList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TodoList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TodoStatus" NOT NULL DEFAULT 'NotStarted',
    "listId" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_listId_fkey" FOREIGN KEY ("listId") REFERENCES "TodoList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
