import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton
} from '@mui/material';
import * as settingsDialog from 'features/dialog/settingsDialogSlice';

const SettingsDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAnimationChange = (event: Event) => {
    dispatch(settingsDialog.accept({
      pieceAnimation: event.target.value === 'on' ? 'off' : 'on'
    }));
  };

  const handleHeuristicsChange = (event: Event) => {
    dispatch(settingsDialog.accept({
      heuristics: event.target.value === 'on' ? 'off' : 'on'
    }));
  };

  return (
    <Dialog open={state.settingsDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Settings
        <IconButton onClick={() => dispatch(settingsDialog.close())}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            label="Animate the chess pieces while playing"
            control={<Checkbox
              name="pieceAnimation"
              checked={state.settingsDialog.fields.pieceAnimation === 'on'}
              value={state.settingsDialog.fields.pieceAnimation}
              onChange={handleAnimationChange}
            />}
          />
          <FormControlLabel
            label="Show heuristics while playing"
            control={<Checkbox
              name="heuristics"
              checked={state.settingsDialog.fields.heuristics === 'on'}
              value={state.settingsDialog.fields.heuristics}
              onChange={handleHeuristicsChange}
            />}
          />
        </FormGroup>
        <Button
          fullWidth
          type="submit"
          variant="outlined"
          onClick={() => dispatch(settingsDialog.close())}
          sx={{ mt: 2 }}
        >
          Accept
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
