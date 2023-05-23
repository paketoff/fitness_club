import { AnswerEntity } from "src/modules/answers/entities/answer.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id_question: number;

  @Column({type: 'mediumtext'})
  question_text: string;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];
}