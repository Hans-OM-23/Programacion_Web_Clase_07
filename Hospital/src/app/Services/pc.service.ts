import { Service } from '@angular/core';
import { Paciente } from '../Interface/paciente';

@Service()
export class PcService {
  private listaPacientes: Paciente[] = [
    { nombre: 'Carlos Quispe Morales', edad: 35, telefono: '987654321' },
    { nombre: 'María Rodríguez Flores', edad: 28, telefono: '912345678' },
    { nombre: 'Juan Soto Mendoza', edad: 54, telefono: '955443322' },
  ];

  guardar(paciente: Paciente) {
    this.listaPacientes.push(paciente);
  }

  mostrar() {
    return this.listaPacientes;
  }
}
