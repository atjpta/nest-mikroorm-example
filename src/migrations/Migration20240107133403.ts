import { Migration } from '@mikro-orm/migrations';

export class Migration20240107133403 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `maintenance` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `delete_at` datetime null, `type` varchar(255) not null, `description` varchar(255) null, `start_time` datetime null, `end_time` datetime null, `is_maintenance` tinyint(1) not null) default character set utf8mb4 engine = InnoDB;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `maintenance`;');
  }
}
