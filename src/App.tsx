import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  Snackbar,
  Alert,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import AppointmentForm from './components/AppointmentForm';
import AppointmentCard from './components/AppointmentCard';
import ConfirmDialog from './components/ConfirmDialog';
import { Appointment, AppointmentFormData } from './types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, appointmentId: '' });
  const [editingAppointment, setEditingAppointment] = useState<AppointmentFormData | null>(null);

  const handleSubmitAppointment = (formData: AppointmentFormData) => {
    if (editingAppointment) {
      // Update existing appointment
      const appointmentId = appointments.find(
        (apt) =>
          apt.patientName === editingAppointment.patientName &&
          apt.phoneNumber === editingAppointment.phoneNumber
      )?.id;

      if (appointmentId) {
        setAppointments(
          appointments.map((apt) =>
            apt.id === appointmentId
              ? {
                  ...apt,
                  ...formData,
                  appointmentDate: formData.appointmentDate!,
                  appointmentTime: formData.appointmentTime!,
                }
              : apt
          )
        );
        setSnackbar({ open: true, message: 'Appointment updated successfully!' });
        setEditingAppointment(null);
      }
    } else {
      // Create new appointment
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patientName: formData.patientName,
        phoneNumber: formData.phoneNumber,
        email: formData.email || undefined,
        doctor: formData.doctor,
        department: formData.department,
        appointmentDate: formData.appointmentDate!,
        appointmentTime: formData.appointmentTime!,
        visitType: formData.visitType,
        symptoms: formData.symptoms || undefined,
        status: 'Booked',
      };

      setAppointments([...appointments, newAppointment]);
      setSnackbar({ open: true, message: 'Appointment booked successfully!' });
    }
  };

  const handleEditAppointment = (appointment: Appointment) => {
    const formData: AppointmentFormData = {
      patientName: appointment.patientName,
      phoneNumber: appointment.phoneNumber,
      email: appointment.email || '',
      doctor: appointment.doctor,
      department: appointment.department,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      visitType: appointment.visitType,
      symptoms: appointment.symptoms || '',
      consent: true,
    };
    setEditingAppointment(formData);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelClick = (id: string) => {
    setConfirmDialog({ open: true, appointmentId: id });
  };

  const handleConfirmCancel = () => {
    setAppointments(appointments.filter((apt) => apt.id !== confirmDialog.appointmentId));
    setSnackbar({ open: true, message: 'Appointment cancelled' });
    setConfirmDialog({ open: false, appointmentId: '' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '' });
  };

  const handleCancelDialog = () => {
    setConfirmDialog({ open: false, appointmentId: '' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Doctor Appointment System
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Book and manage your medical appointments
          </Typography>
        </Box>

        {/* Appointment Form */}
        <Box sx={{ mb: 4 }}>
          <AppointmentForm onSubmit={handleSubmitAppointment} editData={editingAppointment} />
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Appointments List */}
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            {appointments.length > 0
              ? `Your Appointments (${appointments.length})`
              : 'No Appointments Yet'}
          </Typography>

          {appointments.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                px: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: '1px dashed',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Book your first appointment using the form above
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {appointments.map((appointment) => (
                <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                  <AppointmentCard
                    appointment={appointment}
                    onEdit={handleEditAppointment}
                    onCancel={handleCancelClick}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Confirmation Dialog */}
        <ConfirmDialog
          open={confirmDialog.open}
          title="Cancel Appointment"
          message="Are you sure you want to cancel this appointment? This action cannot be undone."
          onConfirm={handleConfirmCancel}
          onCancel={handleCancelDialog}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
