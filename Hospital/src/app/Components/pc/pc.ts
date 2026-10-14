import { Component, inject, signal } from '@angular/core';
import { Paciente } from '../../Interface/paciente';
import { form, min, required, FormField } from '@angular/forms/signals';
import { PcService } from '../../Services/pc.service';
import Swal from 'sweetalert2';

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  badge: string;
}

interface Medico {
  id: number;
  nombre: string;
  especialidad: string;
  experiencia: string;
  colegiatura: string;
  icono: string;
}

interface Promocion {
  id: number;
  titulo: string;
  subtitulo: string;
  descuento: string;
  vigencia: string;
  icono: string;
  beneficios: string[];
}

interface Resena {
  id: number;
  autor: string;
  calificacion: number;
  comentario: string;
  fecha: string;
  servicio: string;
}

@Component({
  imports: [FormField],
  selector: 'app-pc',
  styleUrl: './pc.css',
  templateUrl: './pc.html',
})
export class Pc {
  private pcService = inject(PcService);

  listaPacientes: Paciente[] = this.pcService.mostrar();

  pacienteModelo = signal<Paciente>({
    nombre: '',
    edad: 0,
    telefono: '',
  });

  pacienteFormulario = form(this.pacienteModelo, (esquema) => {
    required(esquema.nombre, { message: 'El nombre completo es obligatorio' });
    min(esquema.edad, 1, { message: 'Debes ingresar una edad válida (mínimo 1 año)' });
    required(esquema.telefono, { message: 'El número de teléfono es obligatorio' });
  });

  readonly servicios: Servicio[] = [
    {
      id: 1,
      nombre: 'Urgencias y Emergencias 24/7',
      descripcion: 'Atención médica inmediata y ambulancias equipadas para soporte vital y trauma.',
      icono: 'bi-hospital',
      badge: 'Atención Ininterrumpida',
    },
    {
      id: 2,
      nombre: 'Cardiología Especializada',
      descripcion: 'Prevención, diagnóstico y tratamiento de patologías cardíacas con tecnología de punta.',
      icono: 'bi-heart-pulse-fill',
      badge: 'Alta Complejidad',
    },
    {
      id: 3,
      nombre: 'Pediatría y Neonatología',
      descripcion: 'Cuidado amoroso e integral para recién nacidos, niños y adolescentes.',
      icono: 'bi-emoji-smile-fill',
      badge: 'Cuidado Infantil',
    },
    {
      id: 4,
      nombre: 'Cirugía General y Laparoscopía',
      descripcion: 'Quirófanos modernos con procedimientos mínimamente invasivos y pronta recuperación.',
      icono: 'bi-shield-plus',
      badge: 'Quirófano Inteligente',
    },
    {
      id: 5,
      nombre: 'Laboratorio Clínico Automatizado',
      descripcion: 'Procesamiento de muestras con alta precisión y entrega rápida de resultados en línea.',
      icono: 'bi-virus2',
      badge: 'Resultados en 2h',
    },
    {
      id: 6,
      nombre: 'Traumatología y Ortopedia',
      descripcion: 'Tratamiento de fracturas, dolencias de columna, articulaciones y rehabilitación física.',
      icono: 'bi-activity',
      badge: 'Rehabilitación Rápida',
    },
  ];

  readonly medicos: Medico[] = [
    {
      id: 1,
      nombre: 'Dr. Roberto Sano',
      especialidad: 'Cirugía General y Digestiva',
      experiencia: '18 años de experiencia',
      colegiatura: 'CMP: 34120',
      icono: 'bi-person-badge-fill',
    },
    {
      id: 2,
      nombre: 'Dra. Elena Torres Mendoza',
      especialidad: 'Pediatría y Cuidado Neonatal',
      experiencia: '12 años de experiencia',
      colegiatura: 'CMP: 45678',
      icono: 'bi-person-heart',
    },
    {
      id: 3,
      nombre: 'Dr. Marco Valdivia Ramos',
      especialidad: 'Cardiología Intervencionista',
      experiencia: '15 años de experiencia',
      colegiatura: 'CMP: 39012',
      icono: 'bi-person-check-fill',
    },
    {
      id: 4,
      nombre: 'Dra. Sofía Salazar Gómez',
      especialidad: 'Medicina Interna y Preventiva',
      experiencia: '10 años de experiencia',
      colegiatura: 'CMP: 49831',
      icono: 'bi-person-workspace',
    },
  ];

