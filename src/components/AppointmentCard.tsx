import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Chip,
  Box,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { Appointment } from '../types';

interface AppointmentCardProps {
  appointment: Appointment;
  onEdit?: (appointment: Appointment) => void;
  onCancel: (id: string) => void;
}

const getDoctorInitials = (doctorName: string): string => {
  const parts = doctorName.split(' ');
  if (parts.length >= 2) {
    return parts[0].charAt(0) + parts[1].charAt(0);
  }
  return doctorName.substring(0, 2).toUpperCase();
};

const getAvatarColor = (department: string): string => {
  const colors: Record<string, string> = {
    'Cardiology': '#f44336',
    'Dermatology': '#9c27b0',
    'Pediatrics': '#2196f3',
    'General Medicine': '#4caf50',
  };
  return colors[department] || '#757575';
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onEdit, onCancel }) => {
  return (
    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: getAvatarColor(appointment.department) }}>
            {getDoctorInitials(appointment.doctor)}
          </Avatar>
        }
        title={appointment.doctor}
        subheader={appointment.department}
        titleTypographyProps={{ fontWeight: 'bold' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Date and Time */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <CalendarIcon color="action" fontSize="small" />
              <Typography variant="body1" fontWeight="medium">
                {dayjs(appointment.appointmentDate).format('MMMM DD, YYYY')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimeIcon color="action" fontSize="small" />
              <Typography variant="body1" fontWeight="medium">
                {dayjs(appointment.appointmentTime).format('hh:mm A')}
              </Typography>
            </Box>
          </Grid>

          {/* Patient Info */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <PersonIcon color="action" fontSize="small" />
              <Typography variant="body2">
                {appointment.patientName}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon color="action" fontSize="small" />
              <Typography variant="body2">
                {appointment.phoneNumber}
              </Typography>
            </Box>
          </Grid>

          {/* Chips */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={appointment.visitType}
                color={appointment.visitType === 'New' ? 'primary' : 'secondary'}
                size="small"
              />
              <Chip
                label={appointment.status}
                color={appointment.status === 'Booked' ? 'success' : 'default'}
                size="small"
              />
            </Box>
          </Grid>

          {/* Symptoms if present */}
          {appointment.symptoms && (
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                <strong>Notes:</strong> {appointment.symptoms}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        {onEdit && (
          <IconButton
            size="small"
            color="primary"
            onClick={() => onEdit(appointment)}
            aria-label="edit appointment"
          >
            <EditIcon />
          </IconButton>
        )}
        <IconButton
          size="small"
          color="error"
          onClick={() => onCancel(appointment.id)}
          aria-label="cancel appointment"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AppointmentCard;
