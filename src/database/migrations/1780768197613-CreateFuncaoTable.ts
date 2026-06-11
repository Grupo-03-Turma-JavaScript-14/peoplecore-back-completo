import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFuncaoTable1780768197613 implements MigrationInterface {
    name = 'CreateFuncaoTable1780768197613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tb_funcao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`descricao\` varchar(255) NULL, \`nivel\` varchar(50) NULL, \`salarioBaseSugerido\` float NULL, \`ativo\` tinyint NOT NULL DEFAULT 1, \`criadoEm\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`atualizadoEm\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_23a9500b03d77438f53d447d0c\` (\`nome\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_categoria_funcao\` (\`funcao_id\` int NOT NULL, \`categoria_id\` int NOT NULL, INDEX \`IDX_f98624ec86d117b8f1ce45c3c1\` (\`funcao_id\`), INDEX \`IDX_1c0aea5a4d17db4216351b22f0\` (\`categoria_id\`), PRIMARY KEY (\`funcao_id\`, \`categoria_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tb_categoria_funcao\` ADD CONSTRAINT \`FK_f98624ec86d117b8f1ce45c3c11\` FOREIGN KEY (\`funcao_id\`) REFERENCES \`tb_funcao\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tb_categoria_funcao\` ADD CONSTRAINT \`FK_1c0aea5a4d17db4216351b22f0b\` FOREIGN KEY (\`categoria_id\`) REFERENCES \`tb_categoria\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_categoria_funcao\` DROP FOREIGN KEY \`FK_1c0aea5a4d17db4216351b22f0b\``);
        await queryRunner.query(`ALTER TABLE \`tb_categoria_funcao\` DROP FOREIGN KEY \`FK_f98624ec86d117b8f1ce45c3c11\``);
        await queryRunner.query(`DROP INDEX \`IDX_1c0aea5a4d17db4216351b22f0\` ON \`tb_categoria_funcao\``);
        await queryRunner.query(`DROP INDEX \`IDX_f98624ec86d117b8f1ce45c3c1\` ON \`tb_categoria_funcao\``);
        await queryRunner.query(`DROP TABLE \`tb_categoria_funcao\``);
        await queryRunner.query(`DROP INDEX \`IDX_23a9500b03d77438f53d447d0c\` ON \`tb_funcao\``);
        await queryRunner.query(`DROP TABLE \`tb_funcao\``);
    }

}
