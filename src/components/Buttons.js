import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, ButtonGroup, Menu, MenuItem } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import DownloadIcon from '@mui/icons-material/Download';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PublishIcon from '@mui/icons-material/Publish';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import TuneIcon from '@mui/icons-material/Tune';
import { useDispatch, useSelector } from 'react-redux';
import { wsMssgQuit, wsMssgStartAnalysis, wsMssgStartLoadpgn } from '../actions/serverActions';
import chessOpeningAnalysisAlertActionTypes from '../constants/alert/chessOpeningAnalysisAlertActionTypes';
import infoAlertActionTypes from '../constants/alert/infoAlertActionTypes';
import loadFenDialogActionTypes from '../constants/dialog/loadFenDialogActionTypes';
import loadPgnDialogActionTypes from '../constants/dialog/loadPgnDialogActionTypes';
import fenDialogActionTypes from '../constants/dialog/fenDialogActionTypes';
import createInviteCodeDialogActionTypes from '../constants/dialog/createInviteCodeDialogActionTypes';
import enterInviteCodeDialogActionTypes from '../constants/dialog/enterInviteCodeDialogActionTypes';
import chessOpeningSearchEcoDialogActionTypes from '../constants/dialog/chessOpeningSearchEcoDialogActionTypes';
import chessOpeningSearchNameDialogActionTypes from '../constants/dialog/chessOpeningSearchNameDialogActionTypes';
import chessOpeningSearchMovetextDialogActionTypes from '../constants/dialog/chessOpeningSearchMovetextDialogActionTypes';
import playLikeGrandmasterDialogActionTypes from '../constants/dialog/playLikeGrandmasterDialogActionTypes';
import boardActionTypes from '../constants/boardActionTypes';
import historyActionTypes from '../constants/historyActionTypes';
import modeActionTypes from '../constants/modeActionTypes';

