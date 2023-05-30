import { AnswerEntity } from "src/modules/answers/entities/answer.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('production')
export class ProductionEntity {

  @PrimaryGeneratedColumn()
  id_production: number;

  @Column({type: 'mediumtext'})
  sql_query: string;

  @OneToOne(() => AnswerEntity, (answer) => answer.production)
  @JoinColumn({name: "answer_id"})
  answer: AnswerEntity;
}