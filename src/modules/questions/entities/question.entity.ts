import { AnswerEntity } from "src/modules/answers/entities/answer.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id_question: number;

  @Column({type: 'mediumtext'})
  question_text: string;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];
}