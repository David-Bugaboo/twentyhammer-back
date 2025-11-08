


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";








ALTER SCHEMA "public" OWNER TO "postgres";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."Role" AS ENUM (
    'LIDER',
    'HEROI',
    'MERCENARIO',
    'LENDA',
    'SOLDADO'
);


ALTER TYPE "public"."Role" OWNER TO "postgres";


CREATE TYPE "public"."UserRole" AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE "public"."UserRole" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."_prisma_migrations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."advancement_to_warband_soldier" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "advancement_slug" "text" NOT NULL,
    "warband_soldier_id" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."advancement_to_warband_soldier" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."advancements" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."advancements" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."base_figure_to_warband_soldier" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "base_figure_slug" "text" NOT NULL,
    "warband_soldier_id" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."base_figure_to_warband_soldier" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."base_figures" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "role" "public"."Role" NOT NULL,
    "slug" "text" NOT NULL,
    "lore" "text" NOT NULL,
    "avaiability" "text"[],
    "exclusions" "text"[],
    "quality" integer DEFAULT 0 NOT NULL,
    "race" "text",
    "faction_slug" "text",
    "cost" integer NOT NULL,
    "movement" integer NOT NULL,
    "fight" integer NOT NULL,
    "shoot" integer NOT NULL,
    "armour" integer NOT NULL,
    "will" integer NOT NULL,
    "health" integer NOT NULL,
    "strength" integer NOT NULL,
    "equipment_slots" integer NOT NULL,
    "startingxp" integer,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "special_rules" "jsonb" NOT NULL,
    "can_get_blessings" boolean DEFAULT false NOT NULL,
    "can_get_mutations" boolean DEFAULT false NOT NULL,
    "can_get_sacred_marks" boolean DEFAULT false NOT NULL,
    "no_xp" boolean DEFAULT false NOT NULL,
    "natural_attacks" "jsonb"
);


ALTER TABLE "public"."base_figures" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."equipment_to_vault" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "warband_id" "text" NOT NULL,
    "equipment_slug" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "modifier_slug" "text",
    "custom_price" integer
);


ALTER TABLE "public"."equipment_to_vault" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."equipment_to_warband_soldier" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "equipment_slug" "text" NOT NULL,
    "warband_soldier_id" "text" NOT NULL,
    "custom_cost" integer,
    "modifier_slug" "text",
    "main_hand_eqquiped" boolean DEFAULT false NOT NULL,
    "off_hand_eqquiped" boolean DEFAULT false NOT NULL,
    "helmet_eqquiped" boolean DEFAULT false NOT NULL,
    "armor_equipped" boolean DEFAULT false NOT NULL,
    "two_handed_eqquiped" boolean DEFAULT false NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "compatibility" boolean NOT NULL
);


ALTER TABLE "public"."equipment_to_warband_soldier" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."equipments" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "cost" integer NOT NULL,
    "category" "text" NOT NULL,
    "damage_bonus" integer,
    "range" integer,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "special_rules" "jsonb",
    "armour_bonus" integer,
    "avaiability" "text"[],
    "exclusions" "text"[] DEFAULT ARRAY[]::"text"[],
    "movement_penalty" integer,
    "rarity" integer DEFAULT 1 NOT NULL,
    "slot" integer
);


ALTER TABLE "public"."equipments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."factions" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."factions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."figure_to_avaiable_equipment" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "figure_slug" "text" NOT NULL,
    "avaiable_equipment_slug" "text" NOT NULL,
    "custom_cost" integer,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."figure_to_avaiable_equipment" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."figure_to_skill_list" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "figure_slug" "text" NOT NULL,
    "skill_list_slug" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."figure_to_skill_list" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."figure_to_spell_lore" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "figure_slug" "text" NOT NULL,
    "spell_lore_slug" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."figure_to_spell_lore" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."injuries" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."injuries" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."injury_to_warband_soldier" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "injury_slug" "text" NOT NULL,
    "warband_soldier_id" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."injury_to_warband_soldier" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."legend_starting_equipment" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "figure_slug" "text" NOT NULL,
    "equipment_slug" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."legend_starting_equipment" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."legend_starting_skills" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "figure_slug" "text" NOT NULL,
    "skill_slug" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."legend_starting_skills" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."legend_starting_spells" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "figure_slug" "text" NOT NULL,
    "spell_slug" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."legend_starting_spells" OWNER TO "postgres";
