export interface Appointment {
  id: string;
  patientName: string;
  phoneNumber: string;
  email?: string;
  doctor: string;
  department: string;
  appointmentDate: Date;
  appointmentTime: Date;
  visitType: 'New' | 'Follow-up';
  symptoms?: string;
  status: 'Booked' | 'Cancelled';
}

export interface AppointmentFormData {
  patientName: string;
  phoneNumber: string;
  email: string;
  doctor: string;
  department: string;
  appointmentDate: Date | null;
  appointmentTime: Date | null;
  visitType: 'New' | 'Follow-up';
  symptoms: string;
  consent: boolean;
}
