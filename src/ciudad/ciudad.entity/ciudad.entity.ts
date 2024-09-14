import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Supermercado } from '../../supermercado/supermercado.entity/supermercado.entity';

@Entity()
export class Ciudad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  pais: string;

  @Column()
  numHabitantes: number;

  @ManyToMany(() => Supermercado, (supermercado) => supermercado.ciudades)
  @JoinTable()
  supermercados: Supermercado[];
}
