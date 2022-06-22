import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        flexDirection: 'column',
      },
      gridContainer: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'row',
        },
      },
      container: {
        width: '600px',
        margin: '35px 0',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
          width: '80%',
        },
      },
      margin: {
        marginTop: 20,
      },
      padding: {
        padding: 15,
      },
      paper: {
        padding: '10px 20px',
        border: '2px solid black',
      },
     }));

const Options = ({ children }) => {
  const classes = useStyles();
  const { callAccepted, name, setName, callEnded, me, callUser, leaveCall } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Account Info
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={me} className={classes.margin}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                >
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Make Call
              </Typography>
              <TextField
                label="Id to Call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button
                  className={classes.margin}
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneDisabled fontSize="large" />}
                  fullWidth
                  onClick={leaveCall}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  className={classes.margin}
                  variant="contained"
                  color="secondary"
                  startIcon={<Phone fontSize="large" />}
                  fullWidth
                  onClick={() => {callUser(idToCall)}}
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
            {children}
      </Paper>
    </Container>
  );
};

export default Options;