  readonly promociones: Promocion[] = [
    {
      id: 1,
      titulo: 'Chequeo Preventivo Integral',
      subtitulo: 'Paquete de despistaje completo para adultos',
      descuento: '40% DCTO',
      vigencia: 'Válido todo el mes',
      icono: 'bi-patch-check-fill',
      beneficios: [
        'Hemograma completo y perfil lipídico',
        'Glucosa, úrea y creatinina',
        'Electrocardiograma (ECG)',
        'Consulta médica general de resultados',
      ],
    },
    {
      id: 2,
      titulo: 'Campaña Escolar Pediátrica',
      subtitulo: 'Evaluación integral del crecimiento infantil',
      descuento: '30% DCTO',
      vigencia: 'Cupos limitados',
      icono: 'bi-balloon-heart-fill',
      beneficios: [
        'Examen de agudeza visual y auditiva',
        'Control de peso, talla y nutrición',
        'Evaluación odontológica preventiva',
        'Despistaje de anemia (hemoglobina)',
      ],
    },
    {
      id: 3,
      titulo: 'Salud Cardiovascular Total',
      subtitulo: 'Diagnóstico cardiológico preventivo',
      descuento: 'S/ 149.00',
      vigencia: 'De Lunes a Sábado',
      icono: 'bi-heartbreak-fill',
      beneficios: [
        'Consulta especializada con cardiólogo',
        'Electrocardiograma con informe',
        'Control de presión arterial ambulatoria',
        'Plan personalizado de salud cardíaca',
      ],
    },
  ];

  readonly resenas: Resena[] = [
    {
      id: 1,
      autor: 'Patricia Morales V.',
      calificacion: 5,
      comentario:
        'La atención en el área de emergencias fue inmediata y humana. El equipo médico nos brindó una tranquilidad enorme.',
      fecha: 'Hace 3 días',
      servicio: 'Emergencias 24/7',
    },
    {
      id: 2,
      autor: 'Fernando Gómez R.',
      calificacion: 5,
      comentario:
        'La Dra. Elena Torres es maravillosa con los niños. Trató a mi hijo con mucha empatía y paciencia. Instalaciones impecables.',
      fecha: 'Hace 1 semana',
      servicio: 'Pediatría',
    },
    {
      id: 3,
      autor: 'Lucía Mendoza C.',
      calificacion: 5,
      comentario:
        'Aproveché la campaña de chequeo integral y fue excelente. Puntuales, rápidos y la entrega digital de resultados es fantástica.',
      fecha: 'Hace 2 semanas',
      servicio: 'Laboratorio y Cardiología',
    },
  ];

  constructor() {
    this.mostrarPacientes();
  }

  guardar(evento: Event) {
    evento.preventDefault();
    const nuevoPaciente: Paciente = {
      nombre: this.pacienteModelo().nombre,
      edad: Number(this.pacienteModelo().edad),
      telefono: this.pacienteModelo().telefono,
    };

    this.pcService.guardar(nuevoPaciente);
    this.mostrarPacientes();

    Swal.fire({
      title: 'Good job!',
      text: '¡Paciente registrado con éxito!',
      icon: 'success',
      confirmButtonColor: '#0d6efd',
    });

    this.limpiar();
  }

  mostrarPacientes() {
    this.listaPacientes = this.pcService.mostrar();
  }

  limpiar() {
    this.pacienteModelo.set({
      nombre: '',
      edad: 0,
      telefono: '',
    });
  }
}