supabase db dump -f backup.sql --local

CREATE TABLE IF NOT EXISTS "public"."mercenary_starting_equipment" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "figure_slug" "text" NOT NULL,
    "equipment_slug" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."mercenary_starting_equipment" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."modifiers" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "multiplier" integer NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "special_rules" "jsonb",
    "effect" "text" NOT NULL,
    "category" "text" NOT NULL
);


ALTER TABLE "public"."modifiers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."promoted_hero_skill_lists" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "warband_soldier_id" "text" NOT NULL,
    "skill_list_slug" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."promoted_hero_skill_lists" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."races" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "movement" integer NOT NULL,
    "fight" integer NOT NULL,
    "shoot" integer NOT NULL,
    "armour" integer NOT NULL,
    "will" integer NOT NULL,
    "health" integer NOT NULL,
    "strength" integer NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."races" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."skill_lists" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."skill_lists" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."skill_to_warband_soldier" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "skill_slug" "text" NOT NULL,
    "warband_soldier_id" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."skill_to_warband_soldier" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."skills" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "skill_list_slug" "text" NOT NULL,
    "description" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."skills" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."spell_lores" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."spell_lores" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."spell_to_warband_soldier" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "spell_slug" "text" NOT NULL,
    "warband_soldier_id" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."spell_to_warband_soldier" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."spells" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "difficulty_class" integer NOT NULL,
    "spell_lore_slug" "text" NOT NULL,
    "description" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "keywords" "text"[]
);


ALTER TABLE "public"."spells" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."super_natural_abilities" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "cost" integer NOT NULL,
    "category" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."super_natural_abilities" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."super_natural_ability_to_warband_soldier" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "super_natural_ability_slug" "text" NOT NULL,
    "warband_soldier_id" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."super_natural_ability_to_warband_soldier" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(3) without time zone NOT NULL,
    "role" "public"."UserRole" DEFAULT 'USER'::"public"."UserRole" NOT NULL
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."warband_soldier" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "campaign_name" "text",
    "warband_id" "text" NOT NULL,
    "experience" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "extra_special_rules" "jsonb",
    "effective_role" "public"."Role" DEFAULT 'HEROI'::"public"."Role" NOT NULL,
    "promotedHeroSkills" "text"[],
    "miscModifiers" "jsonb"
);


ALTER TABLE "public"."warband_soldier" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."warbands" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "crowns" integer DEFAULT 500 NOT NULL,
    "wyrdstone" integer DEFAULT 0 NOT NULL,
    "faction_slug" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "user_id" "text" NOT NULL
);


