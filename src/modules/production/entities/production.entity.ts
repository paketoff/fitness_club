import { AnswerEntity } from "src/modules/answers/entities/answer.entity";
import { Column, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


export class ProductionEntity {

  @PrimaryGeneratedColumn()
  id_productin: number;

  @Column({type: 'mediumtext'})
  sql_query: string;

  @OneToOne(() => AnswerEntity, (answer) => answer.production)
  answer: AnswerEntity;
}