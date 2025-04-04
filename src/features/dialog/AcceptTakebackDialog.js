import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from 'common/Wording.js';
import * as acceptTakebackDialog from 'features/dialog/acceptTakebackDialogSlice';
import WsAction from 'features/ws/WsAction';

const AcceptTakebackDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleTakebackAccept = (event) => {
    event.preventDefault();
    WsAction.takeback(Wording.verb.ACCEPT.toLowerCase());
    WsAction.undo();
    dispatch(acceptTakebackDialog.close());
  };

  return (
    <Dialog
      open={state.acceptTakebackDialog.open}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>A takeback is being proposed</DialogTitle>
      <DialogContent>
        <form onSubmit={handleTakebackAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(acceptTakebackDialog.close())}>
              Decline
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptTakebackDialog;