ALTER TABLE "public"."warbands" OWNER TO "postgres";


ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."advancement_to_warband_soldier"
    ADD CONSTRAINT "advancement_to_warband_soldier_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."advancements"
    ADD CONSTRAINT "advancements_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."base_figure_to_warband_soldier"
    ADD CONSTRAINT "base_figure_to_warband_soldier_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."base_figures"
    ADD CONSTRAINT "base_figures_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."equipment_to_vault"
    ADD CONSTRAINT "equipment_to_vault_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."equipment_to_warband_soldier"
    ADD CONSTRAINT "equipment_to_warband_soldier_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."equipments"
    ADD CONSTRAINT "equipments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."factions"
    ADD CONSTRAINT "factions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."figure_to_avaiable_equipment"
    ADD CONSTRAINT "figure_to_avaiable_equipment_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."figure_to_skill_list"
    ADD CONSTRAINT "figure_to_skill_list_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."figure_to_spell_lore"
    ADD CONSTRAINT "figure_to_spell_lore_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."injuries"
    ADD CONSTRAINT "injuries_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."injury_to_warband_soldier"
    ADD CONSTRAINT "injury_to_warband_soldier_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."legend_starting_equipment"
    ADD CONSTRAINT "legend_starting_equipment_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."legend_starting_skills"
    ADD CONSTRAINT "legend_starting_skills_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."legend_starting_spells"
    ADD CONSTRAINT "legend_starting_spells_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."mercenary_starting_equipment"
    ADD CONSTRAINT "mercenary_starting_equipment_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."modifiers"
    ADD CONSTRAINT "modifiers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."promoted_hero_skill_lists"
    ADD CONSTRAINT "promoted_hero_skill_lists_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."races"
    ADD CONSTRAINT "races_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."skill_lists"
    ADD CONSTRAINT "skill_lists_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."skill_to_warband_soldier"
    ADD CONSTRAINT "skill_to_warband_soldier_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."skills"
    ADD CONSTRAINT "skills_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."spell_lores"
    ADD CONSTRAINT "spell_lores_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."spell_to_warband_soldier"
    ADD CONSTRAINT "spell_to_warband_soldier_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."spells"
    ADD CONSTRAINT "spells_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."super_natural_abilities"
    ADD CONSTRAINT "super_natural_abilities_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."super_natural_ability_to_warband_soldier"
    ADD CONSTRAINT "super_natural_ability_to_warband_soldier_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."warband_soldier"
    ADD CONSTRAINT "warband_soldier_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."warbands"
    ADD CONSTRAINT "warbands_pkey" PRIMARY KEY ("id");



CREATE UNIQUE INDEX "advancements_slug_key" ON "public"."advancements" USING "btree" ("slug");



CREATE UNIQUE INDEX "base_figures_slug_key" ON "public"."base_figures" USING "btree" ("slug");



CREATE UNIQUE INDEX "equipments_slug_key" ON "public"."equipments" USING "btree" ("slug");



CREATE UNIQUE INDEX "factions_slug_key" ON "public"."factions" USING "btree" ("slug");



CREATE UNIQUE INDEX "injuries_slug_key" ON "public"."injuries" USING "btree" ("slug");



CREATE UNIQUE INDEX "modifiers_slug_key" ON "public"."modifiers" USING "btree" ("slug");



CREATE UNIQUE INDEX "races_slug_key" ON "public"."races" USING "btree" ("slug");



CREATE UNIQUE INDEX "skill_lists_slug_key" ON "public"."skill_lists" USING "btree" ("slug");



CREATE UNIQUE INDEX "skills_slug_key" ON "public"."skills" USING "btree" ("slug");



CREATE UNIQUE INDEX "spell_lores_slug_key" ON "public"."spell_lores" USING "btree" ("slug");



CREATE UNIQUE INDEX "spells_slug_key" ON "public"."spells" USING "btree" ("slug");



CREATE UNIQUE INDEX "super_natural_abilities_slug_key" ON "public"."super_natural_abilities" USING "btree" ("slug");



CREATE UNIQUE INDEX "users_email_key" ON "public"."users" USING "btree" ("email");



ALTER TABLE ONLY "public"."advancement_to_warband_soldier"
    ADD CONSTRAINT "advancement_to_warband_soldier_advancement_slug_fkey" FOREIGN KEY ("advancement_slug") REFERENCES "public"."advancements"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."advancement_to_warband_soldier"
    ADD CONSTRAINT "advancement_to_warband_soldier_warband_soldier_id_fkey" FOREIGN KEY ("warband_soldier_id") REFERENCES "public"."warband_soldier"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."base_figure_to_warband_soldier"
    ADD CONSTRAINT "base_figure_to_warband_soldier_base_figure_slug_fkey" FOREIGN KEY ("base_figure_slug") REFERENCES "public"."base_figures"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."base_figure_to_warband_soldier"
    ADD CONSTRAINT "base_figure_to_warband_soldier_warband_soldier_id_fkey" FOREIGN KEY ("warband_soldier_id") REFERENCES "public"."warband_soldier"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."base_figures"
    ADD CONSTRAINT "base_figures_faction_slug_fkey" FOREIGN KEY ("faction_slug") REFERENCES "public"."factions"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."base_figures"
    ADD CONSTRAINT "base_figures_race_fkey" FOREIGN KEY ("race") REFERENCES "public"."races"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."equipment_to_vault"
    ADD CONSTRAINT "equipment_to_vault_equipment_slug_fkey" FOREIGN KEY ("equipment_slug") REFERENCES "public"."equipments"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."equipment_to_vault"
    ADD CONSTRAINT "equipment_to_vault_modifier_slug_fkey" FOREIGN KEY ("modifier_slug") REFERENCES "public"."modifiers"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."equipment_to_vault"
    ADD CONSTRAINT "equipment_to_vault_warband_id_fkey" FOREIGN KEY ("warband_id") REFERENCES "public"."warbands"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."equipment_to_warband_soldier"
    ADD CONSTRAINT "equipment_to_warband_soldier_equipment_slug_fkey" FOREIGN KEY ("equipment_slug") REFERENCES "public"."equipments"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."equipment_to_warband_soldier"
    ADD CONSTRAINT "equipment_to_warband_soldier_modifier_slug_fkey" FOREIGN KEY ("modifier_slug") REFERENCES "public"."modifiers"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."equipment_to_warband_soldier"
    ADD CONSTRAINT "equipment_to_warband_soldier_warband_soldier_id_fkey" FOREIGN KEY ("warband_soldier_id") REFERENCES "public"."warband_soldier"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."figure_to_avaiable_equipment"
    ADD CONSTRAINT "figure_to_avaiable_equipment_avaiable_equipment_slug_fkey" FOREIGN KEY ("avaiable_equipment_slug") REFERENCES "public"."equipments"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."figure_to_avaiable_equipment"
    ADD CONSTRAINT "figure_to_avaiable_equipment_figure_slug_fkey" FOREIGN KEY ("figure_slug") REFERENCES "public"."base_figures"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."figure_to_skill_list"
    ADD CONSTRAINT "figure_to_skill_list_figure_slug_fkey" FOREIGN KEY ("figure_slug") REFERENCES "public"."base_figures"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."figure_to_skill_list"
    ADD CONSTRAINT "figure_to_skill_list_skill_list_slug_fkey" FOREIGN KEY ("skill_list_slug") REFERENCES "public"."skill_lists"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."figure_to_spell_lore"
    ADD CONSTRAINT "figure_to_spell_lore_figure_slug_fkey" FOREIGN KEY ("figure_slug") REFERENCES "public"."base_figures"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."figure_to_spell_lore"
    ADD CONSTRAINT "figure_to_spell_lore_spell_lore_slug_fkey" FOREIGN KEY ("spell_lore_slug") REFERENCES "public"."spell_lores"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."injury_to_warband_soldier"
    ADD CONSTRAINT "injury_to_warband_soldier_injury_slug_fkey" FOREIGN KEY ("injury_slug") REFERENCES "public"."injuries"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."injury_to_warband_soldier"
    ADD CONSTRAINT "injury_to_warband_soldier_warband_soldier_id_fkey" FOREIGN KEY ("warband_soldier_id") REFERENCES "public"."warband_soldier"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."legend_starting_equipment"
    ADD CONSTRAINT "legend_starting_equipment_equipment_slug_fkey" FOREIGN KEY ("equipment_slug") REFERENCES "public"."equipments"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."legend_starting_equipment"
    ADD CONSTRAINT "legend_starting_equipment_figure_slug_fkey" FOREIGN KEY ("figure_slug") REFERENCES "public"."base_figures"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."legend_starting_skills"
    ADD CONSTRAINT "legend_starting_skills_figure_slug_fkey" FOREIGN KEY ("figure_slug") REFERENCES "public"."base_figures"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."legend_starting_skills"
    ADD CONSTRAINT "legend_starting_skills_skill_slug_fkey" FOREIGN KEY ("skill_slug") REFERENCES "public"."skills"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."legend_starting_spells"
    ADD CONSTRAINT "legend_starting_spells_figure_slug_fkey" FOREIGN KEY ("figure_slug") REFERENCES "public"."base_figures"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."legend_starting_spells"
    ADD CONSTRAINT "legend_starting_spells_spell_slug_fkey" FOREIGN KEY ("spell_slug") REFERENCES "public"."spells"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."mercenary_starting_equipment"
    ADD CONSTRAINT "mercenary_starting_equipment_equipment_slug_fkey" FOREIGN KEY ("equipment_slug") REFERENCES "public"."equipments"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."mercenary_starting_equipment"
    ADD CONSTRAINT "mercenary_starting_equipment_figure_slug_fkey" FOREIGN KEY ("figure_slug") REFERENCES "public"."base_figures"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."promoted_hero_skill_lists"
    ADD CONSTRAINT "promoted_hero_skill_lists_skill_list_slug_fkey" FOREIGN KEY ("skill_list_slug") REFERENCES "public"."skill_lists"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."promoted_hero_skill_lists"
    ADD CONSTRAINT "promoted_hero_skill_lists_warband_soldier_id_fkey" FOREIGN KEY ("warband_soldier_id") REFERENCES "public"."warband_soldier"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."skill_to_warband_soldier"
    ADD CONSTRAINT "skill_to_warband_soldier_skill_slug_fkey" FOREIGN KEY ("skill_slug") REFERENCES "public"."skills"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."skill_to_warband_soldier"
    ADD CONSTRAINT "skill_to_warband_soldier_warband_soldier_id_fkey" FOREIGN KEY ("warband_soldier_id") REFERENCES "public"."warband_soldier"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."skills"
    ADD CONSTRAINT "skills_skill_list_slug_fkey" FOREIGN KEY ("skill_list_slug") REFERENCES "public"."skill_lists"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."spell_to_warband_soldier"
    ADD CONSTRAINT "spell_to_warband_soldier_spell_slug_fkey" FOREIGN KEY ("spell_slug") REFERENCES "public"."spells"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."spell_to_warband_soldier"
    ADD CONSTRAINT "spell_to_warband_soldier_warband_soldier_id_fkey" FOREIGN KEY ("warband_soldier_id") REFERENCES "public"."warband_soldier"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."spells"
    ADD CONSTRAINT "spells_spell_lore_slug_fkey" FOREIGN KEY ("spell_lore_slug") REFERENCES "public"."spell_lores"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."super_natural_ability_to_warband_soldier"
    ADD CONSTRAINT "super_natural_ability_to_warband_soldier_super_natural_abi_fkey" FOREIGN KEY ("super_natural_ability_slug") REFERENCES "public"."super_natural_abilities"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."super_natural_ability_to_warband_soldier"
    ADD CONSTRAINT "super_natural_ability_to_warband_soldier_warband_soldier_i_fkey" FOREIGN KEY ("warband_soldier_id") REFERENCES "public"."warband_soldier"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."warband_soldier"
    ADD CONSTRAINT "warband_soldier_warband_id_fkey" FOREIGN KEY ("warband_id") REFERENCES "public"."warbands"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."warbands"
    ADD CONSTRAINT "warbands_faction_slug_fkey" FOREIGN KEY ("faction_slug") REFERENCES "public"."factions"("slug") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."warbands"
    ADD CONSTRAINT "warbands_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";














































































































































































