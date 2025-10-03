import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Alert,
  CircularProgress,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { CREATE_USER, GET_USERS } from '../graphql/operations';
import type { CreateUserInput } from '../graphql/operations';

interface UserFormProps {
  onUserCreated?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserCreated }) => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS, variables: { limit: 10, page: 1 } }],
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: 18,
      phone: '',
      bio: '',
      gender: '',
    },
  });

  const onSubmit = async (data: CreateUserInput) => {
    try {
      const result = await createUser({
        variables: {
          input: {
            ...data,
            age: Number(data.age), // Convert age to number
            phone: data.phone || undefined,
            bio: data.bio || undefined,
            gender: data.gender || undefined,
          },
        },
      });

      if (result.data?.createUser) {
        setSuccessMessage(`User ${result.data.createUser.firstName} ${result.data.createUser.lastName} created successfully!`);
        reset();
        onUserCreated?.();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 2 }}>
      <CardHeader title="Create New User" />
      <CardContent>
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="First Name"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    disabled={loading}
                  />
                )}
              />
              
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Last Name"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    disabled={loading}
                  />
                )}
              />
            </Box>

            <Controller
              name="email"
              control={control}
              rules={{ 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Please enter a valid email address'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="email"
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={loading}
                />
              )}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Controller
                name="age"
                control={control}
                rules={{ 
                  required: 'Age is required',
                  min: { value: 1, message: 'Age must be at least 1' },
                  max: { value: 150, message: 'Age must be less than 150' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Age"
                    error={!!errors.age}
                    helperText={errors.age?.message}
                    disabled={loading}
                  />
                )}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      {...field}
                      label="Gender"
                      disabled={loading}
                    >
                      <MenuItem value="">Select Gender</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Box>

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Phone Number (Optional)"
                  disabled={loading}
                />
              )}
            />

            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Bio (Optional)"
                  multiline
                  rows={3}
                  disabled={loading}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Create User'}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserForm;