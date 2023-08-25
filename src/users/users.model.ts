import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttr {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'First name', description: 'User first name' })
  @Column({ type: DataType.STRING, allowNull: true })
  firstName: string;

  @ApiProperty({ example: 'Last name', description: 'User last name' })
  @Column({ type: DataType.STRING, allowNull: true })
  lastName: string;

  @ApiProperty({
    example: 'test@yopmail.com',
    description: 'User email address',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '11111', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'Last name', description: 'User last name' })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  phone: string;

  @ApiProperty({ example: true, description: 'User active state' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  isActive: boolean;

  @ApiProperty({ example: false, description: 'User archived' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: false })
  archived: boolean;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