GRANT ALL ON TABLE "public"."_prisma_migrations" TO "anon";
GRANT ALL ON TABLE "public"."_prisma_migrations" TO "authenticated";
GRANT ALL ON TABLE "public"."_prisma_migrations" TO "service_role";



GRANT ALL ON TABLE "public"."advancement_to_warband_soldier" TO "anon";
GRANT ALL ON TABLE "public"."advancement_to_warband_soldier" TO "authenticated";
GRANT ALL ON TABLE "public"."advancement_to_warband_soldier" TO "service_role";



GRANT ALL ON TABLE "public"."advancements" TO "anon";
GRANT ALL ON TABLE "public"."advancements" TO "authenticated";
GRANT ALL ON TABLE "public"."advancements" TO "service_role";



GRANT ALL ON TABLE "public"."base_figure_to_warband_soldier" TO "anon";
GRANT ALL ON TABLE "public"."base_figure_to_warband_soldier" TO "authenticated";
GRANT ALL ON TABLE "public"."base_figure_to_warband_soldier" TO "service_role";



GRANT ALL ON TABLE "public"."base_figures" TO "anon";
GRANT ALL ON TABLE "public"."base_figures" TO "authenticated";
GRANT ALL ON TABLE "public"."base_figures" TO "service_role";



GRANT ALL ON TABLE "public"."equipment_to_vault" TO "anon";
GRANT ALL ON TABLE "public"."equipment_to_vault" TO "authenticated";
GRANT ALL ON TABLE "public"."equipment_to_vault" TO "service_role";



