import { ProductionEntity } from "src/modules/production/entities/production.entity";
import { QuestionEntity } from "src/modules/questions/entities/question.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('answers')
export class AnswerEntity {

  @PrimaryGeneratedColumn() 
  id_answer: number;

  @Column({type: 'mediumtext'})
  answer_text: string;

  @ManyToOne(() => QuestionEntity, (question) => question.answers)
  @JoinColumn({ name: "id_question" }) 
  question: QuestionEntity;

  @OneToOne(() => ProductionEntity, (production) => production.answer)
  production: ProductionEntity;
}