const Buttons = ({ props }) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElPlayFriend, setAnchorElPlayFriend] = React.useState(null);
  const [anchorElTraining, setAnchorElTraining] = React.useState(null);
  const [anchorElOpeningSearch, setAnchorElOpeningSearch] = React.useState(null);
  const [anchorElLoad, setAnchorElLoad] = React.useState(null);
  const [anchorElDownload, setAnchorElDownload] = React.useState(null);
  const [anchorElSettings, setAnchorElSettings] = React.useState(null);

  const matches = useMediaQuery("(min-width:768px)");

  const reset = () => {
    dispatch({ type: chessOpeningAnalysisAlertActionTypes.CLOSE });
    dispatch({ type: infoAlertActionTypes.CLOSE });
    dispatch({ type: historyActionTypes.GO_TO_BEGINNING, payload: { back: 0 }});
    wsMssgQuit(state).then(() => wsMssgStartAnalysis(state.server.ws));
  };

  const handleClosePlayFriend = () => {
    setAnchorElPlayFriend(null);
  };

  const handleCloseTraining = () => {
    setAnchorElTraining(null);
  };

  const handleCloseOpeningSearch = () => {
    setAnchorElOpeningSearch(null);
  };

  const handleCloseLoad = () => {
    setAnchorElLoad(null);
  };

  const handleCloseDownload = () => {
    setAnchorElDownload(null);
  };

  const handleCloseSettings = () => {
    setAnchorElSettings(null);
  };

  const handleClickPlayFriend = (event) => {
    reset();
    setAnchorElPlayFriend(event.currentTarget);
  };

  const handleClickTraining = (event) => {
    reset();
    setAnchorElTraining(event.currentTarget);
  };

  const handleClickOpeningSearch = (event) => {
    reset();
    setAnchorElOpeningSearch(event.currentTarget);
  };

  const handleClickLoad = (event) => {
    reset();
    setAnchorElLoad(event.currentTarget);
  };

  const handleClickDownload = (event) => {
    setAnchorElDownload(event.currentTarget);
  };

  const handleClickSettings = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleDownloadImage = async () => {
    await fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/download_image`, {
      method: 'POST',
      body: JSON.stringify({ fen: state.board.fen })
    }).then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "chessboard.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }

  const handleDownloadMp4 = async () => {
    await fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/download_mp4`, {
      method: 'POST',
      body: JSON.stringify({ movetext: state.board.movetext })
    }).then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "chessgame.mp4";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }

  const handleRandomTournamentGame = async () => {
    await fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/tournament`, {
      method: 'POST'
    }).then(res => res.json())
      .then(res => {
        dispatch({ type: chessOpeningAnalysisAlertActionTypes.CLOSE });
        dispatch({
          type: infoAlertActionTypes.DISPLAY,
          payload: {
            info: `Event: ${res.Event} \n
              Site: ${res.Site} \n
              Date: ${res.Date} \n
              White: ${res.White} \n
              Black: ${res.Black} \n
              Result: ${res.Result} \n
              ECO: ${res.ECO}`
          }
        });
        wsMssgQuit(state).then(() => wsMssgStartLoadpgn(state, res.movetext));
      });
  }

  return (
    <ButtonGroup
      size="small"
      variant="text"
      aria-label="text button group"
      orientation={`${matches ? `horizontal` : `vertical`}`}
      fullWidth={matches ? false : true}
    >
      <Button
        startIcon={<GroupAddIcon />}
        onClick={handleClickPlayFriend}
      >
        Invite a Friend
      </Button>
      <Menu
        anchorEl={anchorElPlayFriend}
        keepMounted
        open={Boolean(anchorElPlayFriend)}
        onClose={handleClosePlayFriend}
      >
        <MenuItem onClick={() => {
          dispatch({ type: createInviteCodeDialogActionTypes.OPEN });
          dispatch({ type: modeActionTypes.SET_ANALYSIS });
          handleClosePlayFriend();
        }}>Create Invite Code</MenuItem>
        <MenuItem onClick={() => {
          dispatch({ type: enterInviteCodeDialogActionTypes.OPEN });
          handleClosePlayFriend();
        }}>Enter Invite Code</MenuItem>
      </Menu>
      <Button
        startIcon={<TuneIcon />}
        onClick={() => reset()}
      >
        Analysis Board
      </Button>
      <Button
        startIcon={<PsychologyIcon />}
        onClick={handleClickTraining}
      >
        Training
      </Button>
      <Menu
        anchorEl={anchorElTraining}
        keepMounted
        open={Boolean(anchorElTraining)}
        onClose={handleCloseTraining}
      >
        <MenuItem onClick={() => {
          dispatch({ type: playLikeGrandmasterDialogActionTypes.OPEN });
          handleCloseTraining();
        }}>
          Guess the Move
        </MenuItem>
        <MenuItem onClick={() => handleRandomTournamentGame().then(() => handleCloseTraining())}>
          Random Tournament Game
        </MenuItem>
      </Menu>
      <Button
        startIcon={<ComputerIcon />}
        onClick={handleClickOpeningSearch}
      >
        Opening Search
      </Button>
      <Menu
        anchorEl={anchorElOpeningSearch}
        keepMounted
        open={Boolean(anchorElOpeningSearch)}
        onClose={handleCloseOpeningSearch}
      >
        <MenuItem onClick={() => {
          dispatch({ type: chessOpeningSearchEcoDialogActionTypes.OPEN });
          handleCloseOpeningSearch();
        }}>
          ECO Code
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch({ type: chessOpeningSearchNameDialogActionTypes.OPEN });
          handleCloseOpeningSearch();
        }}>
          Name
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch({ type: chessOpeningSearchMovetextDialogActionTypes.OPEN });
          handleCloseOpeningSearch();
        }}>
          Movetext
        </MenuItem>
      </Menu>
      <Button
        startIcon={<PublishIcon />}
        onClick={handleClickLoad}
      >
        Load
      </Button>
      <Menu
        anchorEl={anchorElLoad}
        keepMounted
        open={Boolean(anchorElLoad)}
        onClose={handleCloseLoad}
      >
        <MenuItem onClick={() => {
          dispatch({ type: loadFenDialogActionTypes.OPEN });
          handleCloseLoad();
        }}>FEN String</MenuItem>
        <MenuItem onClick={() => {
          dispatch({ type: loadPgnDialogActionTypes.OPEN });
          handleCloseLoad();
        }}>PGN Movetext</MenuItem>
      </Menu>
      <Button
        startIcon={<DownloadIcon />}
        onClick={handleClickDownload}
      >
        Download
      </Button>
      <Menu
        anchorEl={anchorElDownload}
        keepMounted
        open={Boolean(anchorElDownload)}
        onClose={handleCloseDownload}
      >
        <MenuItem onClick={() => handleDownloadImage().then(() => handleCloseDownload())}>
          PNG Image
        </MenuItem>
        <MenuItem onClick={() => handleDownloadMp4().then(() => handleCloseDownload())}>
          MP4 Video
        </MenuItem>
      </Menu>
      <Button
        onClick={handleClickSettings}
        startIcon={<SettingsIcon />}
      >
        Settings
      </Button>
      <Menu
        anchorEl={anchorElSettings}
        keepMounted
        open={Boolean(anchorElSettings)}
        onClose={handleCloseSettings}
      >
        <MenuItem onClick={() => {
          dispatch({ type: boardActionTypes.FLIP });
          handleCloseSettings();
        }}>
          Flip Board
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch({ type: fenDialogActionTypes.OPEN });
          handleCloseSettings();
        }}>
          FEN String
        </MenuItem>
      </Menu>
    </ButtonGroup>
  );
}

export default Buttons;