GRANT ALL ON TABLE "public"."equipment_to_warband_soldier" TO "anon";
GRANT ALL ON TABLE "public"."equipment_to_warband_soldier" TO "authenticated";
GRANT ALL ON TABLE "public"."equipment_to_warband_soldier" TO "service_role";



GRANT ALL ON TABLE "public"."equipments" TO "anon";
GRANT ALL ON TABLE "public"."equipments" TO "authenticated";
GRANT ALL ON TABLE "public"."equipments" TO "service_role";



GRANT ALL ON TABLE "public"."factions" TO "anon";
GRANT ALL ON TABLE "public"."factions" TO "authenticated";
GRANT ALL ON TABLE "public"."factions" TO "service_role";



GRANT ALL ON TABLE "public"."figure_to_avaiable_equipment" TO "anon";
GRANT ALL ON TABLE "public"."figure_to_avaiable_equipment" TO "authenticated";
GRANT ALL ON TABLE "public"."figure_to_avaiable_equipment" TO "service_role";



GRANT ALL ON TABLE "public"."figure_to_skill_list" TO "anon";
GRANT ALL ON TABLE "public"."figure_to_skill_list" TO "authenticated";
GRANT ALL ON TABLE "public"."figure_to_skill_list" TO "service_role";



GRANT ALL ON TABLE "public"."figure_to_spell_lore" TO "anon";
GRANT ALL ON TABLE "public"."figure_to_spell_lore" TO "authenticated";
GRANT ALL ON TABLE "public"."figure_to_spell_lore" TO "service_role";



GRANT ALL ON TABLE "public"."injuries" TO "anon";
GRANT ALL ON TABLE "public"."injuries" TO "authenticated";
GRANT ALL ON TABLE "public"."injuries" TO "service_role";



GRANT ALL ON TABLE "public"."injury_to_warband_soldier" TO "anon";
GRANT ALL ON TABLE "public"."injury_to_warband_soldier" TO "authenticated";
GRANT ALL ON TABLE "public"."injury_to_warband_soldier" TO "service_role";



GRANT ALL ON TABLE "public"."legend_starting_equipment" TO "anon";
GRANT ALL ON TABLE "public"."legend_starting_equipment" TO "authenticated";
GRANT ALL ON TABLE "public"."legend_starting_equipment" TO "service_role";



