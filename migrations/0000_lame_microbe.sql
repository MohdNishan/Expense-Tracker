CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`paidby` text NOT NULL,
	`paidto` text NOT NULL,
	`date` text NOT NULL,
	`invoiceFile` text,
	`amount` integer NOT NULL
);
