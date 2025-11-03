import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Grid,
  FormHelperText,
  FormLabel,
  Box,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { AppointmentFormData } from '../types';

interface AppointmentFormProps {
  onSubmit: (formData: AppointmentFormData) => void;
  editData?: AppointmentFormData | null;
}

const doctors = [
  { name: 'Dr. Rao – Cardiology', department: 'Cardiology' },
  { name: 'Dr. Meera – Dermatology', department: 'Dermatology' },
  { name: 'Dr. Arjun – Pediatrics', department: 'Pediatrics' },
  { name: 'Dr. Sharma – General Medicine', department: 'General Medicine' },
];

const departments = ['Cardiology', 'Dermatology', 'Pediatrics', 'General Medicine'];

const initialFormData: AppointmentFormData = {
  patientName: '',
  phoneNumber: '',
  email: '',
  doctor: '',
  department: '',
  appointmentDate: null,
  appointmentTime: null,
  visitType: 'New',
  symptoms: '',
  consent: false,
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, editData }) => {
  const [formData, setFormData] = useState<AppointmentFormData>(editData || initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validatePhone = (phone: string): boolean => {
    return /^\d{10}$/.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Optional field
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.doctor) {
      newErrors.doctor = 'Please select a doctor';
    }

    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Appointment date is required';
    }

    if (!formData.appointmentTime) {
      newErrors.appointmentTime = 'Appointment time is required';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to clinic policies';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    if (validateForm()) {
      onSubmit(formData);
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
  };

  const handleDoctorChange = (doctorName: string) => {
    const selectedDoctor = doctors.find(d => d.name === doctorName);
    setFormData({
      ...formData,
      doctor: doctorName,
      department: selectedDoctor?.department || '',
    });
  };

  const isFormValid = (): boolean => {
    return (
      formData.patientName.trim() !== '' &&
      validatePhone(formData.phoneNumber) &&
      validateEmail(formData.email) &&
      formData.doctor !== '' &&
      formData.department !== '' &&
      formData.appointmentDate !== null &&
      formData.appointmentTime !== null &&
      formData.consent
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card elevation={3}>
        <CardHeader
          title="Book Appointment"
          titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Patient Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Patient Name"
                  required
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  onBlur={() => handleBlur('patientName')}
                  error={touched.patientName && !!errors.patientName}
                  helperText={touched.patientName && errors.patientName}
                />
              </Grid>

              {/* Phone Number */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  onBlur={() => handleBlur('phoneNumber')}
                  error={touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  placeholder="1234567890"
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onBlur={() => handleBlur('email')}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              {/* Doctor */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={touched.doctor && !!errors.doctor}>
                  <InputLabel>Doctor</InputLabel>
                  <Select
                    value={formData.doctor}
                    label="Doctor"
                    onChange={(e) => handleDoctorChange(e.target.value)}
                    onBlur={() => handleBlur('doctor')}
                  >
                    {doctors.map((doc) => (
                      <MenuItem key={doc.name} value={doc.name}>
                        {doc.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.doctor && errors.doctor && (
                    <FormHelperText>{errors.doctor}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Department */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={touched.department && !!errors.department}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={formData.department}
                    label="Department"
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    onBlur={() => handleBlur('department')}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.department && errors.department && (
                    <FormHelperText>{errors.department}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Appointment Date */}
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Appointment Date *"
                  value={formData.appointmentDate ? dayjs(formData.appointmentDate) : null}
                  onChange={(newValue: Dayjs | null) => {
                    setFormData({ ...formData, appointmentDate: newValue?.toDate() || null });
                  }}
                  minDate={dayjs().add(1, 'day')}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: touched.appointmentDate && !!errors.appointmentDate,
                      helperText: touched.appointmentDate && errors.appointmentDate,
                      onBlur: () => handleBlur('appointmentDate'),
                    },
                  }}
                />
              </Grid>

              {/* Appointment Time */}
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Appointment Time *"
                  value={formData.appointmentTime ? dayjs(formData.appointmentTime) : null}
                  onChange={(newValue: Dayjs | null) => {
                    setFormData({ ...formData, appointmentTime: newValue?.toDate() || null });
                  }}
                  minTime={dayjs().hour(9).minute(0)}
                  maxTime={dayjs().hour(17).minute(0)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: touched.appointmentTime && !!errors.appointmentTime,
                      helperText: touched.appointmentTime && errors.appointmentTime || 'Clinic hours: 09:00 - 17:00',
                      onBlur: () => handleBlur('appointmentTime'),
                    },
                  }}
                />
              </Grid>

              {/* Visit Type */}
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Visit Type</FormLabel>
                  <RadioGroup
                    row
                    value={formData.visitType}
                    onChange={(e) => setFormData({ ...formData, visitType: e.target.value as 'New' | 'Follow-up' })}
                  >
                    <FormControlLabel value="New" control={<Radio />} label="New" />
                    <FormControlLabel value="Follow-up" control={<Radio />} label="Follow-up" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Symptoms/Notes */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Symptoms / Notes"
                  multiline
                  rows={3}
                  value={formData.symptoms}
                  onChange={(e) => {
                    if (e.target.value.length <= 200) {
                      setFormData({ ...formData, symptoms: e.target.value });
                    }
                  }}
                  helperText={`${formData.symptoms.length}/200 characters`}
                />
              </Grid>

              {/* Consent */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      onBlur={() => handleBlur('consent')}
                    />
                  }
                  label="I agree to clinic policies *"
                />
                {touched.consent && errors.consent && (
                  <FormHelperText error>{errors.consent}</FormHelperText>
                )}
              </Grid>

              {/* Buttons */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    type="button"
                  >
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!isFormValid()}
                  >
                    {editData ? 'Update Appointment' : 'Submit'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default AppointmentForm;