GRANT ALL ON TABLE "public"."legend_starting_skills" TO "anon";
GRANT ALL ON TABLE "public"."legend_starting_skills" TO "authenticated";
GRANT ALL ON TABLE "public"."legend_starting_skills" TO "service_role";



GRANT ALL ON TABLE "public"."legend_starting_spells" TO "anon";
GRANT ALL ON TABLE "public"."legend_starting_spells" TO "authenticated";
GRANT ALL ON TABLE "public"."legend_starting_spells" TO "service_role";



GRANT ALL ON TABLE "public"."mercenary_starting_equipment" TO "anon";
GRANT ALL ON TABLE "public"."mercenary_starting_equipment" TO "authenticated";
GRANT ALL ON TABLE "public"."mercenary_starting_equipment" TO "service_role";



GRANT ALL ON TABLE "public"."modifiers" TO "anon";
GRANT ALL ON TABLE "public"."modifiers" TO "authenticated";
GRANT ALL ON TABLE "public"."modifiers" TO "service_role";



GRANT ALL ON TABLE "public"."promoted_hero_skill_lists" TO "anon";
GRANT ALL ON TABLE "public"."promoted_hero_skill_lists" TO "authenticated";
GRANT ALL ON TABLE "public"."promoted_hero_skill_lists" TO "service_role";



GRANT ALL ON TABLE "public"."races" TO "anon";
GRANT ALL ON TABLE "public"."races" TO "authenticated";
GRANT ALL ON TABLE "public"."races" TO "service_role";



GRANT ALL ON TABLE "public"."skill_lists" TO "anon";
GRANT ALL ON TABLE "public"."skill_lists" TO "authenticated";
GRANT ALL ON TABLE "public"."skill_lists" TO "service_role";



GRANT ALL ON TABLE "public"."skill_to_warband_soldier" TO "anon";
GRANT ALL ON TABLE "public"."skill_to_warband_soldier" TO "authenticated";
GRANT ALL ON TABLE "public"."skill_to_warband_soldier" TO "service_role";



GRANT ALL ON TABLE "public"."skills" TO "anon";
GRANT ALL ON TABLE "public"."skills" TO "authenticated";
GRANT ALL ON TABLE "public"."skills" TO "service_role";



GRANT ALL ON TABLE "public"."spell_lores" TO "anon";
GRANT ALL ON TABLE "public"."spell_lores" TO "authenticated";
GRANT ALL ON TABLE "public"."spell_lores" TO "service_role";



GRANT ALL ON TABLE "public"."spell_to_warband_soldier" TO "anon";
GRANT ALL ON TABLE "public"."spell_to_warband_soldier" TO "authenticated";
GRANT ALL ON TABLE "public"."spell_to_warband_soldier" TO "service_role";



GRANT ALL ON TABLE "public"."spells" TO "anon";
GRANT ALL ON TABLE "public"."spells" TO "authenticated";
GRANT ALL ON TABLE "public"."spells" TO "service_role";



GRANT ALL ON TABLE "public"."super_natural_abilities" TO "anon";
GRANT ALL ON TABLE "public"."super_natural_abilities" TO "authenticated";
GRANT ALL ON TABLE "public"."super_natural_abilities" TO "service_role";



GRANT ALL ON TABLE "public"."super_natural_ability_to_warband_soldier" TO "anon";
GRANT ALL ON TABLE "public"."super_natural_ability_to_warband_soldier" TO "authenticated";
GRANT ALL ON TABLE "public"."super_natural_ability_to_warband_soldier" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON TABLE "public"."warband_soldier" TO "anon";
GRANT ALL ON TABLE "public"."warband_soldier" TO "authenticated";
GRANT ALL ON TABLE "public"."warband_soldier" TO "service_role";



GRANT ALL ON TABLE "public"."warbands" TO "anon";
GRANT ALL ON TABLE "public"."warbands" TO "authenticated";
GRANT ALL ON TABLE "public"."warbands" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































