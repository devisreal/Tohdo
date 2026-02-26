CREATE TABLE "tohdos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tohdos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"group_id" integer,
	"title" varchar(255) NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "tohdos" ADD CONSTRAINT "tohdos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tohdos" ADD CONSTRAINT "tohdos_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "tohdos" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "group_id_idx" ON "tohdos" USING btree ("group_id");--> statement-breakpoint
CREATE INDEX "tohdo_title_idx" ON "tohdos" USING btree ("title");