import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Button,
  Stack,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { GET_USERS, DELETE_USER } from '../graphql/operations';
import type { User } from '../graphql/operations';

interface UserListProps {
  onUserDeleted?: () => void;
}

const UserList: React.FC<UserListProps> = ({ onUserDeleted }) => {
  const [page, setPage] = useState(1);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const limit = 5;

  const { data, loading, error, refetch } = useQuery(GET_USERS, {
    variables: { limit, page },
    errorPolicy: 'all',
  });

  const [deleteUser, { loading: deleting }] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS, variables: { limit, page } }],
    onCompleted: () => {
      setDeleteUserId(null);
      onUserDeleted?.();
    },
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleDeleteClick = (userId: string) => {
    setDeleteUserId(userId);
  };

  const handleDeleteConfirm = async () => {
    if (deleteUserId) {
      try {
        await deleteUser({
          variables: { id: deleteUserId },
        });
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteUserId(null);
  };

  const formatAge = (age: number) => {
    return `${age} year${age !== 1 ? 's' : ''} old`;
  };

  if (loading && !data) {
    return (
      <Card sx={{ maxWidth: 800, margin: 'auto', mt: 2 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ maxWidth: 800, margin: 'auto', mt: 2 }}>
        <CardContent>
          <Alert severity="error">
            Error loading users: {error.message}
          </Alert>
          <Button onClick={() => refetch()} sx={{ mt: 2 }}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  const users = data?.users?.users || [];
  const totalUsers = data?.users?.total || 0;
  const totalPages = Math.ceil(totalUsers / limit);

  return (
    <>
      <Card sx={{ maxWidth: 800, margin: 'auto', mt: 2 }}>
        <CardHeader 
          title="Users" 
          subheader={`${totalUsers} total users`}
        />
        <CardContent>
          {users.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No users found. Create your first user!
            </Typography>
          ) : (
            <List>
              {users.map((user: User) => (
                <ListItem key={user._id} divider>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h6">
                          {user.firstName} {user.lastName}
                        </Typography>
                        {user.gender && (
                          <Chip 
                            label={user.gender} 
                            size="small" 
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Stack spacing={1} sx={{ mt: 1 }}>
                        <Typography variant="body2">
                          📧 {user.email}
                        </Typography>
                        <Typography variant="body2">
                          🎂 {formatAge(user.age)}
                        </Typography>
                        {user.phone && (
                          <Typography variant="body2">
                            📞 {user.phone}
                          </Typography>
                        )}
                        {user.bio && (
                          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                            💭 {user.bio}
                          </Typography>
                        )}
                      </Stack>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Stack direction="row" spacing={1}>
                      <IconButton 
                        edge="end" 
                        aria-label="edit"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(user._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={!!deleteUserId} 
        onClose={handleDeleteCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this user? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            disabled={deleting}
          >
            {deleting ? <CircularProgress size={20} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserList;