import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Ciudad } from '../../ciudad/ciudad.entity/ciudad.entity';

@Entity()
export class Supermercado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column('decimal')
  longitud: number;

  @Column('decimal')
  latitud: number;

  @Column()
  paginaWeb: string;

  @ManyToMany(() => Ciudad, (ciudad) => ciudad.supermercados)
  ciudades: Ciudad[];
}
