import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class UserModel extends Model {

  @Column({ primaryKey: true })
  id: number;

  @Column
  username: string;

  @Column
  password: string;

}
